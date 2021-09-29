import { task } from "hardhat/config";
import { executeTx, deployContract, ZERO, recordAddress, executeFrom } from "../helper";

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

// npx hardhat --network rinkeby masterpool-deploy --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --amount 1000000
task("masterpool-deploy", "Deploy Standard MasterPool")
  .addParam("stnd", "Address of Standard")
  .addParam("amount", "Amount of tokens to send in 18 decimals")
  .setAction(async ({ stnd, amount }, { ethers }) => {
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
    const pool = await Pool.deploy(stnd);
    await deployContract(pool, "MasterPool")

    // Record address in chainid
    //await recordAddress(ethers, "MasterPool", pool.address)


    // Send STND to the pool
    const TokenImpl = await ethers.getContractFactory("UChildAdministrableERC20")
    const impl = await TokenImpl.deploy()
    const tx = await impl.attach(stnd).transfer(pool.address, ethers.utils.parseUnits(amount, 18))
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

task("masterpool-deposit", "Deposit stnd to Standard MasterPool")
  .addParam("pool", "Address of MasterPool")
  .addParam("stnd", "Address of Standard")
  .addParam("amount", "Amount of tokens to send in 18 decimals")
  .setAction(async ({ pool, stnd, amount }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Send STND to the pool
    const TokenImpl = await ethers.getContractFactory("UChildAdministrableERC20")
    const impl = await TokenImpl.deploy()
    const tx = await impl.attach(stnd).transfer(pool, ethers.utils.parseUnits(amount, 18))
    await executeTx(tx, "Execute transfer at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });

task("masterpool-add", "Add LP Pool to Standard MasterPool")
  .addParam("masterpool", "Address of masterpool contract")
  .addParam("allocpoint", "Allocation point for priority")
  .addParam("lptoken", "Address of lptoken")
  .addOptionalParam("rewarder", "Address of extra rewarder address", ZERO)
  .setAction(async ({ masterpool, allocpoint, lptoken, rewarder }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Send STND to the pool
    const MasterPool = await ethers.getContractFactory("MasterPool")
    const tx = await MasterPool.attach(masterpool).add(allocpoint, lptoken, rewarder)
    await executeTx(tx, "Execute add at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });

task("masterpool-massupdate", "Add LP Pool to Standard MasterPool")
  .addParam("masterpool", "Address of masterpool contract")
  .setAction(async ({ masterpool }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Get length of the pool created from the master
    const MasterPool = await ethers.getContractFactory("MasterPool")
    const poolLength = await MasterPool.attach(masterpool).poolLength();

    console.log(`Total Pools Count: ${poolLength}`)

    // Mass update pools
    const pids = Array.from({ length: poolLength }, (x, i) => i.toString()) // cast pids to string for big numbers
    const tx = await MasterPool.attach(masterpool).massUpdatePools(pids)
    await executeTx(tx, "Execute massUpdatePools at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });

  task("masterpool-test", "Add LP Pool to Standard MasterPool")
  .addParam("masterpool", "Address of masterpool contract")
  .setAction(async ({ masterpool }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
  
      // Get length of the pool created from the master
      const MasterPool = await ethers.getContractFactory("MasterPool")
      const poolLength = await MasterPool.attach(masterpool).poolLength();

      console.log(`Total Pools Count: ${poolLength}`)

      // Mass update pools
      const pids = Array.from({ length: poolLength }, (x, i) => i.toString()) // cast pids to string for big numbers
      const tx = await MasterPool.attach(masterpool).massUpdatePools(pids)
      await executeTx(tx, "Execute massUpdatePools at")
    })
  });


  task("masterpool-setReward", "Set STND reward per block in Standard MasterPool")
  .addParam("masterpool", "Address of masterpool contract")
  .addParam("stndperblock", "STND per Block")
  .setAction(async ({ masterpool, stndperblock }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
      // Set STND per block
      const MasterPool = await ethers.getContractFactory("MasterPool")
      const tx = await MasterPool.attach(masterpool).setRewardPerBlock(ethers.utils.parseUnits(stndperblock, 18))
      await executeTx(tx, "Execute setRewardPerBlock at")
    })
  });
