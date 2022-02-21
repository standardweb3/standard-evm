// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../interfaces/IVault.sol";
import "../interfaces/IVaultFactory.sol";
import "../interfaces/IVaultManager.sol";
import "../interfaces/IERC20Minimal.sol";
import "./libraries/NFTSVG.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20Symbol {
  function symbol() external view returns (string memory);
}

contract NFTConstructor {
  using Strings for uint256;

  address factory;
  address manager;
  string chainName;

  constructor(
    address factory_,
    address manager_,
    string memory chainName_
  ) {
    factory = factory_;
    manager = manager_;
    chainName = chainName_;
  }

  function generateParams(uint256 tokenId_)
    external
    view
    returns (
      NFTSVG.ChainParams memory cParam,
      NFTSVG.BlParams memory blParam,
      NFTSVG.HealthParams memory hParam,
      NFTSVG.CltParams memory cltParam
    )
  {
    address vault = IVaultFactory(factory).getVault(tokenId_);
    address debt = IVault(vault).debt();
    address collateral = IVault(vault).collateral();
    uint256 cDecimal = IVaultManager(manager).getCDecimal(collateral);
    uint256 cBalance = IERC20Minimal(collateral).balanceOf(vault);
    uint256 dBalance = IVault(vault).borrow();
    string memory symbol = IERC20Symbol(collateral).symbol();
    uint256 HP = _getHP(collateral, debt, cBalance, dBalance);
    return (
      _generateChainParams(collateral, debt),
      _generateBlParams(vault, cDecimal, cBalance, dBalance, symbol),
      _generateHealthParams(HP),
      _generateCltParams(collateral)
    );
  }

  function _generateChainParams(address collateral, address debt)
    internal
    view
    returns (NFTSVG.ChainParams memory cParam)
  {
    cParam = NFTSVG.ChainParams({
      chainId: block.chainid.toString(),
      chainName: chainName,
      collateral: addressToString(collateral),
      debt: addressToString(debt)
    });
  }

  function addressToString(address addr) internal pure returns (string memory) {
    return (uint256(uint160(addr))).toHexString(20);
  }

  function _generateBlParams(
    address vault,
    uint256 cDecimal,
    uint256 cBalance,
    uint256 dBalance,
    string memory symbol
  ) internal pure returns (NFTSVG.BlParams memory blParam) {
    blParam = NFTSVG.BlParams({
      vault: addressToString(vault),
      cBlStr: _generateDecimalString(cDecimal, cBalance),
      dBlStr: _generateDecimalString(18, dBalance),
      symbol: symbol
    });
  }

  function _generateHealthParams(uint256 HP)
    internal
    pure
    returns (NFTSVG.HealthParams memory hParam)
  {
    hParam = NFTSVG.HealthParams({
      HP: HP.toString(),
      HPBarColor: _getHPBarColor(HP),
      HPStatus: _getHPStatus(HP)
    });
  }

  function _generateCltParams(address collateral)
    internal
    view
    returns (NFTSVG.CltParams memory cltParam)
  {
    cltParam = NFTSVG.CltParams({
      MCR: IVaultManager(manager).getMCR(collateral).toString(),
      LFR: IVaultManager(manager).getLFR(collateral).toString(),
      SFR: IVaultManager(manager).getSFR(collateral).toString()
    });
  }

  function _generateDecimalString(uint256 decimals, uint256 balance)
    internal
    pure
    returns (string memory str)
  {
    uint256 integer = balance / 10**decimals;
    if (integer >= 100000000000) {
      str = "99999999999+";
    }
    uint256 secondPrecision = balance / 10**(decimals - 2) - (integer * 10**2);
    if (secondPrecision > 0) {
      str = string(
        abi.encodePacked(integer.toString(), ".", secondPrecision.toString())
      );
    } else {
      str = string(abi.encodePacked(integer.toString()));
    }
  }

  function _getHP(
    address collateral,
    address debt,
    uint256 cBalance,
    uint256 dBalance
  ) internal view returns (uint256 HP) {
    uint256 cValue = IVaultManager(manager).getAssetPrice(collateral) *
      cBalance;
    uint256 dPrice = IVaultManager(manager).getAssetPrice(debt);
    uint256 mcr = IVaultManager(manager).getMCR(collateral);
    HP = _calculateHP(cValue, dPrice, dBalance, mcr);
  }

  function _calculateHP(
    uint256 cValue,
    uint256 dPrice,
    uint256 dBalance,
    uint256 mcr
  ) internal pure returns (uint256 HP) {
    uint256 cdpRatioPercent = (cValue / dPrice) * dBalance * 100;
    HP = (100 * (cdpRatioPercent - mcr / 100000)) / 50;
  }

  function _getHPBarColor(uint256 HP)
    internal
    pure
    returns (string memory color)
  {
    if (HP <= 30) {
      color = "#ec290a";
    }
    if (HP <= 50) {
      color = "#d6ed20";
    }
    if (HP <= 100) {
      color = "#57e705";
    }
    if (HP > 100) {
      color = "#b9f2ff";
    }
  }

  function _getHPStatus(uint256 HP)
    internal
    pure
    returns (string memory status)
  {
    if (HP <= 10) {
      status = unicode"💀";
    }
    if (HP <= 30) {
      status = unicode"🚑";
    }
    if (HP < 50) {
      status = unicode"💛";
    }
    if (HP <= 80) {
      status = unicode"❤️";
    }
    if (HP <= 100) {
      status = unicode"💖";
    }
    if (HP > 100) {
      status = unicode"💎";
    }
  }
}
