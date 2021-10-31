// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./IPrice.sol";

contract Dummy is IPrice {
    int256 price;
    address operator;

    constructor(int256 price_) {
        price = price_;
        operator = msg.sender;
    }

    function setPrice(int256 price_) public {
        price = price_;
    }

    /**
     * Returns the latest price
     */
    function getThePrice() external view override returns (int256) {
        return price;
    }
}
