// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IERC20Minimal {
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function decimals() external view returns (uint8);
    function mint(address to, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

interface IUniswapV2PairMinimal {
  function token0() external view returns (address);

  function token1() external view returns (address);
  function sync() external;
}

contract USMDexStabilizer {
  address[] public pairs;
  string public name;
  address public operator;
  uint256 public lastAskedBlock;
  int256 public prevPrice;
  address public usm;

  constructor(address usm_) {
    operator = msg.sender;
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

  function getUSMStabilized() external returns (bool) {
    if (pairs.length == 0) {
      return false;
    } else {
      for (uint256 i = 0; i < pairs.length; i++) {
        if (pairs[i] != address(0)) {
          getUSMStabilizedPair(pairs[i]);
        }
      }
      return true;
    }
  }

  /**
   * Returns the latest price
   */
  function getUSMStabilizedPair(address pair_) internal returns (bool) {
    address token0 = IUniswapV2PairMinimal(pair_).token0();
    address token1 = IUniswapV2PairMinimal(pair_).token1();
    require(token0 == usm || token1 == usm, "WP"); // wrong pair
    address otherStable = token1 == usm ? token0 : token1;
    uint256 reserveDiff = IERC20Minimal(otherStable).balanceOf(pair_) - IERC20Minimal(usm).balanceOf(pair_); 
    IERC20Minimal(usm).mint(pair_, reserveDiff);
    IUniswapV2PairMinimal(pair_).sync();
    return true;
  }

  function transferAndSync(address pair_, uint256 amount) public returns (bool) {
    require(msg.sender == operator, "IA");
    IERC20Minimal(usm).transferFrom(msg.sender, address(this), amount);
    IERC20Minimal(usm).transfer(pair_, amount);
    IUniswapV2PairMinimal(pair_).sync();
    return true;
  }
}
