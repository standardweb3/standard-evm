// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

library BondLibrary {
    // calculates the CREATE2 address for a bond without making any external calls
    function bondFor(address manager, uint256 bondId, bytes32 code) internal pure returns (address bond) {
        bond = address(uint160(uint(keccak256(abi.encodePacked(
                hex"ff",
                manager,
                keccak256(abi.encodePacked(bondId)),
                code // init code hash
            )))));
    }
}
