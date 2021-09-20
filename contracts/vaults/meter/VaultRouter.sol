pragma solidity ^0.8.0;


import "./interfaces/IVaultManager.sol";
import "./interfaces/IVault.sol";
import "./libraries/VaultLibrary.sol";
import "./interfaces/IStablecoin.sol";
import "./interfaces/IWETH.sol";

contract VaultRouter {

    bytes32 vaultCode;
    address manager;

    constructor(address manager_) {
        manager = manager_;
        vaultCode = IVaultManager(manager_).vaultCodeHash();
    }
}