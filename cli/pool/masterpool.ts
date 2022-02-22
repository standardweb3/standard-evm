import { task } from "hardhat/config";
import { executeTx, deployContract, ZERO, recordAddress, executeFrom, getAddress,ChainId } from "../helper";

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
      contract: "contracts/pools/loss/MasterPool.sol:MasterPool",
      address: pool.address,
      constructorArguments: [stnd],
    })
  });

task("masterpool-verify", "Verify masterpool contract")
  .addParam("masterpool", "Masterpool contract address")
  .addParam("stnd", "Standard token address")
  .setAction(async ({ stnd, masterpool }, { ethers }) => {
        // INFO: hre can only be imported inside task
        const hre = require("hardhat")
        // Verify MasterPool
        await hre.run("verify:verify", {
          contract: "contracts/pools/loss/MasterPool.sol:MasterPool",
          address: masterpool,
          constructorArguments: [stnd],
        })
  })

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
  .addOptionalParam("masterpool", "Address of masterpool contract", "")
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
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId]
    const masterPool = await getAddress("MasterPool", chain) ?? masterpool
    const tx = await MasterPool.attach(masterPool).add(allocpoint, lptoken, rewarder)
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


  task("masterpool-setreward", "Set STND reward per block in Standard MasterPool")
  .addParam("masterpool", "Address of masterpool contract")
  .addParam("stndperblock", "STND per Block in decimal of 16")
  .setAction(async ({ masterpool, stndperblock }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
      const MasterPool = await ethers.getContractFactory("MasterPool")
      // Get current STND per block
      const currentReward = await MasterPool.attach(masterpool).sushiPerBlock()
      console.log(currentReward.toString())
      // Set STND per block
      const tx = await MasterPool.attach(masterpool).setRewardPerBlock(ethers.utils.parseUnits(stndperblock, 16))
      await executeTx(tx, "Execute setRewardPerBlock at")
      const stndPerBlock = await MasterPool.attach(masterpool).sushiPerBlock();
      console.log("Current STNDPerBlock: ", stndPerBlock.toString())
    })
  });

  task("masterpool-set", "Set Existing pool address of a pool id")
  .addParam("masterpool", "Address of masterpool contract")
  .addParam("pid", "pool id")
  .addParam("allocpoint", "allocation point")
  .addParam("newpool", "new pool address to set")
  .addParam("overwrite", "overwrite on already set pool")
  .setAction(async ({ masterpool, pid, allocpoint, newpool, overwrite }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
      // Set STND per block
      const MasterPool = await ethers.getContractFactory("MasterPool")
      const tx = await MasterPool.attach(masterpool).set(pid, allocpoint, ZERO, true);
      await executeTx(tx, "Execute setRewardPerBlock at")
      const stndPerBlock = await MasterPool.attach(masterpool).sushiPerBlock();
      console.log("Current STNDPerBlock: ", stndPerBlock.toString())
    })
  });