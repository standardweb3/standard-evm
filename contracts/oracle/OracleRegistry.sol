pragma solidity ^0.8.0;

import '../oracle/IPrice.sol';

contract OracleRegistry {
    
    mapping (uint => address) internal PriceFeeds;
    IPrice feed;
    int public s;

    function _getPriceOf(uint assetId_) public returns(int) {
        require(PriceFeeds[assetId_] != address(0x0), "VAULT: Asset not registered");
        feed = IPrice(PriceFeeds[assetId_]);
        return feed.getThePrice();
    }

    function addOracle(uint assetId_, address aggregator_) public {
        PriceFeeds[assetId_] = aggregator_;
    }
}