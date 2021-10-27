// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../security/MonthGuard.sol";
import "../../security/BondedGuard.sol";
import "./interfaces/IBondedStrategy.sol";

contract BondedStrategy is MonthGuard, BondedGuard, IBondedStrategy {

    address public override stnd;
    uint256 public override totalSupply;
    mapping(address => uint256) public override bonded;
    mapping(address => uint256) public override lastBonded;
    
    constructor(address stnd_) {
        stnd = stnd_;
    }

    function claim(address token) external override onlyPerOneMonth(token) returns (bool success) {
        require(IERC20(stnd).totalSupply() != 0, "BondedStrategy: STND has not been placed yet");
        uint256 proRataBonded = bonded[msg.sender] * IERC20(token).balanceOf(address(this)) / totalSupply;
        require(proRataBonded >= 0, "BondedStrategy: Too small Bonded amount");
        require(IERC20(token).transfer(msg.sender, proRataBonded), "BondedStrategy: fee transfer failed");
        emit DividendClaimed(msg.sender, token, proRataBonded);
        return true;
    }

    function bond(uint256 amount_) external {
        require(IERC20(stnd).transferFrom(msg.sender, address(this), amount_), "BondedStrategy: Not enough allowance to move with given amount");
        bonded[msg.sender] += amount_;
        totalSupply += amount_;
        lastBonded[msg.sender] = block.timestamp;
        emit Bonded(msg.sender, amount_);
    }

    function unbond(uint256 amount_) external unBondingPeriod {
        require(bonded[msg.sender] >= amount_, "BondedStrategy: Not enough bonded STND");
        require(
            block.timestamp - lastBonded[msg.sender] >= 30 days,
            "BondedGuard: A month has not passed from the last bonded tx"
        );
        IERC20(stnd).transfer(msg.sender, amount_);
        bonded[msg.sender] -= amount_;
        totalSupply -= amount_;
        emit UnBonded(msg.sender, amount_);
    }

    // Get balance of STND bonded for snapshot integration
    function balanceOf(address account) external view returns (uint256) {
        return bonded[account];
    }

}