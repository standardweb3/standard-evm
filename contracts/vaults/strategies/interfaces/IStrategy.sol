// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.4;

interface IStrategy {
    function activate(uint vaultId_, uint256 amount_) external returns (address conversion);
    function deactivate(uint vaultId_, uint256 amount_) external returns (address reversion);
    function feeToken() external returns (address token);
    function fee() external returns (uint256 fee);
    function reversion() external returns (address token);
    function conversion() external returns (address token);
}