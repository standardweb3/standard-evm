pragma solidity ^0.8.0;

import '../../oracle/OracleRegistry.sol';
import './Vault.sol';
import './IVaultFactory.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


library CDPEngine {
    //using SafeMath for uint;
    function isUndercollateralized(uint collateralPrice_, uint amount1, uint amount2, uint MCR) public returns (bool) {
        /// (10^8~16 * 10^18~30) / (10^8 * 10^18~30) * 10^2 <= 10^2
        return ((collateralPrice_ * amount1) / (1e8 * amount2)) * 100 <= MCR; 
    }
}




contract VaultFactory is OracleRegistry, IVaultFactory {
    using SafeMath for uint;
    event VaultCreated(uint collateralId, uint256 vaultId, address creator, address vault);

    // CDP configs
    /// key: Asset ID, value: Liquidation Fee Ratio (LFR) in percent(%) 
    mapping (uint => uint) internal LFRConfig;
    /// key: Asset ID, value: Minimum Collateralization Ratio (MCR) in percent(%)
    mapping (uint => uint) internal MCRConfig;
    
    /// Address of cdp nft registry
    address v1;
    address manager;

    constructor(address v1_) {
        v1 = v1_;
        manager = _msgSender();
    }

    modifier onlyManager {
        require(_msgSender() == manager, "VaultFactory: Factory is not managed by you");
        _;
    }


    function initializeCDP(uint collateralId_, uint MCR_, uint LFR_) external onlyManager {
        LFRConfig[collateralId_] = LFR_;
        MCRConfig[collateralId_] = MCR_;   
    }


    function createVault(uint collateralId_, uint vaultId_, address aggregator_) external returns (address vault) {
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(aggregator_, msg.sender));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(collateralId_, vaultId_, aggregator_, msg.sender, v1);
        emit VaultCreated(collateralId_, vaultId_, msg.sender, vault);
    }

    function getCDPConfig(uint collateralId_) external view override returns (uint MCR, uint LFR) {
        return (MCRConfig[collateralId_], LFRConfig[collateralId_]);
    }
}
