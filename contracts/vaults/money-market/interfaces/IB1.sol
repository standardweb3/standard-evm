// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IB1 {
    function mint(address to, uint256 tokenId_) external;
    function burn(uint256 tokenId_) external;
    function burnFromBond(uint bondId_) external;
    function exists(uint256 tokenId_) external view returns (bool);
}