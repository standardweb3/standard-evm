# Standard AMM

Code from [Uniswap V2](https://github.com/Uniswap/uniswap-v2-core/tree/27f6354bae6685612c182c3bc7577e61bc8717e3/contracts) from [Sushiswap](https://github.com/sushiswap/sushiswap/blob/canary/contracts/uniswapv2/README.md) with the following modifications.

1. Change `UniswapV2ERC20.sol` to LTR token

Code from [MasterChef V2](https://github.com/sushiswap/sushiswap/blob/canary/contracts) with the following modifications.

2. Add fee share pool

1. Removing connection from MasterChef V1 and control

To see all diffs:

```
$ git diff 4a1baf2986973ca2799955368ebd36be5900ebb7 .
```