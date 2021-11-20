// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./MetaERC20.sol";
import "./interfaces/IMeta.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";


library MetaLibrary {
    // calculates the CREATE2 address for a vault without making any external calls
    function verifyUnwrap(address claim, address wrapper, uint256 assetId, bytes32 code) internal pure returns (bool success) {
        address wrapped = address(uint160(uint(keccak256(abi.encodePacked(
                hex"ff",
                wrapper,
                keccak256(abi.encodePacked(claim, assetId)),
                code // init code hash
            )))));
        return wrapped == claim;
    } 
}

contract WrappedMeta {

    mapping(address => address[]) wraps;
    event WrapCreated(address metaverse, uint256 assetId, address wrapped);

    function createWrap(string memory name, string memory symbol, address meta, uint256 assetId, bytes memory data) public returns (address wrapped) {
        bytes memory bytecode = type(MetaERC20).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(name, symbol, meta, assetId, data));
        assembly {
            wrapped := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        wraps[meta][assetId] = wrapped;
        emit WrapCreated(meta, assetId, wrapped);
        return wrapped;
    }

    function wrappedCodeHash() public pure returns (bytes32) {
        return keccak256(type(MetaERC20).creationCode);
    }

    function wrap(address meta, uint256 id, uint256 amount, bytes memory data) public {
        // require wrapped token to be created
        address wrapped = wraps[meta][id];
        require(wrapped != address(0x0), "WrappedMeta: WRAPPED NOT CREATED");
        // Get ERC1155
        IERC1155(meta).safeTransferFrom(msg.sender, address(this), id, amount, data);
        // if it is, mint wrapped erc20 to the sender
        IMeta(wrapped).mint(msg.sender, amount);
    }

    function unwrap(address wrapped, uint256 amount) public {
        // Get metacoin's metaverse address
        address meta = IMeta(wrapped).meta();
        // Get wrapped asset's id
        uint256 assetId = IMeta(wrapped).assetId();
        // Get wrapped asset's data
        bytes memory data = IMeta(wrapped).data();
        // Verify unwrapped
        bool verify = MetaLibrary.verifyUnwrap(meta, address(this), assetId, wrappedCodeHash());
        require(verify, "WrappedMeta: NOT WRAPPED FROM THIS");
        // Get Wrapped token
        IMeta(wrapped).transferFrom(msg.sender, address(this), amount);
        // Give back the erc1155
        IERC1155(meta).safeTransferFrom(address(this), msg.sender, assetId, amount, data);
    }
}