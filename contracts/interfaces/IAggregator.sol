pragma solidity ^0.6.0;

interface IAggregator {
    /**
     * Returns the latest price
     */
    function getLatestPrice() external view returns (uint256);
}
