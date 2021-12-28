import { executeTx, deployContract, recordAddress, ChainId, getAddress } from "../helper";
import { task, types } from "hardhat/config";
import { factory } from "typescript";

const assert = (condition, message) => {
    if (condition) return;
    throw new Error(message);
};

task("vaultmanager-verify", "Verify Standard Vault Manager")
    .addParam("vaultmanager", "VaultManager contract address")
    .setAction(async ({ vaultmanager }, { ethers }) => {
        // INFO: hre can only be imported inside task
        const hre = require("hardhat");
        // Verify VaultManager
        await hre.run("verify:verify", {
            contract: "contracts/vaults/meter/VaultManager.sol:VaultManager",
            address: vaultmanager,
            constructorArguments: [],
        });
    })

task("diacoininfooracle-deploy", "Deploy DIA Oracle Contract")
    .addParam("aggregator", "aggregator contract address")
    .addParam("name", "asset name")
    .setAction(async ({ name, aggregator}, {ethers}) => {
        const [deployer] = await ethers.getSigners();
        // Get before state
        console.log(
            `Deployer balance: ${ethers.utils.formatEther(
                await deployer.getBalance()
            )} ETH`
        );

        // Deploy Vault Manager
        console.log(
            `Deploying DIA CoinInfo Oracle with the account: ${deployer.address}`
        );
        const DiaOracle = await ethers.getContractFactory("DiaCoinInfo");
        const diaoracle = await DiaOracle.deploy(aggregator, name);
        const chainId = (await diaoracle.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        await deployContract(diaoracle, `DIA CoinInfo Oracle(Tracking ${name} on ${chain})`);

        // Test price 
        const assetPrice = await diaoracle.getThePrice()
        console.log(`Price of ${name}: ${assetPrice}`)
        // INFO: hre can only be imported inside task
        const hre = require("hardhat");
        // Verify coininfo oracle
        await hre.run("verify:verify", {
            contract: "contracts/oracle/DiaCoinInfo.sol:DiaCoinInfo",
            address: diaoracle,
            constructorArguments: [aggregator, name],
        });
    })

task("diakeyvalueoracle-deploy", "Deploy DIA Oracle Contract")
    .addParam("aggregator", "aggregator contract address")
    .addParam("key", "asset key (e.g. ETH/USD)")
    .setAction(async ({ key, aggregator }, {ethers}) => {
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
        let chain = ChainId[chainId]
        await deployContract(diaoracle, `DIA KeyValue Oracle(Tracking ${key} on ${chain})`);

        // Test price 
        const assetPrice = await diaoracle.getThePrice()
        console.log(`Price of ${key}: ${assetPrice}`)
        // INFO: hre can only be imported inside task
        const hre = require("hardhat");
        // Verify keyvalue oracle
        await hre.run("verify:verify", {
            contract: "contracts/oracle/DiaKeyValue.sol:DiaKeyValue",
            address: diaoracle,
            constructorArguments: [aggregator, key],
        });
    })

task("mockoracle-deploy", "Deploy DIA Oracle Contract")
    .addParam("value", "price value in 8 decimals")
    .addParam("name", "name of the constant oracle")
    .setAction(async ({ name, value }, {ethers}) => {
        const [deployer] = await ethers.getSigners();
        // Get before state
        console.log(
            `Deployer balance: ${ethers.utils.formatEther(
                await deployer.getBalance()
            )} ETH`
        );

        // Deploy Vault Manager
        console.log(
            `Deploying MockOracle with the account: ${deployer.address}`
        );
        const MockOracle = await ethers.getContractFactory("MockOracle");
        const mockoracle = await MockOracle.deploy(value, name);
        const chainId = (await mockoracle.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        await deployContract(mockoracle, `Mock Oracle(constant ${name} on ${chain})`);

        // Test price 
        const assetPrice = await mockoracle.getThePrice()
        console.log(`Price of ${name}: ${assetPrice}`)
        // INFO: hre can only be imported inside task
        const hre = require("hardhat");
        // Verify keyvalue oracle
        await hre.run("verify:verify", {
            contract: "contracts/oracle/DiaKeyValue.sol:DiaKeyValue",
            address: mockoracle,
            constructorArguments: [value, name],
        });
    })


task("vaultmanager-addoracle", "Add an oracle for an asset")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("asset", "address of token contract")
    .addParam("oracle", "oracle contract address")
    .setAction(async ({ vaultmanager, asset, oracle }, {ethers}) => {

        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Add oracle to vaultmanager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const addOracle = await VaultManager.attach(vaultManager).addOracle(asset, oracle);
        await executeTx(addOracle, "Execute addOracle at")
    })

task("vaultmanager-getassetprice", "Get price of an asset through oracle")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("asset", "address of token contract")
    .setAction(async ({ vaultmanager, asset, oracle }, {ethers}) => {

        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Get asset price in vault manager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const Price = await VaultManager.attach(vaultManager);
        const price = await Price.getAssetPrice(asset);
        console.log(price.toNumber())
    })


task("vaultmanager-initializecdp", "initialize CDP as a collateral")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("collateral", "address of token contract")
    .addParam("mcr", "Minimal Collaterization Ratio of the collateral in percent")
    .addParam("lfr", "Liquidation Fee Ratio in percent")
    .addParam("sfr", "Stability Fee Ratio in percent")
    .addParam("cdecimal", "Collateral price decimal from the oracle")
    .setAction(async ({ vaultmanager, collateral, mcr,lfr,sfr, cdecimal }, {ethers}) => {
        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Add oracle to vaultmanager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const initializeCDP = await VaultManager.attach(vaultManager).initializeCDP(collateral, mcr, lfr, sfr, cdecimal);
        await executeTx(initializeCDP, "Execute initializeCDP at")
    })

task("vaultmanager-getcdpconfig", "initialize CDP as a collateral")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("collateral", "address of token contract")
    .setAction(async ({ vaultmanager, collateral }, {ethers}) => {
        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Get asset price in vault manager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const Price = await VaultManager.attach(vaultManager);
        const result = await Price.getCDPConfig(collateral);
        console.log(` MCR: ${result[0]}% \n LFR: ${result[1]}% \n SFR: ${result[2]}% \n cDecimal: ${result[3]}`)
    })

task("vaultmanager-isvalidcdp", "Check if cdp is valid")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("collateral", "address of collateral token contract")
    .addParam("debt", "address of debt contract")
    .addParam("camount", "amount of collateral in 18 decimals")
    .addParam("damount", "amount of debt in 18 decimals")
    .setAction(async ({ vaultmanager, collateral, debt, camount, damount }, {ethers}) => {

        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Get asset price in vault manager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const Price = await VaultManager.attach(vaultManager);
        const price = await Price.isValidCDP(collateral, debt, camount, damount);
        console.log(price)
    })


task("vaultmanager-createcdp", "Create CDP position")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("collateral", "address of collateral token contract")
    .addParam("camount", "amount of colalteral in 18 decimals")
    .addParam("damount", "amount of debt in 18 decimals")
    .setAction(async ({ vaultmanager, collateral, camount, damount }, {ethers}) => {

        const chainId = (await ethers.provider.getNetwork()).chainId;
        // Get network from chain ID
        let chain = ChainId[chainId]
        const vaultManager = await getAddress("VaultManager", chain) ?? vaultmanager
        console.log(vaultManager)

        // Get asset price in vault manager
        const VaultManager = await ethers.getContractFactory("VaultManager");
        const createCDP = await VaultManager.attach(vaultManager).createCDP(collateral, camount, damount);
        await executeTx(createCDP, "Execute createCDP at")
    })