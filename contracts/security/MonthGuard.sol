pragma solidity ^0.8.0;

contract MonthGuard {
    mapping(address => uint256) last;

    modifier onlyPerOneMonth() {
        require(block.timestamp - last[msg.sender] >= 30 days);
        _;

        last[msg.sender] = block.timestamp;
    }
}