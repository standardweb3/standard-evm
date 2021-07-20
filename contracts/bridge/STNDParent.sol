pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Parent is Ownable {
    bool public paused;
    
    function pause(bool _paused) external onlyOwner {
        paused = _paused;
    }
}