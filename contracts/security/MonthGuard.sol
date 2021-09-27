pragma solidity ^0.8.0;

contract MonthGuard {
    mapping(address => mapping(address => uint256)) public last;

    modifier onlyPerOneMonth(address token) {
        require(
            block.timestamp - last[msg.sender][token] >= 30 days,
            "MonthGuard: A month has not passed from the last request"
        );
        _;

        last[msg.sender][token] = block.timestamp;
    }
}
