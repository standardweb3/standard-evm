pragma solidity ^0.8.0;

interface IVault {
    event TransferVault(uint256 vaultID, address from, address to);
    event DepositCollateral(uint256 vaultID, uint256 amount);
    event WithdrawCollateral(uint256 vaultID, uint256 amount);
    event Borrow(uint256 vaultID, uint256 amount);
    event PayBack(uint256 vaultID, uint256 amount, uint256 closingFee);
    
}