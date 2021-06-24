// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Standard.sol";

// File: @openzeppelin/contracts/utils/math/Math.sol

import "@openzeppelin/contracts/utils/math/Math.sol";

// File: @openzeppelin/contracts/utils/math/SafeMath.sol

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// File: @openzeppelin/contracts/utils/Address.sol

import "@openzeppelin/contracts/utils/Address.sol";

// File: @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PolkadotClaim {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public stnd;

    struct Claim {
        uint256 index; // Index for short address.
        bytes32 Address; // Address to receive from Standard address.
        uint256 amount;
        bool claimed; // Has the balance been claimed?
    }

    // Maps allocations to `Claim` data by addresses.
    mapping(address => Claim) public claims;

    // Maps allocations to `Claim` data by index.
    mapping(uint256 => Claim) public claims_idx;

    // Address of the admin
    address admin;

    // index for claims
    uint256 index;

    // Claim pointer
    Claim claim;

    //

    constructor() {
        admin = msg.sender;
        index = 0;
    }

    // Event for when an allocation is claimed to a Standard(polkadot) address.
    event Claimed(
        address indexed eth,
        bytes32 indexed stnd,
        uint256 indexed idx
    );

    /*
     *  @dev Claim allocations for substrate chain
     */
    function claim_allo(bytes32 dot) public {
        claim = Claim(index, dot, stnd.balanceOf(msg.sender), false);
        // create claims by address
        claims[msg.sender] = claim;
        // create claims by index
        claims_idx[index] = claim;
        // Increment index
        index++;

        emit Claimed(msg.sender, dot, index);
    }
}
