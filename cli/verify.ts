import { task, types } from "hardhat/config";
import { ChainId, getAddress } from "./helper";

// npx hardhat --network rinkeby vault-deploy  --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0xb10db5fc1c2ca4d72e6ebe1a9494b61fa3b71385
task("verify", "Verify a contract")
  .addParam("contract", "name of the contract in solidity code")
  .addParam("factory", "address of factory smart contract")
  .setAction(async ({ contract, factory }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const hre = require("hardhat");
    const at =
        (await getAddress(contract, chain))


    // Verify V1
    await hre.run("verify:verify", {
        contract: "contracts/vaults/meter/V1.sol:V1",
        address: at,
        cosntructorArguments: [factory],
      });
  })
