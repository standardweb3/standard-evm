pragma solidity ^0.8.0;

interface IPrice {
    function getThePrice() external view returns (int price);
}