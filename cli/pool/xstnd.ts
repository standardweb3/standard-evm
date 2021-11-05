import { task } from "hardhat/config";
import { executeTx, deployContract, ZERO, recordAddress, executeFrom } from "../helper";

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

// npx hardhat --network rinkeby xstndpool-deploy --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --amount 1000000
task("xstndpool-deploy", "Deploy Standard XSTNDPool")
  .addParam("xstnd", "Address of Standard")
  .addParam("amount", "Amount of tokens to send in 18 decimals")
  .setAction(async ({ xstnd, amount }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy XSTNDPool
    console.log(`Deploying Standard XSTNDPool with the account: ${deployer.address}`);
    const Pool = await ethers.getContractFactory("XSTNDPool");
    const pool = await Pool.deploy(xstnd);
    await deployContract(pool, "XSTNDPool")

    // Record address in chainid
    //await recordAddress(ethers, "XSTNDPool", pool.address)


    // Send STND to the pool
    const TokenImpl = await ethers.getContractFactory("UChildAdministrableERC20")
    const impl = await TokenImpl.deploy()
    const tx = await impl.attach(xstnd).transfer(pool.address, ethers.utils.parseUnits(amount, 18))
    await executeTx(tx, "Execute transfer at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify XSTNDPool
    await hre.run("verify:verify", {
      contract: "contracts/pools/loss/XSTNDPool.sol:XSTNDPool",
      address: pool.address,
      constructorArguments: [deployer.address],
    })
  });

task("xstndpool-deposit", "Deposit stnd to Standard XSTNDPool")
  .addParam("pool", "Address of XSTNDPool")
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

task("xstndpool-add", "Add LP Pool to Standard XSTNDPool")
  .addParam("xstndpool", "Address of xstndpool contract")
  .addParam("allocpoint", "Allocation point for priority")
  .addParam("lptoken", "Address of lptoken")
  .addOptionalParam("rewarder", "Address of extra rewarder address", ZERO)
  .setAction(async ({ xstndpool, allocpoint, lptoken, rewarder }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Send STND to the pool
    const XSTNDPool = await ethers.getContractFactory("XSTNDPool")
    const tx = await XSTNDPool.attach(xstndpool).add(allocpoint, lptoken, rewarder)
    await executeTx(tx, "Execute add at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });

task("xstndpool-massupdate", "Add LP Pool to Standard XSTNDPool")
  .addParam("xstndpool", "Address of xstndpool contract")
  .setAction(async ({ xstndpool }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Get length of the pool created from the master
    const XSTNDPool = await ethers.getContractFactory("XSTNDPool")
    const poolLength = await XSTNDPool.attach(xstndpool).poolLength();

    console.log(`Total Pools Count: ${poolLength}`)

    // Mass update pools
    const pids = Array.from({ length: poolLength }, (x, i) => i.toString()) // cast pids to string for big numbers
    const tx = await XSTNDPool.attach(xstndpool).massUpdatePools(pids)
    await executeTx(tx, "Execute massUpdatePools at")


    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });

  task("xstndpool-test", "Add LP Pool to Standard XSTNDPool")
  .addParam("xstndpool", "Address of xstndpool contract")
  .setAction(async ({ xstndpool }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
  
      // Get length of the pool created from the master
      const XSTNDPool = await ethers.getContractFactory("XSTNDPool")
      const poolLength = await XSTNDPool.attach(xstndpool).poolLength();

      console.log(`Total Pools Count: ${poolLength}`)

      // Mass update pools
      const pids = Array.from({ length: poolLength }, (x, i) => i.toString()) // cast pids to string for big numbers
      const tx = await XSTNDPool.attach(xstndpool).massUpdatePools(pids)
      await executeTx(tx, "Execute massUpdatePools at")
    })
  });


  task("xstndpool-setreward", "Set STND reward per block in Standard XSTNDPool")
  .addParam("xstndpool", "Address of xstndpool contract")
  .addParam("stndperblock", "STND per Block in decimal of 10")
  .setAction(async ({ xstndpool, stndperblock }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
      // Set STND per block
      const XSTNDPool = await ethers.getContractFactory("XSTNDPool")
      const tx = await XSTNDPool.attach(xstndpool).setRewardPerBlock(ethers.utils.parseUnits(stndperblock, 16))
      await executeTx(tx, "Execute setRewardPerBlock at")
      const stndPerBlock = await XSTNDPool.attach(xstndpool).sushiPerBlock();
      console.log("Current STNDPerBlock: ", stndPerBlock.toString())
    })
  });

  task("xstndpool-set", "Set Existing pool address of a pool id")
  .addParam("xstndpool", "Address of xstndpool contract")
  .addParam("pid", "pool id")
  .addParam("allocpoint", "allocation point")
  .addParam("newpool", "new pool address to set")
  .addParam("overwrite", "overwrite on already set pool")
  .setAction(async ({ xstndpool, pid, allocpoint, newpool, overwrite }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    await executeFrom(ethers, deployer, async () => {
      // Set STND per block
      const XSTNDPool = await ethers.getContractFactory("XSTNDPool")
      const tx = await XSTNDPool.attach(xstndpool).set(pid, allocpoint, ZERO, true);
      await executeTx(tx, "Execute setRewardPerBlock at")
      const stndPerBlock = await XSTNDPool.attach(xstndpool).sushiPerBlock();
      console.log("Current STNDPerBlock: ", stndPerBlock.toString())
    })
  });