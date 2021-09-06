pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../security/MonthGuard.sol";

contract FeePool is MonthGuard {

    address stnd;
    address mtr;

    event DividendClaimed(address claimer, uint256 amount);
    
    constructor(address stnd_, address meter_) {
        stnd = stnd_;
        mtr = meter_;
    }

    function claim() public onlyPerOneMonth {
        require(IERC20(stnd).totalSupply() != 0, "FeePool: STND has not been placed yet");
        uint256 proRataSTND = IERC20(stnd).balanceOf(msg.sender) * IERC20(mtr).balanceOf(address(this)) / IERC20(stnd).totalSupply();
        assert(proRataSTND >= 0);
        IERC20(mtr).transfer(msg.sender, proRataSTND);
        emit DividendClaimed(msg.sender, proRataSTND);
    }
}