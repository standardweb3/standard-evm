// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;
import '../Vault.sol';

contract CalHash {
    function getInitHash() public pure returns(bytes32){
        bytes memory bytecode = type(Vault).creationCode;
        return keccak256(abi.encodePacked(bytecode));
    }
}