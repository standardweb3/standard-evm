pragma solidity ^0.8.0;

import "../../oracle/OracleRegistry.sol";
import "./Vault.sol";
import "./interfaces/IVaultManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IV1.sol";
import "./interfaces/IWETH.sol";
import "./libraries/VaultLibrary.sol";

contract VaultManager is OracleRegistry, IVaultManager {
    event VaultCreated(address collateral, uint256 vaultId, address creator, address vault);

    /// Desirable supply of stablecoin 
    uint256 public desiredSupply;
    /// switch to on/off rebase;
    bool public rebaseActive;

    // Vaults
    address[] public allVaults;

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
    address public v1;
    /// Manager of Vaults
    address vaultManager;
    /// Address of meter
    address public meter;
    /// Address of uniswapv2 factory;
    address public v2Factory;
    /// Address of Standard MTR fee pool
    address public feePool;
    /// Address of Wrapped eth;
    address public WETH;
    /// Vault init code hash
    bytes32 vaultCode;

    constructor() {
        vaultManager = _msgSender();
    }

    modifier onlyVaultManager {
        require(_msgSender() == vaultManager, "VaultManager: Invalid Access");
        _;
    }

    function initializeCDP(address collateral_, uint MCR_, uint LFR_, uint SFR_) public onlyVaultManager {
        LFRConfig[collateral_] = LFR_;
        MCRConfig[collateral_] = MCR_;
        SFRConfig[collateral_] = SFR_;   
    }

    function setFeeStrategy(address feePool_) public onlyVaultManager {
        feePool=feePool_;
    }
    
    function initialize(address v1_, address meter_, address v2Factory_, address feePool_, address weth_) public onlyVaultManager {
        v1 = v1_;
        meter = meter_;
        v2Factory = v2Factory_;
        feePool = feePool_;
        WETH = weth_;
    }

    /// Vault cannot issue stablecoin, it just manages the position
    function _createVault(address collateral_, uint vaultId_, address cAggregator_, address dAggregator_, uint256 amount_) internal returns (address vault) {

        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(vaultId_));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(collateral_, vaultId_, cAggregator_, dAggregator_, v1, meter, amount_, v2Factory, WETH);
        emit VaultCreated(collateral_, vaultId_, msg.sender, vault);
        return vault;
    }

    function createCDP(address collateral_, uint cAmount_, uint dAmount_) external override returns(bool success) {
        // get aggregators
        address cAggregator = PriceFeeds[collateral_];
        address dAggregator = PriceFeeds[meter];
        // check position
        require(isValidCDP(collateral_, cAggregator, dAggregator, cAmount_, dAmount_)
        , "VaultManager: Invalid Position");
        // check rebased supply of meter
        require(isValidSupply(dAmount_), "VaultManager: MTR borrow is blocked for stability");
        // create vault
        // mint ERC721 for vault
        uint256 gIndex = this.allVaultsLength();
        IV1(v1).mint(_msgSender(), gIndex);
        address vlt = _createVault(collateral_, gIndex, cAggregator, dAggregator, dAmount_);
        // transfer collateral to the vault, manage collateral from there
        require(IERC20(collateral_).transferFrom(_msgSender(), vlt, cAmount_), "VaultManager: TransferFrom failed");
        allVaults.push(vlt);
        // mint mtr to the sender
        IStablecoin(meter).mint(_msgSender(), dAmount_);
        return true;
    }

    function createCDPNative(uint dAmount_) payable public {
        // get aggregators
        address cAggregator = PriceFeeds[WETH];
        address dAggregator = PriceFeeds[meter];
        // check tests
        require(isValidCDP(WETH, cAggregator, dAggregator, msg.value, dAmount_)
        , "VaultManager: Invalid Position");
        // check rebased supply of meter
        require(isValidSupply(dAmount_), "VaultManager: MTR borrow is blocked for stability");
        // create vault
        // mint ERC721 for vault
        uint256 gIndex = this.allVaultsLength();
        IV1(v1).mint(_msgSender(), gIndex);
        address vlt = _createVault(WETH, gIndex, cAggregator, dAggregator, dAmount_);
        // wrap native currency
        IWETH(WETH).deposit{value: address(this).balance}();
        uint256 weth = IERC20(WETH).balanceOf(address(this));
        // then transfer collateral native currency to the vault, manage collateral from there.
        assert(IWETH(WETH).transfer(vlt, weth)); 
        allVaults.push(vlt);
        // mint mtr to the sender
        IStablecoin(meter).mint(_msgSender(), dAmount_);
    }
    
    function allVaultsLength() external view returns (uint) {
        return allVaults.length;
    }

    function getCDPConfig(address collateral_) external view override returns (uint MCR, uint LFR, uint SFR, uint cDecimals) {
        return (MCRConfig[collateral_], LFRConfig[collateral_], SFRConfig[collateral_], CDecimals[collateral_]);
    }

    function getMCR(address collateral_) external view override returns (uint) {
        return MCRConfig[collateral_];
    }

    function getLFR(address collateral_) external view override returns (uint) {
        return LFRConfig[collateral_];
    }

    function getSFR(address collateral_) external view override returns (uint) {
        return SFRConfig[collateral_];
    } 
    
    function getCDecimal(address collateral_) external view override returns (uint) {
        return CDecimals[collateral_];
    }     

    function getVault(uint vaultId_) external view override returns (address) {
        return VaultLibrary.vaultFor(address(this), vaultId_, vaultCode);
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

        uint mcr = this.getMCR(collateral_);
        uint cDecimals = this.getCDecimal(collateral_);

        uint256 debtValueAdjusted = debtValue / (10 ** cDecimals);

        // if the debt become obsolete
        return debtValueAdjusted == 0 ? true : collateralValueTimes100 / debtValueAdjusted >= mcr;
    }

    function isValidSupply(uint256 issueAmount_) private view returns (bool) {
        if (rebaseActive) {
            return IERC20(meter).totalSupply() + issueAmount_ <= desiredSupply;
        } else {
            return true;
        }
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

    function vaultCodeHash() external pure override returns (bytes32 vaultCode) {
        vaultCode = keccak256(type(Vault).creationCode);
    }
}
