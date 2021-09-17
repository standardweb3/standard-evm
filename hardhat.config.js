require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
// const { start } = require('node:repl');
const LPS = require("./test/LiquidityProtectionService.json");

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
};

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

task("deploy", "Deploy Standard Token").setAction(async () => {
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

task("deploy-pool", "Deploy Standard Staking pools")
  .addParam("reward", "Address of the reward token contract")
  .addParam("input", "Address of the input token contract")
  .addParam("starttime", "timestamp when reward starts")
  .setAction(
    async ({ reward: rewardAddress, input: inputAddress, starttime }) => {
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
  .setAction(async ({ pool: poolAddress, reward }) => {
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
    const pool = await Pool.attach(poolAddress, Pool.interface);

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

task("revoke-blocked", "Revoke tokens from blocked accounts")
  .addParam("token", "Address of the protected token contract")
  .addParam("to", "Address to transfer revoked tokens to")
  .addParam(
    "json",
    'Path to the blocked accounts json. Example: ["0x1234", "0x5678", ...]'
  )
  .setAction(async ({ token: tokenAddress, json, to }) => {
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
    const token = await Token.attach(tokenAddress, Token.interface);

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
    const batchSize = 50n;
    for (let i = 0n; i <= BigInt(blocked.length) / batchSize; i++) {
      let entries = blocked.slice(
        parseInt(i * batchSize),
        parseInt((i + 1n) * batchSize)
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
  .setAction(async ({ token: tokenAddress }) => {
    assert(
      ethers.utils.isAddress(tokenAddress),
      `Token address '${tokenAddress}' is invalid.`
    );
    const [sender] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Standard");
    const token = await Token.attach(tokenAddress, Token.interface);

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

module.exports = {
  defaultNetwork: "local",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 1,
    },
    alice: {
      default: 2,
    },
    bob: {
      default: 3,
    },
    carol: {
      default: 4,
    },
    dave: {
      default: 5,
    },
    eve: {
      default: 6,
    },
    feeTo: {
      default: 7,
    },
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 13000000,
      },
      allowUnlimitedContractSize: true,
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
      // Solidity-coverage overrides gasPrice to 1 which is not compatible with EIP1559
      hardfork: process.env.CODE_COVERAGE ? "berlin" : "london",
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      gasMultiplier: 2,
    },
    fantom: {
      url: "https://rpcapi.fantom.network",
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
      gasPrice: 22000000000,
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    "matic-testnet": {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    xdai: {
      url: "https://rpc.xdaichain.com",
      accounts,
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      accounts,
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    heco: {
      url: "https://http-mainnet.hecochain.com",
      accounts,
      chainId: 128,
      live: true,
      saveDeployments: true,
    },
    "heco-testnet": {
      url: "https://http-testnet.hecochain.com",
      accounts,
      chainId: 256,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
      gasPrice: 470000000000,
    },
    "avalanche-testnet": {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts,
      chainId: 43113,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    harmony: {
      url: "https://api.s0.t.hmny.io",
      accounts,
      chainId: 1666600000,
      live: true,
      saveDeployments: true,
    },
    "harmony-testnet": {
      url: "https://api.s0.b.hmny.io",
      accounts,
      chainId: 1666700000,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    okex: {
      url: "https://exchainrpc.okex.org",
      accounts,
      chainId: 66,
      live: true,
      saveDeployments: true,
    },
    "okex-testnet": {
      url: "https://exchaintestrpc.okex.org",
      accounts,
      chainId: 65,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts,
      chainId: 42161,
      live: true,
      saveDeployments: true,
      blockGasLimit: 700000,
    },
    "arbitrum-testnet": {
      url: "https://kovan3.arbitrum.io/rpc",
      accounts,
      chainId: 79377087078960,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts,
      chainId: 42220,
      live: true,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.4.19",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT || "",
    username: process.env.TENDERLY_USERNAME || "",
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: ["ERC20Mock", "ERC20", "WETH9"],
  },
};
