import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";

const assert = (condition, message) => {
    if (condition) return;
    throw new Error(message);
  };

task("deploy-stnd-parent", "Deploy Standard Parent Token").setAction(async (args, { ethers }) => {
    const [deployer] = await ethers.getSigners();
  
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

task("revoke-blocked", "Revoke tokens from blocked accounts")
  .addParam("token", "Address of the protected token contract")
  .addParam("to", "Address to transfer revoked tokens to")
  .addParam(
    "json",
    'Path to the blocked accounts json. Example: ["0x1234", "0x5678", ...]'
  )
  .setAction(async ({ token: tokenAddress, json, to }, {ethers}) => {
    assert(
      ethers.utils.isAddress(tokenAddress),
      `Token address '${tokenAddress}' is invalid.`
    );
    assert(ethers.utils.isAddress(to), `Revoke to address '${to}' is invalid.`);
    const blocked = require(json);
    for (let account of blocked) {
      assert(
        ethers.utils.isAddress(account),
        `Blocked address '${account}' is invalid.`
      );
    }
    const [sender] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Standard");
    const token = await Token.attach(tokenAddress);

    console.log(
      `Revoking tokens from blocked accounts to ${to}. Transaction sender: ${sender.address}`
    );

    console.log(
      `To balance: ${ethers.utils.formatEther(await token.balanceOf(to))}`
    );
    console.log(
      `Sender balance: ${ethers.utils.formatEther(
        await sender.getBalance()
      )} ETH`
    );

    let tx;
    const batchSize: bigint = 50n;
    for (let i: bigint = 0n; i <= BigInt(blocked.length) / batchSize; i++) {
      let entries = blocked.slice(
        i * batchSize,
        (i + 1n) * batchSize
      );
      tx = await token.connect(sender).revokeBlocked(entries, to);
      console.log(`Batch ${i + 1n}: ${tx.hash}`);
    }
    console.log("Mining...");
    await (tx && tx.wait());

    console.log(
      `To balance: ${ethers.utils.formatEther(await token.balanceOf(to))}`
    );
    console.log(
      `Sender balance: ${ethers.utils.formatEther(
        await sender.getBalance()
      )} ETH`
    );
  });

task("disableProtection", "Manually disable liquidity protection")
  .addParam("token", "Address of the protected token contract")
  .setAction(async ({ token: tokenAddress }, {ethers}) => {
    assert(
      ethers.utils.isAddress(tokenAddress),
      `Token address '${tokenAddress}' is invalid.`
    );
    const [sender] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Standard");
    const token = await Token.attach(tokenAddress);

    console.log(
      `Disabling liquidity protection with account: ${sender.address}`
    );

    console.log(
      `Sender balance: ${ethers.utils.formatEther(
        await sender.getBalance()
      )} ETH`
    );

    const tx = await token.connect(sender).disableProtection();
    console.log(`${tx.hash}`);
    console.log("Mining...");
    await tx.wait();

    console.log(
      `Sender balance: ${ethers.utils.formatEther(
        await sender.getBalance()
      )} ETH`
    );
  });

  task("deploy-pool", "Deploy Standard Staking pools")
    .addParam("reward", "Address of the reward token contract")
    .addParam("input", "Address of the input token contract")
    .addParam("starttime", "timestamp when reward starts")
    .setAction(
      async function ({ reward: rewardAddress, input: inputAddress, starttime }, {ethers}) {
        assert(
          ethers.utils.isAddress(rewardAddress),
          `Token address '${rewardAddress}' is invalid.`
        );
        assert(
          ethers.utils.isAddress(inputAddress),
          `Token address '${inputAddress}' is invalid.`
        );
  
        const [deployer] = await ethers.getSigners();
  
        console.log(
          `Deploying Standard Staking Pool with the account: ${deployer.address}`
        );
  
        console.log(
          `Deployer balance: ${ethers.utils.formatEther(
            await deployer.getBalance()
          )} ETH`
        );
  
        const Pool = await ethers.getContractFactory("WETHSTNDLPTokenSharePool");
        const pool = await Pool.deploy(rewardAddress, inputAddress, starttime);
  
        console.log("Pool address:", pool.address);
  
        console.log("Mining...");
        await pool.deployed();
        console.log(
          `Deployer balance: ${ethers.utils.formatEther(
            await deployer.getBalance()
          )} ETH`
        );
      }
    );
  
  task("notify-reward", "Notify reward amount on Staking")
    .addParam("pool", "Pool contract address to notify reward amount")
    .addParam(
      "reward",
      "Total reward amount to rebase for staking in precision of 18 digit"
    )
    .setAction(async ({ pool: poolAddress, reward }, {ethers}) => {
      assert(
        ethers.utils.isAddress(poolAddress),
        `Pool address '${poolAddress}' is invalid.`
      );
  
      const [sender] = await ethers.getSigners();
  
      console.log(
        `Notifier balance: ${ethers.utils.formatEther(
          await sender.getBalance()
        )} ETH`
      );
  
      const Pool = await ethers.getContractFactory("WETHSTNDLPTokenSharePool");
      const pool = await Pool.attach(poolAddress);
  
      console.log(
        `Notifying total reward amount to rebase to ${poolAddress}. Transaction sender: ${sender.address}`
      );
  
      console.log("Mining...");
      await pool.connect(sender).notifyRewardAmount(reward);
      console.log(
        `Sender balance: ${ethers.utils.formatEther(
          await sender.getBalance()
        )} ETH`
      );
      console.log(
        `Reward Rate: ${ethers.utils.formatEther(await pool.rewardRate())}`
      );
      console.log(`Last Update Time(timestamp): ${await pool.lastUpdateTime()}`);
      console.log(
        `Period Finishing Time(timestamp): ${await pool.periodFinish()}`
      );
    });
  