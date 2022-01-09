// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IBondFactory.sol";
import "./interfaces/IB1.sol";
import "./interfaces/IBond.sol";

contract V1 is ERC721Enumerable, AccessControl, IB1  {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    // Bond factory address
    address public factory;
    // URIs for V1
    mapping (address => string) URIs;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setURI(address collateral_, string memory uri_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "MTRV1: Caller is not a default admin");
        URIs[collateral_] = uri_;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        address vault = IBondFactory(factory).getBond(tokenId);
        address collateral = IBond(vault).collateral();
        string memory URI = URIs[collateral];
        if(bytes(URI).length == 0) {
            // return placeholder URL
            return URIs[address(0)];
        } else {
            return URI;
        }
    }

    constructor(address factory_)
    ERC721("StandardB1", "B1") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
        factory = factory_;
    }
    
    function setFactory(address factory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "MTRV1: Caller is not a default admin");
        factory = factory_;
    }

    function mint(address to, uint256 tokenId_) external override {
        // Check that the calling account has the minter role
        require(_msgSender() == factory, "MTRV1: Caller is not factory");
        _mint(to, tokenId_);
    }

    function burn(uint256 tokenId_) external override {
        require(hasRole(BURNER_ROLE, _msgSender()), "MTRV1: must have burner role to burn");
        _burn(tokenId_);
    }

    function burnFromBond(uint vaultId_) external override {
        require(IBondFactory(factory).getBond(vaultId_)  == _msgSender(), "MTRV1: Caller is not vault");
        _burn(vaultId_);
    }

    function exists(uint256 tokenId_) external view override returns (bool) {
        return _exists(tokenId_);
    }
}

