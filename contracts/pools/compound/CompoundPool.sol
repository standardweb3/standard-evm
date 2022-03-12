// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Minimal.sol";
import "./libraries/TransferHelper.sol";

contract CompoundPool {
    /// assets to provide liquidity with product
    mapping(address => bool) reactants;
    /// product to provide liquidity with reactant
    address product;
    /// manager of the pool
    address chemist;
    /// address of a dex router
    address router;

    constructor() {
        chemist = msg.sender;
    }

    function addLiquidity(address[] memory reactants, uint256[] memory amounts) public {

        for(uint i=0; i < reactants.length; i++) {
            (uint256 reactantA, uint256 productA, uint256 liquidity) = IUniswapV2Minimal(router).addLiquidity(reactants[i], product, amounts[i], amounts[i], 0, 0, address(this), block.timestamp + 100000);
           
        }
        // give back lp token
    }
}