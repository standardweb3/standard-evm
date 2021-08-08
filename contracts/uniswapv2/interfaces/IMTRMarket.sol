// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface IMTRMarket {
    function vault() external view returns (address);
    function operator() external view returns (address);
    function migrate(address vault) external;
}