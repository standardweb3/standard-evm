// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IBondManager {

    /// View funcs
    /// BondFactory address
    function bondFactory() external view returns (address);
    /// SupplyFactory address
    function supplyFactory() external view returns (address);
    /// Address of feeTo
    function feeTo() external view returns (address);
    /// Address of the dividend pool
    function dividend() external view returns (address);
    /// Address of Standard treasury
    function treasury() external view returns (address);
    
    /// Getters
    /// Get Config of CDP
    function getCDPConfig(address collateral, address debt) external view returns (uint, uint, uint, uint, bool);
    function getMCR(address collateral, address debt) external view returns(uint);
    function getLFR(address collateral, address debt) external view returns(uint);
    function getSFR(address collateral, address debt) external view returns(uint);
    function getRR(address debt) external view returns(uint);
    function getOpen(address collateral, address debt) external view returns (bool);
    function getSupplyPool(address debt_) external view returns (address);
    function getAssetPrice(address asset) external returns (uint);
    function getAssetValue(address asset, uint256 amount) external returns (uint256);
    function isValidCDP(address collateral, address debt, uint256 cAmount, uint256 dAmount) external returns (bool);
    function createCDP(address collateral_, address debt_, uint cAmount_, uint dAmount_) external returns (bool success);

    /// Event
    event BondCreated(uint256 bondId, address collateral, address debt, address creator, address bond, uint256 cAmount, uint256 dAmount);
    event SupplyCreated(address debt, address supplyPool);
    event CDPInitialized(address collateral, uint mcr, uint lfr, uint sfr, uint8 cDecimals);
    event SupplyInitialized(address debt, uint rr, uint8 cDecimals);
    event RebaseActive(bool set);
    event SetFees(address feeTo, address treasury, address dividend);
    event Rebase(uint256 totalSupply, uint256 desiredSupply);
}