// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IBondedStrategy {
    function totalSupply() external view returns (uint256);
    function bonded(address holder) external view returns (uint256);
    function lastBonded(address holder) external view returns (uint256);
    function stnd() external view returns (address);
    function claim(address token) external returns (bool success);

    event DividendClaimed(address claimer, address claimingWith, uint256 amount);
    event Bonded(address holder, uint256 amount);
    event UnBonded(address holder, uint256 amount);
}