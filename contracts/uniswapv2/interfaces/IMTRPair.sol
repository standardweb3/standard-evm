// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface IMTRPair {
    function vault() external view returns (address);
    function migrator() external view returns (address);
    function liquidate(address mtr, address collateral, uint value) external; 
    function migrate(address vault) external;  
}
