pragma solidity ^0.8.0;

import '../../oracle/OracleRegistry.sol';
import './Vault.sol';
import './IVaultManager.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IV1.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract VaultManager is OracleRegistry, IVaultManager {
    using SafeERC20 for IERC20;
    event VaultCreated(address collateral, uint256 vaultId, address creator, address vault);

    /// Desirable supply of stablecoin 
    uint256 desiredSupply;
    /// switch to on/off rebase;
    bool rebaseActive;

    // Vaults
    mapping (uint => address) Vaults;

    // CDP configs
    /// key: Collateral address, value: Liquidation Fee Ratio (LFR) in percent(%) 
    mapping (address => uint) internal LFRConfig;
    /// key: Collateral address, value: Minimum Collateralization Ratio (MCR) in percent(%)
    mapping (address => uint) internal MCRConfig;
    /// key: Collateral address, value: Stability Fee Ratio (SFR) in percent(%)
    mapping (address => uint) internal SFRConfig; 
    /// key: Collateral address, value: collateral decimals, oracles come with same precision, so amounts has to be adjusted to collateral
    mapping (address => uint8) internal CDecimals;
    
    /// Address of cdp nft registry
    address v1;
    /// Manager of Vaults
    address manager;
    /// Address of meter
    address meter;
    /// Vault global identifier index, increments on every creation of vault
    uint256 gIndex = 0;
    /// Address pointer for vault
    address vlt;
    /// Address of Standard market
    address market;

    constructor(address v1_, address meter_, address market_) {
        v1 = v1_;
        meter = meter_;
        market = market_;
        manager = _msgSender();
    }

    modifier onlyManager {
        require(_msgSender() == manager, "VaultFactory: Factory is not managed by you");
        _;
    }

    function initializeCDP(address collateral_, uint MCR_, uint LFR_, uint SFR_) external onlyManager {
        LFRConfig[collateral_] = LFR_;
        MCRConfig[collateral_] = MCR_;
        SFRConfig[collateral_] = SFR_;   
    }

    /// Vault cannot issue stablecoin, it just manages the position
    function _createVault(address collateral_, uint vaultId_, address cAggregator_, address dAggregator_, uint256 amount_) internal returns (address vault) {

        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(collateral_, vaultId_, cAggregator_, dAggregator_, amount_, msg.sender));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(collateral_, vaultId_, cAggregator_, dAggregator_, v1, meter, amount_, market);
        
        emit VaultCreated(collateral_, vaultId_, msg.sender, vault);
        return vault;
    }

    function createCDP(address collateral_, uint cAmount_, uint dAmount_) public {
        // get aggregators
        address cAggregator = PriceFeeds[collateral_];
        address dAggregator = PriceFeeds[meter];
        // check tests
        isValidCDP(collateral_, cAggregator, dAggregator, cAmount_, dAmount_);
        // create vault
        // mint ERC721 for vault
        IV1(v1).mint(_msgSender(), gIndex);
        vlt = _createVault(collateral_, gIndex, cAggregator, dAggregator, dAmount_);
        // transfer collateral to the vault, manage collateral from there
        IERC20(collateral_).safeTransferFrom(_msgSender(), vlt, cAmount_);
        gIndex + 1; // increment vault id
        // check rebased supply of meter
        if (rebaseActive) {
            require(IERC20(meter).totalSupply() + dAmount_ <= desiredSupply, "VaultManager: MTR borrow is blocked for stability");
        }
        // mint mtr to the sender
        IStablecoin(meter).mint(_msgSender(), dAmount_);
    }

    function createCDPNative(uint dAmount_) payable public {
        // get aggregators
        address cAggregator = PriceFeeds[address(0)];
        address dAggregator = PriceFeeds[meter];
        // check tests
        isValidCDP(address(0), cAggregator, dAggregator, msg.value, dAmount_);
        // create vault
        // mint ERC721 for vault
        IV1(v1).mint(_msgSender(), gIndex);
        vlt = _createVault(address(0), gIndex, cAggregator, dAggregator, dAmount_);
        // transfer collateral native currency to the vault, manage collateral from there...which is already done
        gIndex + 1; // increment vault id
        // check rebased supply of meter
        if (rebaseActive) {
            require(IERC20(meter).totalSupply() + dAmount_ <= desiredSupply, "VaultManager: MTR borrow is blocked for stability");
        }
        // mint mtr to the sender
        IStablecoin(meter).mint(_msgSender(), dAmount_);
    }

    function getCDPConfig(address collateral_) external view override returns (uint MCR, uint LFR, uint SFR, uint cDecimals) {
        return (MCRConfig[collateral_], LFRConfig[collateral_], SFRConfig[collateral_], CDecimals[collateral_]);
    }

    function getVault(uint vaultId_) external view override returns (address) {
        return Vaults[vaultId_];
    }

    // Set desirable supply of issuing stablecoin
    function rebase() public {
        uint256 totalSupply = IERC20(meter).totalSupply(); 
        if ( totalSupply == 0 ) {
            return;
        }
        uint stablecoinPrice = uint(_getPriceOf(meter));
        // get desired supply and update 
        desiredSupply = totalSupply * 1e8 / stablecoinPrice; 
    }

    function isValidCDP(address collateral_, address cAggregator_, address dAggregator_, uint256 cAmount_, uint256 dAmount_) private returns (bool) {
        (uint256 collateralValueTimes100, uint256 debtValue) = _calculateValues(cAggregator_, dAggregator_, cAmount_, dAmount_);

        (uint mcr, uint lfr, uint sfr, uint cDecimals) = this.getCDPConfig(collateral_);

        uint256 debtValueAdjusted = debtValue / (10 ** cDecimals);

        // if the debt become obsolete
        return debtValueAdjusted == 0 ? true : collateralValueTimes100 / debtValueAdjusted >= mcr;
    }

    function _calculateValues(address cAggregator_, address dAggregator_, uint256 cAmount_, uint256 dAmount_) private returns (uint256, uint256) {
        uint256 collateralValue = _getAssetValue(cAggregator_, cAmount_);
        uint256 debtValue = _getAssetValue(dAggregator_, dAmount_);
        uint256 collateralValueTimes100 = collateralValue * 100;
        assert(collateralValueTimes100 >= collateralValue); // overflow check
        return (collateralValue, debtValue);        
    }

    /// Get collateral value in 8 decimal */USD
    function _getAssetPrice(address aggregator_) internal returns(uint) {
        feed = IPrice(aggregator_);
        return uint(feed.getThePrice());
    }

    function _getAssetValue(address aggregator, uint256 amount_) internal returns (uint256) {
        uint price = _getAssetPrice(aggregator);
        assert(price != 0);
        uint256 assetValue = price * amount_;
        assert(assetValue >= amount_); // overflow check
        return assetValue;
    }
}
