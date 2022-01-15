// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IVaultFactory.sol";
import "./interfaces/IV1.sol";
import "./interfaces/IVault.sol";

contract V1 is ERC721A, AccessControl, IV1  {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    // Vault factory address
    address public factory;
    // URIs for V1
    mapping (address => string) URIs;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setURI(address collateral_, string memory uri_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "MTRV1: Caller is not a default admin");
        URIs[collateral_] = uri_;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        address vault = IVaultFactory(factory).getVault(tokenId);
        address collateral = IVault(vault).collateral();
        string memory URI = URIs[collateral];
        if(bytes(URI).length == 0) {
            // return placeholder URL
            return URIs[address(0)];
        } else {
            return URI;
        }
    }

    constructor(address factory_)
    ERC721A("MTRVaultV1", "MTRV1", 1) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
        factory = factory_;
    }
    
    function setFactory(address factory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "MTRV1: Caller is not a default admin");
        factory = factory_;
    }

    function mint(address to) external override {
        // Check that the calling account has the minter role
        require(_msgSender() == factory, "MTRV1: Caller is not factory");
        _safeMint(to, 1); 
    }

    function burn(uint256 tokenId_) external override {
        require(hasRole(BURNER_ROLE, _msgSender()), "MTRV1: must have burner role to burn");
        _safeBurn(tokenId_);
    }

    function burnFromVault(uint vaultId_) external override {
        require(IVaultFactory(factory).getVault(vaultId_)  == _msgSender(), "MTRV1: Caller is not vault");
        _safeBurn(vaultId_);
    }

    function exists(uint256 tokenId_) external view override returns (bool) {
        return _exists(tokenId_);
    }
}

