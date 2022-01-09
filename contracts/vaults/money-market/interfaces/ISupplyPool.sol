// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface ISupplyPool {
    function sendDebt(address borrower_, uint256 amount_) external;
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
    function sendDebtFromBond(address factory, uint256 bondId_, address to_, uint256 amount_) external;
}
