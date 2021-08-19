pragma solidity ^0.8.0;

import '../oracle/IPrice.sol';

abstract contract Vault {
    /// Price Feed Interface
    IPrice feed;
    /// Aggregator contract address to get processed price data
    address aggregator;
    /// Owner of a vault
    address owner;

    uint vaultId;

    constructor() public {
        factory = msg.sender;
    }

    // called once by the factory at time of deployment
    function initialize(uint vaultId_, address aggregator_, address owner_) external {
        require(msg.sender == factory, 'STND_VAULT: FORBIDDEN'); // sufficient check
        vaultId = vaultId_;
        aggregator = aggregator_;
        owner = owner_;
    }


    /// Get collateral value
    function _getPriceOf() internal returns(int) {
        feed = IPrice(aggregator);
        return feed.getThePrice();
    }
}