// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// TODO: the required openzeppelin version here is 4.0.0

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Base Standart token class wich is basicalle burnable ERC20 token with custom decimals
 *
 * Useful when you need to deploy a token with a custom decimals value instead of the default 18.
 */
abstract contract AbstractStandartToken is ERC20 {
    uint8 immutable private _decimals;

    /**
     * @dev Initializes {decimals} with
     * a custom value
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (uint8 decimals_) {
        _decimals = decimals_;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}