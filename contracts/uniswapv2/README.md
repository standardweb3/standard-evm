# Uniswap V2 Area

Code from [Uniswap V2](https://github.com/Uniswap/uniswap-v2-core/tree/27f6354bae6685612c182c3bc7577e61bc8717e3/contracts) from [Sushiswap](https://github.com/sushiswap/sushiswap/blob/canary/contracts/uniswapv2/README.md) with the following modifications.

1. Add custom pair for MTR stablecoin liquidation
2. Add `createMTRPair` function in `UniswapV2Factory.sol`
3. Add custom pair `MTRPair` to integrate vault

To see all diffs:

```
$ git diff <final change commit hash> .
```