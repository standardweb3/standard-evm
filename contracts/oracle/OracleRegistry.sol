pragma solidity ^0.8.0;

import '../oracle/IPrice.sol';

contract OracleRegistry  {
    
    event AggregatorAdded(uint assetId, address aggregator);
    mapping (uint => address) internal PriceFeeds;
    IPrice feed;

    function _getPriceOf(uint assetId_) internal returns(int) {
        require(PriceFeeds[assetId_] != address(0x0), "VAULT: Asset not registered");
        feed = IPrice(PriceFeeds[assetId_]);
        return feed.getThePrice();
    }

    function addOracle(uint assetId_, address aggregator_) public {
        PriceFeeds[assetId_] = aggregator_;
        emit AggregatorAdded(assetId_, aggregator_);
    }
}