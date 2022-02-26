// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../interfaces/IVault.sol";
import "../interfaces/IVaultFactory.sol";
import "../interfaces/IVaultManager.sol";
import "../interfaces/IERC20Minimal.sol";
import "./libraries/NFTSVG.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20Metadata {
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
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
    uint256 lastUpdated = IVault(vault).lastUpdated();
    address debt = IVault(vault).debt();
    address collateral = IVault(vault).collateral();
    uint256 cDecimal = IVaultManager(manager).getCDecimal(collateral);
    uint256 cBalance = IERC20Minimal(collateral).balanceOf(vault);
    uint256 dBalance = IVault(vault).borrow();
    string memory symbol = IERC20Metadata(collateral).symbol();
    string memory name = IERC20Metadata(collateral).symbol();
    uint256 HP = _getHP(collateral, cDecimal, debt, cBalance, dBalance);
    return (
      _generateChainParams(collateral, debt),
      _generateBlParams(vault, lastUpdated, cDecimal, cBalance, dBalance, symbol, name),
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
    uint256 lastUpdated,
    uint256 cDecimal,
    uint256 cBalance,
    uint256 dBalance,
    string memory symbol,
    string memory name
  ) internal pure returns (NFTSVG.BlParams memory blParam) {
    blParam = NFTSVG.BlParams({
      vault: addressToString(vault),
      cBlStr: _generateDecimalString(cDecimal, cBalance),
      dBlStr: _generateDecimalString(18, dBalance),
      symbol: symbol,
      lastUpdated: lastUpdated.toString(),
      name: name
    });
  }

  function _generateHealthParams(uint256 HP)
    internal
    pure
    returns (NFTSVG.HealthParams memory hParam)
  {
    hParam = NFTSVG.HealthParams({
      rawHP: HP,
      HP: _formatHP(HP),
      HPBarColor1: _getHPBarColor1(HP),
      HPBarColor2: _getHPBarColor2(HP),
      HPStatus: _getHPStatus(HP),
      HPGauge: _formatGauge(HP)
    });
  }

  function _generateCltParams(address collateral)
    internal
    view
    returns (NFTSVG.CltParams memory cltParam)
  {
    cltParam = NFTSVG.CltParams({
      MCR: _formatRatio(IVaultManager(manager).getMCR(collateral)),
      LFR: _formatRatio(IVaultManager(manager).getLFR(collateral)),
      SFR: _formatRatio(IVaultManager(manager).getSFR(collateral))
    });
  }

  function _formatRatio(uint256 ratio) internal pure returns (string memory str) {
    uint256 integer = ratio / 100000;
    uint256 secondPrecision = ratio / 1000 - (integer * 100);
    if (secondPrecision > 0) {
      str = string(
        abi.encodePacked(integer.toString(), ".", secondPrecision.toString())
      );
    } else {
      str = string(abi.encodePacked(integer.toString()));
    }
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
    uint256 cDecimal,
    address debt,
    uint256 cBalance,
    uint256 dBalance
  ) internal view returns (uint256 HP) {
    uint256 cValue = IVaultManager(manager).getAssetPrice(collateral) *
      cBalance;
    uint256 dValue = IVaultManager(manager).getAssetPrice(debt) * dBalance;
    uint256 mcr = IVaultManager(manager).getMCR(collateral);
    uint256 cdpRatioPercentPoint00000 = cValue * 10000000 * 10**(18-cDecimal) / dValue;
    HP = (cdpRatioPercentPoint00000 - mcr) / 100000;
    return HP;
  }

  function _formatHP(
    uint256 HP
  ) internal pure returns (string memory HPString) {
    if (HP > 200) {
      HPString = "200+";
    } else {
      HPString = HP.toString();
    }
  }

  function _formatGauge(
    uint256 HP
  ) internal pure returns (string memory HPGauge) {
    if (HP > 100) {
      HPGauge = '32';
    } else {
      HPGauge = (HP*32/100).toString();
    }
  }

  function _getHPBarColor1(uint256 HP)
    internal
    pure
    returns (string memory color)
  {
    if (HP <= 30) {
      color = "#F5B1A6";
    }
    if (HP <= 50) {
      color = "#E8ECCA";
    }
    if (HP < 100) {
      color = "#C9FBAD";
    }
    if (HP >= 100) {
      color = "#C4F2FE";
    }
  }

  function _getHPBarColor2(uint256 HP)
    internal
    pure
    returns (string memory color)
  {
    if (HP <= 30) {
      color = "#EC290A";
    }
    if (HP <= 50) {
      color = "#D6ED20";
    }
    if (HP < 100) {
      color = "#57E705";
    }
    if (HP >= 100) {
      color = "#6FA4FB";
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
