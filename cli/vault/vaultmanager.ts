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
    .setAction(async ({ name, aggregator }) => {
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
    .setAction(async ({ key, aggregator }) => {
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


task("vaultmanager-addoracle", "Add an oracle for an asset")
    .addOptionalParam("vaultmanager", "VaultManager contract address", "")
    .addParam("asset", "address of token contract")
    .addParam("oracle", "oracle contract address")
    .setAction(async ({ vaultmanager, asset, oracle }) => {

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

