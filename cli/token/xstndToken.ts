import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";
import "@nomiclabs/hardhat-etherscan";
import { executeTx, deployContract, ZERO, MINTER_ROLE, recordAddress } from "../helper";
import "@tenderly/hardhat-tenderly"
import { ConstructorFragment } from "@ethersproject/abi";


task("xstnd-deploy", "Deploy StandardDividend Multichain Token")
  .addParam("stnd", "stnd token contract address")
  .setAction(async ({ stnd }, { ethers }) => {

    const [deployer] = await ethers.getSigners();
    // INFO: hre can only be imported inside task
    const hre = require("hardhat")

    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy  Impl
    console.log(`Deploying Standard Multichain Token Impl with the account: ${deployer.address}`);
    const TokenImpl = await ethers.getContractFactory("StandardDividend")
    const impl = await TokenImpl.deploy(stnd)
    await deployContract(impl, "StandardDividend")

    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Verify Impl
    await hre.run("verify:verify", {
      contract: "contracts/tokens/xSTND.sol:StandardDividend",
      address: impl.address,
      constructorArguments: [stnd]
    })
  });



task("xstnd-verify", "verify StandardDividend Multichain Token")
.addParam("proxy", "Add proxy pattern to the contract for upgradability")
.addParam("impl", "Add impl to the contract for upgradability")
.setAction(async ({ proxy, impl }, { ethers }) => {
      const hre = require("hardhat")
      // Verify Impl
      await hre.run("verify:verify", {
        contract: "contracts/tokens/multichain/stnd_multichain_impl.sol:UChildAdministrableERC20",
        address: impl,
        constructorArguments: []
      })
        // Verify proxy
        await hre.run("verify:verify", {
          contract: "contracts/tokens/multichain/stnd_multichain_proxy.sol:UChildERC20Proxy",
          address: proxy,
          constructorArguments: [impl]
        })
})