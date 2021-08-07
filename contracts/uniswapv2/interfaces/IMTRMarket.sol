// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface IMTRMarket {
    
    function createMTRPair(address tokenA, address tokenB) external returns (address pair);
    function mtr() external view returns (address);
    function setMTR(address) external;
}