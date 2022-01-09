// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Bond.sol";
import "./interfaces/IBondFactory.sol";

contract BondFactory is AccessControl, IBondFactory {

    // Bonds
    address[] public allBonds;
    /// Address of uniswapv2 factory
    address public override v2Factory;
    /// Address of cdp nft registry
    address public override b1;
    /// Address of Wrapped Ether
    address public override WETH;
    /// Address of manager
    address public override manager;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /// Bond cannot issue stablecoin, it just manages the position
    function createBond(address collateral_, address debt_, uint256 amount_, address recipient) external override returns (address bond, uint256 id) {
        require(msg.sender == manager, "IA");
        uint256 gIndex = allBondsLength();
        IB1(b1).mint(recipient, gIndex);
        bytes memory bytecode = type(Bond).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(gIndex));
        assembly {
            bond := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Bond(bond).initialize(manager, gIndex, collateral_, debt_, b1, amount_, v2Factory, WETH);
        allBonds.push(bond);
        return (bond, gIndex);
    }

    function initialize(address b1_, address v2Factory_, address weth_, address manager_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        b1 = b1_;
        v2Factory = v2Factory_;
        WETH = weth_;
        manager = manager_;
    }

    function getBond(uint bondId_) external view override returns (address) {
        return allBonds[bondId_];
    }


    function bondCodeHash() external pure override returns (bytes32 bondCode) {
        return keccak256(type(Bond).creationCode);
    }

    function allBondsLength() public view returns (uint) {
        return allBonds.length;
    }
}