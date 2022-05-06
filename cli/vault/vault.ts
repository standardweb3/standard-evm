import { executeTx, deployContract, recordAddress, ChainId, ZERO } from "../helper";
import { task, types } from "hardhat/config";
import { factory } from "typescript";

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

// npx hardhat --network rinkeby vault-deploy  --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0xb10db5fc1c2ca4d72e6ebe1a9494b61fa3b71385
task("vault-deploy", "Deploy Standard Vault Components")
  .addParam("weth", "Address of wrapped ether")
  .addParam("stnd", "Address of Standard")
  .addParam("factory", "UniswapV2Factory contract address")
  .setAction(async ({ weth, stnd, factory }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy Vault Manager
    console.log(
      `Deploying Standard VaultManager with the account: ${deployer.address}`
    );
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const vaultManager = await VaultManager.deploy();
    await deployContract(vaultManager, "VaultManager");
    // Record address with chainid
    //await recordAddress(ethers, "VaultManager", vaultManager.address);

    // Deploy V1
    console.log(`Deploying Standard V1 with the account: ${deployer.address}`);
    const V1 = await ethers.getContractFactory("V1");
    const v1 = await V1.deploy(vaultManager.address);
    await deployContract(v1, "V1");
    // Record address with chainid
    //await recordAddress(ethers, "V1", v1.address);

    // Deploy Stablecoin
    console.log(`Deploying meterUSD with the account: ${deployer.address}`);
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = await MeterToken.deploy(
      "meterUSD",
      "USM",
      vaultManager.address
    );
    await deployContract(mtr, "MeterToken");
    // Record address with chainid
    //await recordAddress(ethers, "MeterToken", mtr.address);

    // Deploy FeePool
    console.log(
      `Deploying BondedStrategy with the account: ${deployer.address}`
    );
    const BondedStrategy = await ethers.getContractFactory("BondedStrategy");
    const bndstrtgy = await BondedStrategy.deploy(stnd);
    await deployContract(bndstrtgy, "BondedStrategy");
    // Record address with chainid
    //await recordAddress(ethers, "BondedStrategy", bndstrtgy.address);
    // Initiailize VaultManager
    const tx = await vaultManager
      .attach(vaultManager.address)
      .initialize(v1.address, mtr.address, factory, weth);
    await executeTx(tx, "Execute initialize at");

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat");
    // Verify VaultManager
    await hre.run("verify:verify", {
      contract: "contracts/vaults/meter/VaultManager.sol:VaultManager",
      address: vaultManager.address,
      constructorArguments: [],
    });

    // Verify V1
    await hre.run("verify:verify", {
      contract: "contracts/vaults/meter/V1.sol:V1",
      address: v1.address,
      cosntructorArguments: [vaultManager.address],
    });

    // Verify MeterUSD
    await hre.run("verify:verify", {
      contract: "contracts/tokens/meter.sol:MeterToken",
      address: v1.address,
      cosntructorArguments: [vaultManager.address],
    });

    // Verify FeePool
    await hre.run("verify:verify", {
      contract: "contracts/vaults/pool/BondedStrategt.sol:BondedStrategy",
      address: v1.address,
      cosntructorArguments: [stnd, mtr.address],
    });
  });

// npx hardhat --network rinkeby vault-test-deploy --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0xb10db5fc1c2ca4d72e6ebe1a9494b61fa3b71385
task("vault-mainnet-deploy", "Deploy Standard Vault Components")
  .addParam("weth", "Address of wrapped ether")
  .addParam("stnd", "Address of Standard")
  .addParam("factory", "UniswapV2Factory contract address")
  .setAction(async ({ weth, stnd, factory }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address)

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy Vault factory
    console.log(
      `Deploying Standard VaultFactory with the account: ${deployer.address}`
    );
    const VaultFactory = await ethers.getContractFactory("VaultFactory");
    const vaultFactory = await VaultFactory.deploy();
    await deployContract(vaultFactory, "VaultFactory");
    // Record address with chainid
    //await recordAddress(ethers, "VaultManager", vaultManager.address);

    // Deploy V1
    console.log(`Deploying Standard V1 with the account: ${deployer.address}`);
    const V1 = await ethers.getContractFactory("V1");
    const v1 = await V1.deploy(vaultFactory.address);
    await deployContract(v1, "V1");
    // Record address with chainid
    //await recordAddress(ethers, "V1", v1.address);

    // Deploy Vault manager
    console.log(
      `Deploying Standard VaultManager with the account: ${deployer.address}`
    );
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const vaultManager = await VaultManager.deploy();
    await deployContract(vaultManager, "VaultManager");

    // Deploy Stablecoin
    console.log(`Deploying meterUSD with the account: ${deployer.address}`);
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = await MeterToken.deploy(
      "MeterUSD",
      "USM",
      vaultManager.address
    );
    await deployContract(mtr, "MeterToken");
    // Record address with chainid
    //await recordAddress(ethers, "MeterToken", mtr.address);

    // Initiailize VaultFactory
    const tx = await vaultFactory
      .attach(vaultFactory.address)
      .initialize(v1.address, factory, weth);
    await executeTx(tx, "Execute initialize at");

    // print vault code hash for UniswapV2Library to use
    console.log(`VaultCodeHash(For VaultLibrary vaultfor() function): ${await vaultFactory.vaultCodeHash()}`)
    console.log(`Change VaultLibrary vaultFor() with the creation hash above then recompile after verification`)

    // Initialize Vault manager
    const tx2 = await vaultManager
      .attach(vaultManager.address)
      .initialize(mtr.address, vaultFactory.address);
    await executeTx(tx2, "Execute initialize at");


    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy(100000000, "USM global price Oracle");
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Mock constant Oracle(USM global price on ${chain})`
    );

    // Add oracles to vaultmanager
    const addOracle = await vaultManager.addOracle(
      mtr.address,
      mockoracle.address
    );

    const addOracle2 = await vaultManager.addOracle(
      ZERO,
      mockoracle.address
    );

    await executeTx(addOracle, "Execute addOracle of usm oracle at");
    await executeTx(addOracle2, "Execute addOracle of usm oracle at");
    const wethOracle = "0x857ce4bd73dc9e9f52c6e1959a1c901f83b94edd"
    const addOracle3 = await vaultManager.addOracle(
      weth,
      wethOracle
    );
    await executeTx(addOracle3, "Execute addOracle of weth test at");

    // initialize CDP
    const initializeCDP = await vaultManager.initializeCDP(weth, 15000000, 2000000, 4000, true);
    await executeTx(initializeCDP, "Execute initializeCDP at")
      
    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });


  

