import { executeTx, deployContract, recordAddress } from "../helper";
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
    console.log("res");
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
