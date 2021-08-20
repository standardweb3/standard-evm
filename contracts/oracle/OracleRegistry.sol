pragma solidity ^0.8.0;

import '../oracle/IPrice.sol';
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OracleRegistry is AccessControl {
    bytes32 public constant ORACLE_OPERATOR_ROLE = keccak256("ORACLE_OPERATOR_ROLE");
    event AggregatorAdded(address asset, address aggregator);
    mapping (address => address) internal PriceFeeds;
    IPrice feed;

    function addOracle(address asset_, address aggregator_) public {
        require(hasRole(ORACLE_OPERATOR_ROLE, msg.sender), "Meter: Caller is not an Oracle Operator");
        PriceFeeds[asset_] = aggregator_;
        emit AggregatorAdded(asset_, aggregator_);
    }
}