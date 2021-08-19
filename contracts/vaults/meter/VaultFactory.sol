pragma solidity ^0.8.0;

import '../oracle/OracleRegistry.sol';
import './Vault.sol';

library CDPEngine {
    
}

contract Vault is OracleRegistry {
    event CreateVault(uint256 vaultID, address creator);

    function createVault(uint vaultId_, address aggregator_) external override returns (address pair) {
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(aggregator_, msg.sender));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Vault(vault).initialize(vaultId_, aggregator_, msg.sender);
        emit CreateVault(vaultId_, msg.sender);
    }
}