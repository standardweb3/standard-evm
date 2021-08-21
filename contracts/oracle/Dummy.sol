pragma solidity ^0.8.0;

import "./IPrice.sol";

contract Dummy is IPrice {
    int price;
    address operator;

    constructor(int price_) {
        price = price_;
        operator = msg.sender;
    }

    function setPrice(int price_) public {
        price = price_;
    }

    /**
     * Returns the latest price
     */
    function getThePrice() external override view returns (int) {
        return price;
    }
}