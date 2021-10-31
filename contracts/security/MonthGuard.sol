// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

contract MonthGuard {
    mapping(address => mapping(address => uint256)) public lastClaimed;

    modifier onlyPerOneMonth(address token) {
        require(
            block.timestamp - getLastClaimed(token) >= 30 days,
            "MonthGuard: A month has not passed from the last request"
        );
        _;

        lastClaimed[msg.sender][token] = block.timestamp;
    }

    function getLastClaimed(address token) public view returns (uint256) {
        return lastClaimed[msg.sender][token];
    }
}
