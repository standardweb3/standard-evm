pragma solidity ^0.8.0;

interface IVaultFactory {
    function getCDPConfig(uint collateralId_) external view returns (uint, uint);
}