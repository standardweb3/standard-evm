# Standard AMM

Code from [Uniswap V2](https://github.com/Uniswap/uniswap-v2-core/tree/27f6354bae6685612c182c3bc7577e61bc8717e3/contracts) from [Sushiswap](https://github.com/sushiswap/sushiswap/blob/canary/contracts/uniswapv2/README.md) with the following modifications. This code is mixed with Apache-2.0 license with GPL-3.0.
It seems they are compatible from this [post](https://www.whitesourcesoftware.com/resources/blog/top-10-apache-license-questions-answered/#:~:text=5.-,Is%20the%20Apache%20License%20compatible%20with%20the%20GNU%20GPL%3F,must%20be%20released%20under%20GPLv3.), but please contact official email if it is not.

The organization clarifies differences as below:

1. Change `UniswapV2ERC20.sol` to LTR token
2. Add fee share pool
To see all diffs:

```
$ git diff 4a1baf2986973ca2799955368ebd36be5900ebb7 .
```