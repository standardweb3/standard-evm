import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";

  task("deploy-amm", "Deploy Standard AMM")
  .addParam("weth", "Address of Wrapped ETH")
  .setAction(async (args, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
        `Deployer balance: ${ethers.utils.formatEther(
          await deployer.getBalance()
        )} ETH`
      );

    // Deploy factory
    console.log(`Deploying Standard AMM factory with the account: ${deployer.address}`);

    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy();
  
    console.log("UniswapV2Factory address:", factory.address);
  
    console.log("Mining...");
    await factory.deployed();
    // Deploy router
    console.log(`Deploying Standard AMM router with the account: ${deployer.address}`);
  
    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const router = await Router.deploy();

    console.log("UniswapV2Router02 address:", router.address);

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

  });
  
  