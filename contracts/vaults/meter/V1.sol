pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IVaultManager.sol";
import "./IV1.sol";

contract V1 is ERC721, AccessControl, IV1  {
     // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address manager;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor(address manager_)
    ERC721("MTRVaultV1", "MTRV1") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
        manager = manager_;
    }

    function mint(address to, uint256 tokenId_) external override {
        // Check that the calling account has the minter role
        require(hasRole(MINTER_ROLE, msg.sender), "MTRV1: Caller is not a minter");
        _mint(to, tokenId_);
    }

    function burn(uint256 tokenId_) external override {
        require(hasRole(BURNER_ROLE, _msgSender()), "MTRV1: must have burner role to burn");

        _burn(tokenId_);
    }

    function burnFromVault(uint vaultId_) external override {
        require(IVaultManager(manager).getVault(vaultId_)  == _msgSender(), "MTRV1: vault must be registered");
        _burn(vaultId_);
    }

    function exists(uint256 tokenId_) public returns (bool) {
        _exists(tokenId_);
    }
}

