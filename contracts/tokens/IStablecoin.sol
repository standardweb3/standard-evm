pragma solidity ^0.8.0;

interface IStablecoin {
    function mint(address to, uint256 amount) external;
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount) external; 
    function approveFromManager(address sender, address spender, uint256 amount) external;
}