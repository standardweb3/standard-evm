import { task, types } from "hardhat/config";
import { BigNumber, constants, ContractFactory } from "ethers";
import { executeTx, deployContract } from "./helper";const assert = (condition, message) => {
    if (condition) return;
    throw new Error(message);
  };

  // npx hardhat --network rinkeby deploy-amm  --weth 0xdf032bc4b9dc2782bb09352007d4c57b75160b15
  task("pool-deploy", "Deploy Standard MasterPool")
  .addParam("stnd", "Address of Standard")
  .addParam("amount", "Amount of tokens to send in 18 decimals")
  .setAction(async ({stnd, amount}, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
        `Deployer balance: ${ethers.utils.formatEther(
          await deployer.getBalance()
        )} ETH`
      );

    // Deploy MasterPool
    console.log(`Deploying Standard MasterPool with the account: ${deployer.address}`);
    const Pool = await ethers.getContractFactory("MasterPool");
    const pool = await Pool.deploy(deployer.address);
    await deployContract(pool, "MasterPool")


    // Send STND to the pool
    const TokenImpl = await ethers.getContractFactory("UChildAdministrableERC20")
    const impl = await TokenImpl.deploy()
    const tx = await impl.attach(stnd).transfer(pool.address, amount)
    await executeTx(tx, "Execute transfer at")
    

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify MasterPool
    await hre.run("verify:verify", {
        contract: "contracts/pools/MasterPool.sol:MasterPool",
        address: pool.address,
        constructorArguments: [deployer.address],
    })
  });



