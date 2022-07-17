// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../meter/interfaces/IVaultFactory.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IAave {
  function deposit(
    address _reserve,
    uint256 _amount,
    uint16 _referralCode
  ) external;

  function withdraw(
    address _asset,
    uint256 _amount,
    address _to
  ) external;

  // Connect this function to LendingPoolCore contract
  function getReserveData(address _reserve)
    external
    view
    returns (DataTypes.ReserveData memory);
}

library DataTypes {
  struct ReserveData {
    /**
     * @dev refer to the whitepaper, section 1.1 basic concepts for a formal description of these properties.
     **/
    //the liquidity index. Expressed in ray
    uint256 lastLiquidityCumulativeIndex;
    //the current supply rate. Expressed in ray
    uint256 currentLiquidityRate;
    //the total borrows of the reserve at a stable rate. Expressed in the currency decimals
    uint256 totalBorrowsStable;
    //the total borrows of the reserve at a variable rate. Expressed in the currency decimals
    uint256 totalBorrowsVariable;
    //the current variable borrow rate. Expressed in ray
    uint256 currentVariableBorrowRate;
    //the current stable borrow rate. Expressed in ray
    uint256 currentStableBorrowRate;
    //the current average stable borrow rate (weighted average of all the different stable rate loans). Expressed in ray
    uint256 currentAverageStableBorrowRate;
    //variable borrow index. Expressed in ray
    uint256 lastVariableBorrowCumulativeIndex;
    //the ltv of the reserve. Expressed in percentage (0-100)
    uint256 baseLTVasCollateral;
    //the liquidation threshold of the reserve. Expressed in percentage (0-100)
    uint256 liquidationThreshold;
    //the liquidation bonus of the reserve. Expressed in percentage
    uint256 liquidationBonus;
    //the decimals of the reserve asset
    uint256 decimals;
    /**
     * @dev address of the aToken representing the asset
     **/
    address aTokenAddress;
    /**
     * @dev address of the interest rate strategy contract
     **/
    address interestRateStrategyAddress;
    uint40 lastUpdateTimestamp;
    // borrowingEnabled = true means users can borrow from this reserve
    bool borrowingEnabled;
    // usageAsCollateralEnabled = true means users can use this reserve as collateral
    bool usageAsCollateralEnabled;
    // isStableBorrowRateEnabled = true means users can borrow at a stable rate
    bool isStableBorrowRateEnabled;
    // isActive = true means the reserve has been activated and properly configured
    bool isActive;
    // isFreezed = true means the reserve only allows repays and redeems, but not deposits, new borrowings or rate swap
    bool isFreezed;
  }
}

contract AaveStrategy is AccessControl {
  address public feeToken;
  uint256 public fee;
  address public lendingPool;
  address public factory;
  address public conversion;
  address public reversion;
  address public treasury;

  constructor(
    address lendingPool_,
    address factory_,
    address feeToken_,
    uint256 fee_,
    address reversion_,
    address treasury_
  ) {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    (bool isActive, address aToken_) = _checkSupport(lendingPool_);
    require(isActive, "AS: Not supporting deposit");
    lendingPool = lendingPool_;
    factory = factory_;
    feeToken = feeToken_;
    fee = fee_;
    reversion = reversion_;
    conversion = aToken_;
    treasury = treasury_;
    IERC20(feeToken).approve(treasury, type(uint256).max);
  }

  function resetApproval() public {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
    IERC20(feeToken).approve(treasury, type(uint256).max);
  }

  function setTreasury(address treasury_) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA");
    treasury = treasury_;
  }

    /*
    function addConvertingAsset() public {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        (bool isActive, address aToken_) = _checkSupport(lendingPool);
        require(isActive, "AS: Not supporting deposit");
        conversion[reversion] = aToken_;
        reversion[conversion] = 
    }
    */

  function activate(uint256 vaultId_, uint256 amount_)
    external
    returns (address conversion_)
  {
    // Confirm sender is vault
    require(
      IVaultFactory(factory).getVault(vaultId_) == msg.sender,
      "AS: Not from Vault"
    );
    (bool isActive, ) = _checkSupport(reversion);
    require(isActive, "AS: Not supporting deposit");
    _takeFees();
    _takeReversion(amount_);
    IAave(lendingPool).deposit(reversion, amount_, 0);
    return conversion;
  }

  function deactivate(uint256 vaultId_, uint256 amount_)
    external
    returns (address reversion_)
  {
    // Confirm sender is vault
    require(
      IVaultFactory(factory).getVault(vaultId_) == msg.sender,
      "AS: Not from Vault"
    );
    IAave(lendingPool).withdraw(reversion, amount_, msg.sender);
    IERC20(reversion).transfer(msg.sender, amount_);
    return reversion;
  }

  function _checkSupport(address reserve_)
    internal
    view
    returns (bool isActive, address aToken_)
  {
    DataTypes.ReserveData memory reserveData = IAave(lendingPool)
      .getReserveData(reserve_);
    return (reserveData.isActive, reserveData.aTokenAddress);
  }

  function _takeFees() internal {
    // TODO: accept fee for entry
    IERC20(feeToken).transferFrom(msg.sender, address(this), fee);
    // send it to governing treasury
  }

  function _takeReversion(uint256 amount_) internal {
    IERC20(reversion).transferFrom(msg.sender, address(this), amount_);
  }

  function getReserveData(address reserve_)
    external
    view
    returns (DataTypes.ReserveData memory)
  {
    DataTypes.ReserveData memory reserveData = IAave(lendingPool)
      .getReserveData(reserve_);
    return reserveData;
  }
}
