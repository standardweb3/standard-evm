import { task, types } from "hardhat/config";

// npx hardhat --network rinkeby vault-deploy  --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0xb10db5fc1c2ca4d72e6ebe1a9494b61fa3b71385
task("verify", "Verify a contract")
  .setAction(async ({ contract }, { ethers }) => {

  })
