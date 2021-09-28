// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IVaultManager {
    function getCDPConfig(address collateral) external view returns (uint, uint, uint, uint);
    function getCDecimal(address collateral) external view returns(uint);
    function getMCR(address collateral) external view returns(uint);
    function getLFR(address collateral) external view returns(uint);
    function getSFR(address collateral) external view returns(uint);
    function getVault(uint vaultId_) external view returns (address);
    function vaultCodeHash() external pure returns (bytes32);
    function createVault(address collateral_, uint cAmount_, uint dAmount_) external returns (bool success);
}