// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../../oracle/OracleRegistry.sol";
import "./Bond.sol";
import "./interfaces/IBondFactory.sol";
import "./interfaces/ISupplyFactory.sol";

contract BondManager is OracleRegistry, IBondManager {
    // CDP configs
    /// key: Collateral address and debt address, value: Liquidation Fee Ratio (LFR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => mapping (address => uint)) internal LFRConfig;
    /// key: Collateral address, value: Minimum Collateralization Ratio (MCR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => mapping (address => uint)) internal MCRConfig;
    /// key: Collateral address, value: Stability Fee Ratio (SFR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => mapping (address => uint)) internal SFRConfig; 
    /// key: Collateral address, value: whether collateral is allowed to borrow
    mapping (address => bool) internal IsOpen;
    /// key: supply token address, value: supply pool which stores debt
    mapping (address => address) internal SupplyPool;
    
    /// Address of Bond Factory
    address public override bondFactory;
    /// Address of Supply Factory
    address public override supplyFactory;
    /// Address of feeTo
    address public override feeTo;
    /// Address of Standard MTR fee pool
    address public override dividend;
    /// Address of Standard Treasury
    address public override treasury;

    constructor() {
        _setupRole(ORACLE_OPERATOR_ROLE, _msgSender());
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function initializeCDP(address collateral_, address debt_, uint MCR_, uint LFR_, uint SFR_, bool on) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        LFRConfig[collateral_][debt_] = LFR_;
        MCRConfig[collateral_][debt_] = MCR_;
        SFRConfig[collateral_][debt_] = SFR_; 
        IsOpen[collateral_] = on;
        uint8 cDecimals = IERC20Minimal(collateral_).decimals();
        emit CDPInitialized(collateral_, MCR_, LFR_, SFR_, cDecimals);  
    }

    function setFees(address feeTo_, address dividend_, address treasury_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        feeTo = feeTo_;
        dividend = dividend_;
        treasury = treasury_;
        emit SetFees(feeTo_, dividend_, treasury_);
    }
    
    function initialize(address bondFactory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        bondFactory = bondFactory_;
    }

    function createCDP(address collateral_, address debt_, uint cAmount_, uint dAmount_) external override returns (bool success) {
        // check if collateral is open
        require(IsOpen[collateral_], "BondManager: NOT OPEN");
        // check position
        require(isValidCDP(collateral_, debt_, cAmount_, dAmount_)
        , "IP"); // Invalid Position
        // create bond
        (address vlt, uint256 id) = IBondFactory(bondFactory).createBond(collateral_, debt_, dAmount_, _msgSender());
        require(vlt != address(0), "BondManager: FE"); // Factory error
        // transfer collateral to the bond, manage collateral from there
        TransferHelper.safeTransferFrom(collateral_, _msgSender(), vlt, cAmount_);
        // send debt to the borrower
        ISupplyPool(debt_).sendDebt(_msgSender(), dAmount_);
        emit BondCreated(id, collateral_, debt_, msg.sender, vlt, cAmount_, dAmount_);
        return true;
    }

    function createCDPNative(address debt_, uint dAmount_) payable public returns(bool success) {
        address WETH = IBondFactory(bondFactory).WETH();
        // check if collateral is open
        require(IsOpen[WETH], "BondManager: NOT OPEN");
        // check position
        require(isValidCDP(WETH, debt_, msg.value, dAmount_)
        , "IP"); // Invalid Position
        // create bond
        (address vlt, uint256 id) = IBondFactory(bondFactory).createBond(WETH, debt_, dAmount_, _msgSender());
        require(vlt != address(0), "BondManager: FE"); // Factory error
        // wrap native currency
        IWETH(WETH).deposit{value: address(this).balance}();
        uint256 weth = IERC20Minimal(WETH).balanceOf(address(this));
        // then transfer collateral native currency to the bond, manage collateral from there.
        require(IWETH(WETH).transfer(vlt, weth)); 
        // send debt to the sender
        ISupplyPool(debt_).sendDebt(_msgSender(), dAmount_);
        emit BondCreated(id, WETH, debt_, msg.sender, vlt, msg.value, dAmount_);
        return true;
    }

    function createSupply(address debt_) public {
        (address supply, uint256 supplyId) = ISupplyFactory(supplyFactory).createSupply(debt_);
        SupplyPool[debt_] = supply;
        emit SupplyCreated(debt_, supply);
    }
    
    function getCDPConfig(address collateral_, address debt_) external view override returns (uint MCR, uint LFR, uint SFR, uint cDecimals, bool isOpen) {
        uint8 cDecimals = IERC20Minimal(collateral_).decimals();
        return (MCRConfig[collateral_][debt_], LFRConfig[collateral_][debt_], SFRConfig[collateral_][debt_], cDecimals, IsOpen[collateral_]);
    }

    function getMCR(address collateral_, address debt_) public view override returns (uint) {
        return MCRConfig[collateral_][debt_];
    }

    function getLFR(address collateral_, address debt_) external view override returns (uint) {
        return LFRConfig[collateral_][debt_];
    }

    function getSFR(address collateral_, address debt_) public view override returns (uint) {
        return SFRConfig[collateral_][debt_];
    } 

    function getOpen(address collateral_, address debt_) public view override returns (bool) {
        return IsOpen[collateral_];
    }

    function getSupplyPool(address debt_) public view override returns (address) {
        return SupplyPool[debt_];
    } 
    

    function isValidCDP(address collateral_, address debt_, uint256 cAmount_, uint256 dAmount_) public view override returns (bool) {
        (uint256 collateralValueTimes100Point00000, uint256 debtValue) = _calculateValues(collateral_, debt_, cAmount_, dAmount_);

        uint mcr = getMCR(collateral_, debt_);
        uint cDecimals = IERC20Minimal(collateral_).decimals();

        uint256 debtValueAdjusted = debtValue / (10 ** cDecimals);

        // if the debt become obsolete
        return debtValueAdjusted == 0 ? true : collateralValueTimes100Point00000 / debtValueAdjusted >= mcr;
    }

    function _calculateValues(address collateral_, address debt_, uint256 cAmount_, uint256 dAmount_) internal view returns (uint256, uint256) {
        uint256 collateralValue = getAssetValue(collateral_, cAmount_);
        uint256 debtValue = getAssetValue(debt_, dAmount_);
        uint256 collateralValueTimes100Point00000 = collateralValue * 10000000;
        require(collateralValueTimes100Point00000 >= collateralValue); // overflow check
        return (collateralValueTimes100Point00000, debtValue);        
    }

    function getAssetPrice(address asset_) public view override returns (uint) {
        address aggregator = PriceFeeds[asset_];
        require(
            aggregator != address(0x0),
            "VAULT: Asset not registered"
        );
        int256 result = IPrice(aggregator).getThePrice();
        return uint(result);
    }

    function getAssetValue(address asset_, uint256 amount_) public view override returns (uint256) {
        uint price = getAssetPrice(asset_);
        uint256 value = price * amount_;
        require(value >= amount_); // overflow
        return value;
    }

}

