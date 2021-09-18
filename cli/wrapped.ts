import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";
import "@nomiclabs/hardhat-etherscan";
import { executeTx, deployContract} from "./helper";
import { ConstructorFragment } from "@ethersproject/abi";

task("weth-deploy", "Deploy Wrapped Ether")
.addOptionalParam("deposit", "deposit eth amount in ether to get initial weth for testing", "0", types.string)
.setAction(async ({deposit}, {ethers}) => {
    
    const [deployer] = await ethers.getSigners();
    
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy WETH
    console.log(`Deploying Wrapped ETH with the account: ${deployer.address}`);
    const WETH = await ethers.getContractFactory("WETH9_")
    const weth = await WETH.deploy()
    await deployContract(weth, "WETH9_")

    // Deposit initial weth if deposit > 0
    if(deposit !== "0") {
        const tx = await weth.attach(weth.address).deposit({ value: ethers.utils.parseEther(deposit) })
        await executeTx(tx, "Execute deposit at")
    }

    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify WETH
    await hre.run("verify:verify", {
        contract: "contracts/tokens/WETH9.sol:WETH9_",
        address: weth.address,
        constructorArguments: []
    })
  });

task("wsby-deploy", "Deploy Wrapped Shibuya")
  .addOptionalParam("deposit", "deposit eth amount in ether to get initial weth for testing", "0", types.string)
  .setAction(async ({deposit}, {ethers}) => {
      
      const [deployer] = await ethers.getSigners();
      
      console.log(
        `Deployer balance: ${ethers.utils.formatEther(
          await deployer.getBalance()
        )} SBY`
      );
  
      // Deploy WSBY
      console.log(`Deploying Wrapped SBY with the account: ${deployer.address}`);
      const WSBY = await ethers.getContractFactory("WSBY0")
      const wsby = await WSBY.deploy()
      await deployContract(wsby, "WSBY0")
  
      // Deposit initial weth if deposit > 0
      if(deposit !== "0") {
          const tx = await wsby.attach(wsby.address).deposit({ value: ethers.utils.parseEther(deposit) })
          await executeTx(tx, "Execute deposit at")
      }
  
      console.log(
        `Deployer balance: ${ethers.utils.formatEther(
          await deployer.getBalance()
        )} ETH`
      );
  
      // INFO: hre can only be imported inside task
      const hre = require("hardhat")
      // Verify WSBY
      await hre.run("verify:verify", {
          contract: "contracts/tokens/WSBY0.sol:WSBY0",
          address: wsby.address,
          constructorArguments: []
      })
    });
  