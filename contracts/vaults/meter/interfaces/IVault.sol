pragma solidity ^0.8.0;

interface IVault {
    event DepositCollateral(uint256 vaultID, uint256 amount);
    event WithdrawCollateral(uint256 vaultID, uint256 amount);
    event Borrow(uint256 vaultID, uint256 amount);
    event PayBack(uint256 vaultID, uint256 amount, uint256 paybackFee);
    event CloseVault(address vault, uint256 amount, uint256 closingFee);
    event Liquidated(address vault, address collateral, uint256 amount);
}