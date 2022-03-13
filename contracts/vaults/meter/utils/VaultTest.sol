// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../interfaces/IVault.sol";
import "../interfaces/IV1.sol";
import "../interfaces/IVaultFactory.sol";
import "../interfaces/IUniswapV2Minimal.sol";

interface INFTTest {
    function ownerOf(uint256 id) external returns (address);
}

contract MockOracle  {
    int256 price;
    string public name;
    address operator;

    constructor(int256 price_, string memory name_) {
        price = price_;
        operator = msg.sender;
        name = name_;
    }

    function setPrice(int256 price_) public {
        require(msg.sender == operator, "IA");
        price = price_;
    }

    /**
     * Returns the latest price
     */
    function getThePrice() external view returns (int256) {
        return price;
    }
}


contract VaultTest {
    address factory;
    address oracle;
    address pair;
    address v1;

    constructor(address oracle_, address factory_,address pair_, address v1_) {
        factory = factory_;
        oracle = oracle_;
        pair = pair_;
        v1 = v1_;
    }

    function setOracle(uint256 value) public {
        MockOracle(oracle).setPrice(int256(value));
    }
    function liquidate(uint256[] memory ids) public {
        for(uint i=0; i<ids.length; i++) {  
         if (INFTTest(v1).ownerOf(ids[i]) != address(1)) {
            address vault = IVaultFactory(factory).getVault(ids[i]);
            IVault(vault).liquidate();
            IUniswapV2Minimal(pair).sync();
         }
        }
    }

    function getVault(uint256 id) public returns (address vault) {
        vault = IVaultFactory(factory).getVault(id);
    }

    function liquidateOne(uint256 id) public {
        address vault = IVaultFactory(factory).getVault(id);
        IVault(vault).liquidate();
        IUniswapV2Minimal(pair).sync();
    }
}
