pragma solidity ^0.8.0;

interface IV1 {
    function mint(address to, uint256 tokenId_) external;
    function burn(uint256 tokenId_) external;
    function burnFromVault(uint vaultId_) external;
}