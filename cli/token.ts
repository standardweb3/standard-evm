import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";
import { executeTx, deployContract } from "./helper";

task("deploy", "Deploy Standard Multichain Token").setAction(async (args, { ethers }) => {
    const [deployer] = await ethers.getSigners();
  
    // Deploy proxy 
    console.log(`Deploying Standard Token with the account: ${deployer.address}`);
  
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  
    const Token = await ethers.getContractFactory("Standard");
    const token = await Token.deploy();
  
    console.log("Token address:", token.address);
  
    console.log("Mining...");
    await token.deployed();
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });
