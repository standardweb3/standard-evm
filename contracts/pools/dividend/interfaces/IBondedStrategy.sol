// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IBondedStrategy {
    function totalSupply() external view returns (uint256);
    function bonded(address holder) external view returns (uint256);
    function lastBonded(address holder) external view returns (uint256);
    function stnd() external view returns (address);
    event DividendClaimed(address claimer, uint256 amount);
    function claim(address token) external returns (bool success);
}