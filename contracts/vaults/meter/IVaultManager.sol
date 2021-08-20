pragma solidity ^0.8.0;

interface IVaultManager {
    function getCDPConfig(uint collateralId_) external view returns (uint, uint);
    function getVault(uint vaultId_) external view returns (address);
}