
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/Math.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '../ownership/Operator.sol';

contract ReserveBank is Operator {
    // Exchange Registry
    // collateral => (exchange address => status)
    // 1: ok 
    // 2: blacklisted
    // 3: locked
    mapping(address => mapping(address => uint8)) public exchangeRegistry;

    // Pool Registry
    // collateral => (exchange address => status)
    // 1: ok 
    // 2: blacklisted
    // 3: locked
    mapping(address => mapping(address => uint8)) public poolRegistry;

    address seignioragePool;
    address bondMarket;

    
}