pragma solidity ^0.8.0;

interface IVaultManager {
    function getCDPConfig(address collateral) external view returns (uint, uint, uint, uint);
    function getVault(uint vaultId_) external view returns (address);
}