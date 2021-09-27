pragma solidity ^0.8.0;

contract BondedGuard {
    mapping(address => uint256) public lastBonded;

    modifier unBondingPeriod() {
        require(
            block.timestamp - lastBonded[msg.sender] >= 30 days,
            "BondedGuard: A month has not passed from the last bonded tx"
        );
        _;
    }
}
