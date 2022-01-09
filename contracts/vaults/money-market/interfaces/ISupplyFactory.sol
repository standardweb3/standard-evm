// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface ISupplyFactory {
    function  manager() external view returns (address);
    function  factory() external view returns (address);
    function supplyCodeHash() external pure returns (bytes32);
    function createSupply(address debt_) external returns (address supply, uint256 id); 
    function getSupply(uint bondId_) external view returns (address);
}