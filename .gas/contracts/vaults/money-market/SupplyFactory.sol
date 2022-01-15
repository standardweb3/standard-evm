// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./SupplyPool.sol";
import "./interfaces/ISupplyFactory.sol";

contract SupplyFactory is AccessControl, ISupplyFactory {

    // Supplys
    address[] public allSupplies;
    /// Address of bond manager
    address public override manager;
    /// Address of bond factory;
    address public override factory;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /// Supply cannot issue stablecoin, it just manages the position
    function createSupply(address debt_) external override returns (address supply, uint256 id) {
        uint256 gIndex = allSuppliesLength();
        bytes memory bytecode = type(SupplyPool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(gIndex));
        assembly {
            supply := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        SupplyPool(supply).initialize(debt_, manager, factory);
        allSupplies.push(supply);
        return (supply, gIndex);
    }
    

    function initialize(address manager_, address factory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
        manager = manager_;
        factory = factory_;
    }

    function getSupply(uint supplyId_) external view override returns (address) {
        return allSupplies[supplyId_];
    }


    function supplyCodeHash() external pure override returns (bytes32 supplyCode) {
        return keccak256(type(SupplyPool).creationCode);
    }

    function allSuppliesLength() public view returns (uint) {
        return allSupplies.length;
    }
}