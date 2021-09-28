// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IVaultRouter {
    function manager() external view returns (address);
    function WETH() external view returns (address);
    function createCDP(
        address collateral_,
        uint cAmount_,
        uint dAmount_
    ) external returns (address vault);
    function createCDPETH(
        uint dAmount_
    ) external returns (address vault);
    function createCDPWithPermit(
        address collateral_,
        uint cAmount_,
        uint dAmount_,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (address vault);
    function createCDPETHWithPermit(
        uint dAmount_,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (address vault);
    function liquidate(uint vaultId) external;
    function depositCollateralETH() payable external;
    function depositCollateral(uint256 amount_) external;
    function withdrawCollateralETH(uint256 amount_) payable external;
    function withdrawCollateral(uint256 amount_) external;
    function payDebt(uint256 amount_) external;
    function closeVault(uint256 amount_) external;
}