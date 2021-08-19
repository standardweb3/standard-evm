pragma solidity ^0.8.0;

import '../oracle/IPrice.sol';
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OracleRegistry is AccessControl {
    bytes32 public constant ORACLE_OPERATOR_ROLE = keccak256("ORACLE_OPERATOR_ROLE");
    event AggregatorAdded(uint assetId, address aggregator);
    mapping (uint => address) internal PriceFeeds;
    IPrice feed;

    function _getPriceOf(uint assetId_) internal returns(int) {
        require(PriceFeeds[assetId_] != address(0x0), "VAULT: Asset not registered");
        feed = IPrice(PriceFeeds[assetId_]);
        return feed.getThePrice();
    }

    function addOracle(uint assetId_, address aggregator_) public {
        require(hasRole(ORACLE_OPERATOR_ROLE, msg.sender), "Meter: Caller is not an Oracle Operator");
        PriceFeeds[assetId_] = aggregator_;
        emit AggregatorAdded(assetId_, aggregator_);
    }
}