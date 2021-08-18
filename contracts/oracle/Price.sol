
pragma solidity ^0.8.0;

import "./AggregatorV3Interface.sol";
import "./IPrice.sol";

contract PriceConsumerV3 is IPrice {

    AggregatorV3Interface internal priceFeed;

    string public name;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor(address _aggregator, string memory _name) public {
        priceFeed = AggregatorV3Interface(_aggregator);
        name = _name;
    }

    /**
     * Returns the latest price
     */
    function getThePrice() external override view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}