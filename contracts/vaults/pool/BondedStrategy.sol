pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../security/MonthGuard.sol";

contract BondedStrategy is MonthGuard {

    address stnd;
    address mtr;
    mapping(address => uint256) bonded;

    event DividendClaimed(address claimer, uint256 amount);
    
    constructor(address stnd_, address meter_) {
        stnd = stnd_;
        mtr = meter_;
    }

    function claim() public onlyPerOneMonth {
        require(IERC20(stnd).totalSupply() != 0, "FeePool: STND has not been placed yet");
        uint256 proRataBonded = bonded[msg.sender] * IERC20(mtr).balanceOf(address(this)) / IERC20(stnd).totalSupply();
        require(proRataBonded >= 0, "BondedStrategy: Too small Bonded amount");
        require(IERC20(mtr).transfer(msg.sender, proRataBonded), "FeePool: fee transfer failed");
        emit DividendClaimed(msg.sender, proRataBonded);
    }

    function bond(uint256 amount_) public {
        require(IERC20(stnd).transferFrom(msg.sender, address(this), amount_), "FeePool: Not enough allowance to move with given amount");
        bonded[msg.sender] += amount_;
    }

    function unbond(uint256 amount_) public {
        require(bonded[msg.sender] >= amount_, "FeePool: Not enough bonded STND");
        IERC20(stnd).transfer(msg.sender, amount_);
        bonded[msg.sender] -= amount_;
    }
}