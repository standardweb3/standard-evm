// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IVaultFactory.sol";
import "./interfaces/IV1.sol";
import "./interfaces/IVault.sol";
import "./svg/interfaces/INFTSVG.sol";

contract V1 is ERC721A, AccessControl, IV1  {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    // Vault factory address
    address public factory;
    // SVG for V1
    address public SVG;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setSVG(address svg_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "V1: Caller is not a default admin");
        SVG = svg_;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory tokenURI) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        tokenURI = INFTSVG(SVG).tokenURI(tokenId);
    }

    constructor(address factory_)
    ERC721A("VaultOne", "V1") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
        factory = factory_;
    }
    
    function setFactory(address factory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "V1: Caller is not a default admin");
        factory = factory_;
    }

    function mint(address to) external override {
        // Check that the calling account has the minter role
        require(_msgSender() == factory, "V1: Caller is not factory");
        _safeMint(to, 1); 
    }

    function burn(uint256 tokenId_) external override {
        require(hasRole(BURNER_ROLE, _msgSender()), "V1: must have burner role to burn");
        _burn(tokenId_);
    }

    function burnFromVault(uint vaultId_) external override {
        require(IVaultFactory(factory).getVault(vaultId_)  == _msgSender(), "V1: Caller is not vault");
        _burn(vaultId_);
    }

    function exists(uint256 tokenId_) external view override returns (bool) {
        return _exists(tokenId_);
    }
}
