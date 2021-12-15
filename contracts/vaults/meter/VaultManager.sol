// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../../oracle/OracleRegistry.sol";
import "./Vault.sol";

contract VaultManager is OracleRegistry, IVaultManager {
    
    /// Desirable supply of stablecoin 
    uint256 public override desiredSupply;
    /// Switch to on/off rebase;
    bool public override rebaseActive;

    // Vaults
    address[] public allVaults;

    // CDP configs
    /// key: Collateral address, value: Liquidation Fee Ratio (LFR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => uint) internal LFRConfig;
    /// key: Collateral address, value: Minimum Collateralization Ratio (MCR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => uint) internal MCRConfig;
    /// key: Collateral address, value: Stability Fee Ratio (SFR) in percent(%) with 5 decimal precision(100.00000%)
    mapping (address => uint) internal SFRConfig; 
    /// key: Collateral address, value: collateral decimals, oracles come with same precision, so amounts has to be adjusted to collateral
    //mapping (address => uint8) internal CDecimals;
    
    /// Address of cdp nft registry
    address public override v1;
    /// Address of stablecoin
    address public override stablecoin;
    /// Address of uniswapv2 factory;
    address public override v2Factory;
    /// Address of feeTo
    address public override feeTo;
    /// Address of Standard MTR fee pool
    address public override dividend;
    /// Address of Standard Treasury
    address public override treasury;
    /// Address of Wrapped eth;
    address public override WETH;

    constructor() {
        _setupRole(ORACLE_OPERATOR_ROLE, _msgSender());
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function initializeCDP(address collateral_, uint MCR_, uint LFR_, uint SFR_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        LFRConfig[collateral_] = LFR_;
        MCRConfig[collateral_] = MCR_;
        SFRConfig[collateral_] = SFR_; 
        uint8 cDecimals = IERC20Minimal(collateral_).decimals();
        emit CDPInitialized(collateral_, MCR_, LFR_, SFR_, cDecimals);  
    }

    function setRebaseActive(bool set_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        rebaseActive = set_;
        emit RebaseActive(set_);
    }

    function setFees(address feeTo_, address dividend_, address treasury_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        feeTo = feeTo_;
        dividend = dividend_;
        treasury = treasury_;
        emit SetFees(feeTo_, dividend_, treasury_);
    }
    
    function initialize(address v1_, address stablecoin_, address v2Factory_, address weth_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        v1 = v1_;
        stablecoin = stablecoin_;
        v2Factory = v2Factory_;
        WETH = weth_;
    }

    /// Vault cannot issue stablecoin, it just manages the position
    function _createVault(uint vaultId_, address collateral_, address debt_, uint256 amount_) internal returns (address vault) {
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(vaultId_));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(vaultId_, collateral_, debt_, v1, amount_, v2Factory, WETH);
        return vault;
    }

    function createCDP(address collateral_, uint cAmount_, uint dAmount_) external override returns(bool success) {
        // get aggregators
        // check position
        require(isValidCDP(collateral_, stablecoin, cAmount_, dAmount_)
        , "IP"); // Invalid Position
        // check rebased supply of stablecoin
        require(isValidSupply(dAmount_), "RB"); // Rebase limited mtr borrow
        // create vault
        // mint ERC721 for vault
        uint256 gIndex = allVaultsLength();
        IV1(v1).mint(_msgSender(), gIndex);
        address vlt = _createVault(gIndex, collateral_, stablecoin, dAmount_);
        // transfer collateral to the vault, manage collateral from there
        TransferHelper.safeTransferFrom(collateral_, _msgSender(), vlt, cAmount_);
        allVaults.push(vlt);
        // mint mtr to the sender
        IStablecoin(stablecoin).mint(_msgSender(), dAmount_);
        emit VaultCreated(gIndex, collateral_, stablecoin, msg.sender, vlt, cAmount_, dAmount_);
        return true;
    }

    function createCDPNative(uint dAmount_) payable public returns(bool success) {
        // check tests
        require(isValidCDP(WETH, stablecoin, msg.value, dAmount_)
        , "IP"); // Invalid Position
        // check rebased supply of stablecoin
        require(isValidSupply(dAmount_), "RB"); // Rebase limited mtr borrow
        // create vault
        // mint ERC721 for vault
        uint256 gIndex = allVaultsLength();
        IV1(v1).mint(_msgSender(), gIndex);
        address vlt = _createVault(gIndex, WETH, stablecoin, dAmount_);
        // wrap native currency
        IWETH(WETH).deposit{value: address(this).balance}();
        uint256 weth = IERC20Minimal(WETH).balanceOf(address(this));
        // then transfer collateral native currency to the vault, manage collateral from there.
        require(IWETH(WETH).transfer(vlt, weth)); 
        allVaults.push(vlt);
        // mint mtr to the sender
        IStablecoin(stablecoin).mint(_msgSender(), dAmount_);
        emit VaultCreated(gIndex, WETH, stablecoin, msg.sender, vlt, msg.value, dAmount_);
        return true;
    }
    
    function allVaultsLength() public view returns (uint) {
        return allVaults.length;
    }

    function getCDPConfig(address collateral_) external view override returns (uint MCR, uint LFR, uint SFR, uint cDecimals) {
        uint8 cDecimals = IERC20Minimal(collateral_).decimals();
        return (MCRConfig[collateral_], LFRConfig[collateral_], SFRConfig[collateral_], cDecimals);
    }

    function getMCR(address collateral_) public view override returns (uint) {
        return MCRConfig[collateral_];
    }

    function getLFR(address collateral_) external view override returns (uint) {
        return LFRConfig[collateral_];
    }

    function getSFR(address collateral_) public view override returns (uint) {
        return SFRConfig[collateral_];
    } 
    
    function getCDecimal(address collateral_) public view override returns (uint) {
        return IERC20Minimal(collateral_).decimals();
    }     

    function getVault(uint vaultId_) external view override returns (address) {
        return allVaults[vaultId_];
    }

    // Set desirable supply of issuing stablecoin
    function rebase() public {
        uint256 totalSupply = IERC20Minimal(stablecoin).totalSupply(); 
        if ( totalSupply == 0 ) {
            return;
        }
        uint stablecoinPrice = uint(_getPriceOf(stablecoin));
        // get desired supply and update 
        desiredSupply = totalSupply * 1e8 / stablecoinPrice; 
        emit Rebase(totalSupply, desiredSupply);
    }

    function isValidCDP(address collateral_, address debt_, uint256 cAmount_, uint256 dAmount_) public view override returns (bool) {
        (uint256 collateralValueTimes100Point00000, uint256 debtValue) = _calculateValues(collateral_, debt_, cAmount_, dAmount_);

        uint mcr = getMCR(collateral_);
        uint cDecimals = IERC20Minimal(collateral_).decimals();

        uint256 debtValueAdjusted = debtValue / (10 ** cDecimals);

        // if the debt become obsolete
        return debtValueAdjusted == 0 ? true : collateralValueTimes100Point00000 / debtValueAdjusted >= mcr;
    }

    function isValidSupply(uint256 issueAmount_) internal view returns (bool) {
        if (rebaseActive) {
            return IERC20Minimal(stablecoin).totalSupply() + issueAmount_ <= desiredSupply;
        } else {
            return true;
        }
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

    function vaultCodeHash() external pure override returns (bytes32 vaultCode) {
        return keccak256(type(Vault).creationCode);
    }
}

