// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

library VaultLibrary {
    // calculates the CREATE2 address for a vault without making any external calls
    function vaultFor(address manager, uint256 vaultId) internal pure returns (address vault) {
        vault = address(uint160(uint(keccak256(abi.encodePacked(
                hex'ff',
                manager,
                keccak256(abi.encodePacked(vaultId)),
                hex'704be8e6d228470f6b41d8504a86deb667be93086c073a04b8ea27a18c6533ec' // init code hash
            )))));
    }
}
