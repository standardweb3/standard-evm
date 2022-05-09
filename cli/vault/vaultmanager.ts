import {
  executeTx,
  deployContract,
  recordAddress,
  ChainId,
  getAddress,
  FACTORY_ROLE,
} from "../helper";
import { task, types } from "hardhat/config";
import { factory } from "typescript";

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

task("diakeyvalueoracle-deploy2", "initialize CDP as a collateral with test oracle")
  .addParam("collateral", "address of token contract")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("on", "whether collateral should be accepted or not")
  .addParam(
    "expiary",
    "number of seconds when CDP gets expired from initial config"
  )
  .setAction(
    async (
      { vaultmanager, collateral, on, expiary },
      { ethers }
    ) => {
      const [deployer] = await ethers.getSigners();
      const chainId = (await ethers.provider.getNetwork()).chainId;
      // Get network from chain ID
      let chain = ChainId[chainId];
      const vaultManager =
        (await getAddress("VaultManager", chain)) ?? vaultmanager;
      console.log(vaultManager);

      // deploy collateral oracle
      console.log(`Deploying MockOracle with the account: ${deployer.address}`);
      const MockOracle = await ethers.getContractFactory("MockOracle");
      const mockoracle = await MockOracle.deploy(100000000, "Price TEST");

      // Add oracle to vaultmanager

      const addOracle = await vaultManager.addOracle(
        collateral,
        mockoracle.address
      );
      await executeTx(addOracle, "Execute addOracle of usm test at")

      const result = on === "true";
      const VaultManager = await ethers.getContractFactory("VaultManager");
      const initializeCDP = await VaultManager.attach(
        vaultManager
      ).initializeCDP(collateral, 0, 0, 0, expiary, result);
      await executeTx(initializeCDP, "Execute initializeCDP at")
    }
  );

task("diakeyvalueoracle-deploy", "Deploy DIA Oracle Contract")
  .addParam("aggregator", "aggregator contract address")
  .addParam("key", "asset key (e.g. ETH/USD)")
  .setAction(async ({ key, aggregator }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy Vault Manager
    console.log(
      `Deploying DIA KeyValue Oracle with the account: ${deployer.address}`
    );
    const DiaOracle = await ethers.getContractFactory("DiaKeyValue");
    const diaoracle = await DiaOracle.deploy(aggregator, key);
    const chainId = (await diaoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      diaoracle,
      `DIA KeyValue Oracle(Tracking ${key} on ${chain})`
    );

    // Test price
    const assetPrice = await diaoracle.getThePrice();
    console.log(`Price of ${key}: ${assetPrice}`);
    // INFO: hre can only be imported inside task
    const hre = require("hardhat");
    // Verify keyvalue oracle
    await hre.run("verify:verify", {
      contract: "contracts/oracle/DiaKeyValue.sol:DiaKeyValue",
      address: diaoracle,
      constructorArguments: [aggregator, key],
    });
  });

task("mockoracle-deploy", "Deploy DIA Oracle Contract")
  .addParam("value", "price value in 8 decimals")
  .addParam("name", "name of the constant oracle")
  .setAction(async ({ name, value }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy Vault Manager
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy(value, name);
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Mock Oracle(constant ${name} on ${chain})`
    );

    // Test price
    const assetPrice = await mockoracle.getThePrice();
    console.log(`Price of ${name}: ${assetPrice}`);
    // INFO: hre can only be imported inside task
    const hre = require("hardhat");
    // Verify keyvalue oracle
    await hre.run("verify:verify", {
      contract: "contracts/oracle/DiaKeyValue.sol:DiaKeyValue",
      address: mockoracle,
      constructorArguments: [value, name],
    });
  });

task("mockoracle-setvalue", "Deploy DIA Oracle Contract")
  .addParam("oracle", "oracle contract address to change")
  .addParam("value", "price value in 8 decimals")
  .setAction(async ({ oracle, value }, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy Vault Manager
    console.log(`Set MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const tx = await MockOracle.attach(oracle).setPrice(value);
    await executeTx(tx, "SetMockOracle");
    // Test price
    const assetPrice = await MockOracle.attach(oracle).getThePrice();
    const name = await MockOracle.attach(oracle).name();
    console.log(`Price of ${name}: ${assetPrice}`);
  });

task("vaultmanager-addoracle", "Add an oracle for an asset")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("asset", "address of token contract")
  .addParam("oracle", "oracle contract address")
  .setAction(async ({ vaultmanager, asset, oracle }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const vaultManager =
      (await getAddress("VaultManager", chain)) ?? vaultmanager;
    console.log(vaultManager);

    // Add oracle to vaultmanager
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const addOracle = await VaultManager.attach(vaultManager).addOracle(
      asset,
      oracle
    );
    await executeTx(addOracle, "Execute addOracle at");
  });

