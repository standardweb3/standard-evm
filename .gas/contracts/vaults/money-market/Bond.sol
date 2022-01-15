// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./interfaces/IERC20Minimal.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/IBond.sol";
import "./interfaces/IBondManager.sol";
import "./interfaces/IERC721Minimal.sol";
import "./interfaces/IB1.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/IUniswapV2FactoryMinimal.sol";
import "./interfaces/ISupplyPool.sol";

contract Bond is IBond {
  /// Uniswap v2 factory interface
  address public override v2Factory;
  /// Address of a manager
  address public override manager;
  /// Address of a factory
  address public override factory;
  /// Address of debt;
  address public override debt;
  /// Address of bond ownership registry
  address public override b1;
  /// Address of a collateral
  address public override collateral;
  /// Bond global identifier
  uint256 public override bondId;
  /// Borrowed amount
  uint256 public override borrow;
  /// Created block timestamp
  uint256 public override createdAt;
  /// Address of wrapped eth
  address public override WETH;

  constructor() public {
    factory = msg.sender;
    createdAt = block.timestamp;
  }

  modifier onlyBondOwner() {
    require(
      IERC721Minimal(b1).ownerOf(bondId) == msg.sender,
      "Bond: Bond is not owned by you"
    );
    _;
  }

  // called once by the factory at time of deployment
  function initialize(
    address manager_,
    uint256 bondId_,
    address collateral_,
    address debt_,
    address b1_,
    uint256 amount_,
    address v2Factory_,
    address weth_
  ) external {
    require(msg.sender == factory, "Bond: FORBIDDEN"); // sufficient check
    bondId = bondId_;
    collateral = collateral_;
    debt = debt_;
    b1 = b1_;
    borrow = amount_;
    v2Factory = v2Factory_;
    WETH = weth_;
    manager = manager_;
  }

  function getStatus()
    external
    view
    override
    returns (
      address collateral,
      uint256 cBalance,
      address debt,
      uint256 dBalance
    )
  {
    return (
      collateral,
      IERC20Minimal(collateral).balanceOf(address(this)),
      debt,
      IERC20Minimal(debt).balanceOf(address(this))
    );
  }

  function liquidate() external override {
    require(
      !IBondManager(manager).isValidCDP(
        collateral,
        debt,
        IERC20Minimal(collateral).balanceOf(address(this)),
        IERC20Minimal(debt).balanceOf(address(this))
      ),
      "Bond: Position is still safe"
    );
    // check the pair if it exists
    address pair = IUniswapV2FactoryMinimal(v2Factory).getPair(
      collateral,
      debt
    );
    require(pair != address(0), "Bond: Liquidating pair not supported");
    uint256 balance = IERC20Minimal(collateral).balanceOf(address(this));
    uint256 lfr = IBondManager(manager).getLFR(collateral, debt);
    uint256 liquidationFee = (lfr * balance) / 100;
    uint256 left = _sendFee(collateral, balance, liquidationFee);
    // Distribute collaterals to supply pool
    address supplyPool = IBondManager(manager).getSupplyPool(collateral);
    TransferHelper.safeTransfer(collateral, supplyPool, left);
    // burn bond nft
    _burnV1FromBond();
    emit Liquidated(bondId, collateral, balance);
    // self destruct the contract, send remaining balance if collateral is native currency
    selfdestruct(payable(msg.sender));
  }

  function depositCollateralNative() external payable override onlyBondOwner {
    require(collateral == WETH, "Bond: collateral is not a native asset");
    // wrap deposit
    IWETH(WETH).deposit{ value: msg.value }();
    emit DepositCollateral(bondId, msg.value);
  }

  function depositCollateral(uint256 amount_) external override onlyBondOwner {
    TransferHelper.safeTransferFrom(
      collateral,
      msg.sender,
      address(this),
      amount_
    );
    emit DepositCollateral(bondId, amount_);
  }

  /// Withdraw collateral as native currency
  function withdrawCollateralNative(uint256 amount_)
    external
    payable
    override
    onlyBondOwner
  {
    require(collateral == WETH, "Bond: collateral is not a native asset");
    if (borrow != 0) {
      require(
        IBondManager(manager).isValidCDP(
          collateral,
          debt,
          IERC20Minimal(collateral).balanceOf(address(this)) - amount_,
          borrow
        ),
        "Bond: below MCR"
      );
    }
    // unwrap collateral
    IWETH(WETH).withdraw(amount_);
    // send withdrawn native currency
    TransferHelper.safeTransferETH(msg.sender, address(this).balance);
    emit WithdrawCollateral(bondId, amount_);
  }

  function withdrawCollateral(uint256 amount_)
    external
    override
    onlyBondOwner
  {
    require(
      IERC20Minimal(collateral).balanceOf(address(this)) >= amount_,
      "Bond: Not enough collateral"
    );
    if (borrow != 0) {
      uint256 test = IERC20Minimal(collateral).balanceOf(address(this)) - amount_;
      require(
        IBondManager(manager).isValidCDP(collateral,debt,test,borrow) == true,
        "Bond: below MCR"
      );
      
    }
    TransferHelper.safeTransfer(collateral, msg.sender, amount_);
    emit WithdrawCollateral(bondId, amount_);
  }

  function borrowMore(
    uint256 cAmount_,
    uint256 dAmount_
  ) external override onlyBondOwner {
    // get bond balance
    uint256 deposits = IERC20Minimal(collateral).balanceOf(address(this));
    // check position
    require(IBondManager(manager).isValidCDP(collateral, debt, cAmount_+ deposits, dAmount_), "IP"); // Invalid Position
    // transfer collateral to the bond, manage collateral from there
    TransferHelper.safeTransferFrom(collateral, msg.sender, address(this), cAmount_);
    // send debt to sender
    address supplyPool = IBondManager(manager).getSupplyPool(debt);
    ISupplyPool(supplyPool).sendDebtFromBond(factory, bondId, msg.sender, dAmount_);
  }

  function borrowMoreNative(
    uint256 dAmount_
  ) external payable onlyBondOwner {
    // get bond balance
    uint256 deposits = IERC20Minimal(WETH).balanceOf(address(this));
    // check position
    require(IBondManager(manager).isValidCDP(collateral, debt, msg.value + deposits, dAmount_), "IP"); // Invalid Position
    // wrap native currency
    IWETH(WETH).deposit{value: address(this).balance}();
    // send debt to sender
    address supplyPool = IBondManager(manager).getSupplyPool(debt);
    ISupplyPool(supplyPool).sendDebtFromBond(factory, bondId, msg.sender, dAmount_);
  }

  function payDebt(uint256 amount_) external override onlyBondOwner {
    // calculate debt with interest
    uint256 fee = _calculateFee();
    require(amount_ != 0, "Bond: amount is zero");
    // send MTR to the bond
    TransferHelper.safeTransferFrom(debt, msg.sender, address(this), amount_);
    uint256 left = _sendFee(debt, amount_, fee);
    _sendBackDebtToSupply(left);
    borrow -= left;
    emit PayBack(bondId, borrow, fee, amount_);
  }

  function closeBond(uint256 amount_) external override onlyBondOwner {
    // calculate debt with interest
    uint256 fee = _calculateFee();
    require(fee + borrow == amount_, "Bond: not enough balance to payback");
    // send MTR to the bond
    TransferHelper.safeTransferFrom(debt, msg.sender, address(this), amount_);
    // send fee to the pool
    uint256 left = _sendFee(debt, amount_, fee);
    // send debt to supply pool with interest
    _sendBackDebtToSupply(left);
    // burn bond nft
    _burnV1FromBond();
    emit CloseBond(bondId, amount_, fee);
    // self destruct the contract, send remaining balance if collateral is native currency
    selfdestruct(payable(msg.sender));
  }

  function _burnV1FromBond() internal {
    IB1(b1).burnFromBond(bondId);
  }

  function _sendBackDebtToSupply(uint256 amount_) internal {
    address supplyPool = IBondManager(manager).getSupplyPool(debt);
    TransferHelper.safeTransfer(debt, supplyPool, amount_);
  }

  function _calculateFee() internal returns (uint256) {
    uint256 assetValue = IBondManager(manager).getAssetValue(debt, borrow);
    uint256 sfr = IBondManager(manager).getSFR(collateral, debt);
    /// (sfr * assetValue/100) * (duration in months)
    uint256 sfrTimesV = sfr * assetValue;
    // get duration in months
    uint256 duration = (block.timestamp - createdAt) / 60 / 60 / 24 / 30;
    require(sfrTimesV >= assetValue); // overflow check
    return (sfrTimesV / 100) * duration;
  }

  function getDebt() external override returns (uint256) {
    return _calculateFee() + borrow;
  }

  function _sendFee(
    address asset_,
    uint256 amount_,
    uint256 fee_
  ) internal returns (uint256 left) {
    address dividend = IBondManager(manager).dividend();
    address feeTo = IBondManager(manager).feeTo();
    address treasury = IBondManager(manager).treasury();
    bool feeOn = feeTo != address(0);
    bool treasuryOn = treasury != address(0);
    bool dividendOn = dividend != address(0);
    // send fee to the pool
    if (feeOn) {
      if (dividendOn) {
        uint256 half = fee_ / 2;
        TransferHelper.safeTransfer(asset_, dividend, half);
        TransferHelper.safeTransfer(asset_, feeTo, half);
      } else if (dividendOn && treasuryOn) {
        uint256 third = fee_ / 3;
        TransferHelper.safeTransfer(asset_, dividend, third);
        TransferHelper.safeTransfer(asset_, feeTo, third);
        TransferHelper.safeTransfer(asset_, treasury, third);
      } else {
        TransferHelper.safeTransfer(asset_, feeTo, fee_);
      }
    }
    return amount_ - fee_;
  }
}
