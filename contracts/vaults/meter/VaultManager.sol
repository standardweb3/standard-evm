pragma solidity ^0.8.0;

import '../../oracle/OracleRegistry.sol';
import './Vault.sol';
import './IVaultFactory.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


library CDPEngine {
    //using SafeMath for uint;
    function isUndercollateralized(uint collateralPrice_, uint amount1, uint amount2, uint MCR) public returns (bool) {
        /// (10^8 * 10^18~30) / (10^8 * 10^18~30) * 10^2 <= 10^2
        return ((collateralPrice_ * amount1) / (1e8 * amount2)) * 100 <= MCR; 
    }
}

contract VaultManager is OracleRegistry, IVaultFactory {
    using SafeERC20 for IERC20;
    using SafeMath for uint;
    event VaultCreated(uint collateralId, uint256 vaultId, address creator, address vault);

    // CDP configs
    /// key: Collateral Id, value: Collateral token contract address
    mapping (uint => address) internal Collaterals;
    /// key: Collateral Id, value: Liquidation Fee Ratio (LFR) in percent(%) 
    mapping (uint => uint) internal LFRConfig;
    /// key: Collateral Id, value: Minimum Collateralization Ratio (MCR) in percent(%)
    mapping (uint => uint) internal MCRConfig;
    /// key: Collateral Id, value: Stability Fee Ratio (SFR) in percent(%)
    mapping (uint => uint) internal SFRConfig; 
    
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

    function initializeCDP(uint collateralId_, address collateral_, uint MCR_, uint LFR_, uint SFR_) external onlyManager {
        Collaterals[collateralId_] = collateral_;
        LFRConfig[collateralId_] = LFR_;
        MCRConfig[collateralId_] = MCR_;
        SFRConfig[collateralId_] = SFR_;   
    }

    /// Vault cannot issue stablecoin, it just manages the position
    function _createVault(uint collateralId_, uint vaultId_, address aggregator_, uint256 amount) internal returns (address vault) {
        // calculate cdp
        // require(!_isUndercollateralized(), "VaultManager: Undercollateralized");
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(aggregator_, msg.sender));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(collateralId_, vaultId_, aggregator_, msg.sender, v1, meter);
        
        emit VaultCreated(collateralId_, vaultId_, msg.sender, vault);
        return vault;
    }

    function createCDP(uint collateralId_, uint cAmount_, uint mtrAmount_) public {
        // check tests
        // TODO: @derrenb to add tests for ratio 
        // create vault
        gIndex.add(1);
        vlt = _createVault(collateralId_, gIndex, PriceFeeds[collateralId_], mtrAmount_);
        // transfer collateral to the vault, manage collateral from there
        IERC20(Collaterals[collateralId_]).safeTransferFrom(_msgSender(), vlt, cAmount_);
        // mint mtr to the sender
        IERC20(meter).safemint(_msgSender(), mtrAmount_);
    }

    function getCDPConfig(uint collateralId_) external view override returns (uint MCR, uint LFR) {
        return (MCRConfig[collateralId_], LFRConfig[collateralId_]);
    }

    function _isUndercollateralized(uint collateralPrice_, uint amount1, uint amount2, uint MCR) internal returns (bool) {
        /// (10^8 * 10^18~30) / (10^8 * 10^18~30) * 10^2 <= 10^2
        return ((collateralPrice_ * amount1) / (1e8 * amount2)) * 100 <= MCR; 
    }
}
