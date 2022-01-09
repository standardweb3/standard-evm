// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IBondFactory {

    /// View funcs
    /// NFT token address
    function b1() external view returns (address);
    /// UniswapV2Factory address
    function v2Factory() external view returns (address);
    /// Address of wrapped eth
    function WETH() external view returns (address);
    /// Address of a manager
    function  manager() external view returns (address);

    /// Getters
    /// Get Config of CDP
    function bondCodeHash() external pure returns (bytes32);
    function createBond(address collateral_, address debt_, uint256 amount_, address recipient) external returns (address bond, uint256 id);
    function getBond(uint bondId_) external view returns (address);

    /// Event
    event BondCreated(uint256 bondId, address collateral, address debt, address creator, address bond, uint256 cAmount, uint256 dAmount);
    event CDPInitialized(address collateral, uint mcr, uint lfr, uint sfr, uint8 cDecimals);
    event RebaseActive(bool set);
    event SetFees(address feeTo, address treasury, address dividend);
    event Rebase(uint256 totalSupply, uint256 desiredSupply);
}