// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "../vaults/meter/interfaces/IERC20Minimal.sol";

import "./interfaces/IPrice.sol";

interface IUniswapV2PairMinimal {
  function token0() external view returns (address);

  function token1() external view returns (address);
}

contract USMDexOracle is IPrice {
  address[] public pairs;
  string public name;
  address public operator;
  uint256 public lastAskedBlock;
  int256 public prevPrice;
  address public usm;

  constructor(address usm_, string memory name_) {
    operator = msg.sender;
    name = name_;
    usm = usm_;
  }

  function addPair(address pair_) public {
    require(msg.sender == operator, "IA");
    pairs.push(pair_);
  }

  function setPair(uint256 index, address pair_) public {
    require(msg.sender == operator, "IA");
    pairs[index] = pair_;
  }

  function getThePrice() external view override returns (int256 price) {
    if (pairs.length == 0) {
      price = 100000000;
    } else {
      int256 sum = 0;
      int256 count = 0;
      for (uint256 i = 0; i < pairs.length; i++) {
        if (pairs[i] != address(0)) {
          count++;
          sum += getUSMPairPrice(pairs[i]);
        }
      }
      price = sum / count;
    }
  }

  /**
   * Returns the latest price
   */
  function getUSMPairPrice(address pair_) public view returns (int256) {
    address token0 = IUniswapV2PairMinimal(pair_).token0();
    address token1 = IUniswapV2PairMinimal(pair_).token1();
    address from = token0 == usm ? token0 : token1;
    address to = token1 == usm ? token0 : token1;
    int256 fromP = int256(
      IERC20Minimal(from).balanceOf(pair_) / 10**IERC20Minimal(from).decimals()
    );
    int256 toP = int256(
      IERC20Minimal(to).balanceOf(pair_) / 10**IERC20Minimal(to).decimals()
    );
    int256 price = fromP == 0 ? int256(0) : (10**8 * toP) / fromP; // try to save 8 decimals
    // recover padding zeros as 8 decimal string 

    // Flashswap guard: if current block equals last asked block, return previous price, otherwise set prevPrice as the current price, set lastAskedBlock in current block
    require(lastAskedBlock < block.number, "DexOracle: FlashSwap detected");
    return price;
  }
}