task("vaultmanager-getassetprice", "Get price of an asset through oracle")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("asset", "address of token contract")
  .setAction(async ({ vaultmanager, asset, oracle }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const vaultManager =
      (await getAddress("VaultManager", chain)) ?? vaultmanager;
    console.log(vaultManager);

    // Get asset price in vault manager
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const Price = await VaultManager.attach(vaultManager);
    const price = await Price.getAssetPrice(asset);
    console.log(price.toNumber());
  });

task("vaultmanager-initializecdp", "initialize CDP as a collateral")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("collateral", "address of token contract")
  .addParam(
    "mcr",
    "Minimal Collaterization Ratio of the collateral in percent  e.g. 100.00000% == 10000000"
  )
  .addParam("lfr", "Liquidation Fee Ratio in percent")
  .addParam("sfr", "Stability Fee Ratio in percent")
  .addParam("on", "whether collateral should be accepted or not")
  .addParam(
    "expiary",
    "number of seconds when CDP gets expired from initial config"
  )
  .setAction(
    async (
      { vaultmanager, collateral, mcr, lfr, sfr, expiary, on },
      { ethers }
    ) => {
      const chainId = (await ethers.provider.getNetwork()).chainId;
      // Get network from chain ID
      let chain = ChainId[chainId];
      const vaultManager =
        (await getAddress("VaultManager", chain)) ?? vaultmanager;
      console.log(vaultManager);

      // Add oracle to vaultmanager
      const result = on === "true";
      const VaultManager = await ethers.getContractFactory("VaultManager");
      const initializeCDP = await VaultManager.attach(
        vaultManager
      ).initializeCDP(collateral, mcr, lfr, sfr, expiary, result);
      await executeTx(initializeCDP, "Execute initializeCDP at");
    }
  );

task("vaultmanager-getcdpconfig", "initialize CDP as a collateral")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("collateral", "address of token contract")
  .setAction(async ({ vaultmanager, collateral }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const vaultManager =
      (await getAddress("VaultManager", chain)) ?? vaultmanager;
    console.log(vaultManager);

    // Get asset price in vault manager
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const Price = await VaultManager.attach(vaultManager);
    const result = await Price.getCDPConfig(collateral);
    console.log(
      ` MCR: ${result[0]}% \n LFR: ${result[1]}% \n SFR: ${result[2]}% \n cDecimal: ${result[3]}`
    );
  });

task("vaultmanager-isvalidcdp", "Check if cdp is valid")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("collateral", "address of collateral token contract")
  .addParam("debt", "address of debt contract")
  .addParam("camount", "amount of collateral in 18 decimals")
  .addParam("damount", "amount of debt in 18 decimals")
  .setAction(
    async (
      { vaultmanager, collateral, debt, camount, damount },
      { ethers }
    ) => {
      const chainId = (await ethers.provider.getNetwork()).chainId;
      // Get network from chain ID
      let chain = ChainId[chainId];
      const vaultManager =
        (await getAddress("VaultManager", chain)) ?? vaultmanager;
      console.log(vaultManager);

      // Get asset price in vault manager
      const VaultManager = await ethers.getContractFactory("VaultManager");
      const Price = await VaultManager.attach(vaultManager);
      const price = await Price.isValidCDP(collateral, debt, camount, damount);
      console.log(price);
    }
  );

task("vaultmanager-createcdp", "Create CDP position")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("collateral", "address of collateral token contract")
  .addParam("camount", "amount of colalteral in 18 decimals")
  .addParam("damount", "amount of debt in 18 decimals")
  .setAction(
    async ({ vaultmanager, collateral, camount, damount }, { ethers }) => {
      const chainId = (await ethers.provider.getNetwork()).chainId;
      // Get network from chain ID
      let chain = ChainId[chainId];
      const vaultManager =
        (await getAddress("VaultManager", chain)) ?? vaultmanager;
      console.log(vaultManager);

      // Get asset price in vault manager
      const VaultManager = await ethers.getContractFactory("VaultManager");
      const createCDP = await VaultManager.attach(vaultManager).createCDP(
        collateral,
        camount,
        damount
      );
      await executeTx(createCDP, "Execute createCDP at");
    }
  );

task("mtr-grant-factory", "Grant factory role to vault factory")
  .addOptionalParam("stablecoin", "Stablecoin contract address", "")
  .addParam("factory", "address of collateral token contract")
  .setAction(async ({ stablecoin, factory }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = (await getAddress("MeterToken", chain)) ?? stablecoin;
    console.log(mtr);

    // Grant factory a factory role for vault to mint stablecoin
    const grantRole = await MeterToken.attach(mtr).grantRole(
      FACTORY_ROLE,
      factory
    );
    await executeTx(grantRole, "Executing grantRole for vault factory at");
  });
