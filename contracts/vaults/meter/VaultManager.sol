pragma solidity ^0.8.0;

import '../../oracle/OracleRegistry.sol';
import './Vault.sol';
import './IVaultManager.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IV1.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


library CDPEngine {
    //using SafeMath for uint;
    function isUndercollateralized(uint collateralPrice_, uint amount1, uint amount2, uint MCR) public returns (bool) {
        /// (10^8 * 10^18~30) / (10^8 * 10^18~30) * 10^2 <= 10^2
        return (collateralPrice_ * amount1 * 100) / (1e8 * amount2)  <= MCR; 
    }
}

contract VaultManager is OracleRegistry, IVaultManager {
    using SafeERC20 for IERC20;
    event VaultCreated(address collateral, uint256 vaultId, address creator, address vault);

    // Vaults
    mapping (uint => address) Vaults;

    // CDP configs
    /// key: Collateral address, value: Liquidation Fee Ratio (LFR) in percent(%) 
    mapping (address => uint) internal LFRConfig;
    /// key: Collateral address, value: Minimum Collateralization Ratio (MCR) in percent(%)
    mapping (address => uint) internal MCRConfig;
    /// key: Collateral address, value: Stability Fee Ratio (SFR) in percent(%)
    mapping (address => uint) internal SFRConfig; 
    
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

    constructor(address v1_, address meter_) {
        v1 = v1_;
        meter = meter_;
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
    function _createVault(address collateral_, uint vaultId_, uint256 amount_) internal returns (address vault) {
        // calculate cdp
        // require(!_isUndercollateralized(), "VaultManager: Undercollateralized");
        // get aggregators
        address cAggregator = PriceFeeds[collateral_];
        address dAggregator = PriceFeeds[meter];
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(collateral_, vaultId_, cAggregator, dAggregator, amount_, msg.sender));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(collateral_, vaultId_, cAggregator, dAggregator, v1, meter, amount_);
        
        emit VaultCreated(collateral_, vaultId_, msg.sender, vault);
        return vault;
    }

    function createCDP(address collateral_, uint cAmount_, uint mtrAmount_) public {
        // check tests
        // TODO: @derrenb to add tests for ratio 
        // create vault
        // mint ERC721 for vault
        IV1(v1).mint(_msgSender(), gIndex);
        vlt = _createVault(collateral_, gIndex, mtrAmount_);
        // transfer collateral to the vault, manage collateral from there
        IERC20(collateral_).safeTransferFrom(_msgSender(), vlt, cAmount_);
        gIndex + 1;
        // mint mtr to the sender
        // check rebased supply of meter
        //IERC20(meter).safemint(_msgSender(), mtrAmount_);
    }

    function getCDPConfig(address collateral_) external view override returns (uint MCR, uint LFR, uint SFR) {
        return (MCRConfig[collateral_], LFRConfig[collateral_], SFRConfig[collateral_]);
    }

    function getVault(uint vaultId_) external view override returns (address) {
        return Vaults[vaultId_];
    }

    function _isUndercollateralized(uint collateralPrice_, uint amount1, uint amount2, uint MCR) internal returns (bool) {
        /// (10^8 * 10^18~30) / (10^8 * 10^18~30) * 10^2 <= 10^2
        return ((collateralPrice_ * amount1) / (1e8 * amount2)) * 100 <= MCR; 
    }

}
