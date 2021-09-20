import { executeTx, deployContract, recordAddress } from "./helper";
import { task, types } from "hardhat/config";

const assert = (condition, message) => {
    if (condition) return;
    throw new Error(message);
  };

  // npx hardhat --network rinkeby vault-deploy  --weth 0xdf032bc4b9dc2782bb09352007d4c57b75160b15
  task("vault-deploy", "Deploy Standard Vault Components")
  .addParam("weth", "Address of wrapped ether")
  .setAction(async ({weth}, { ethers }) => {
    const [deployer] = await ethers.getSigners();
    
    // Get before state
    console.log(
        `Deployer balance: ${ethers.utils.formatEther(
          await deployer.getBalance()
        )} ETH`
      );

    
    // Deploy Vault Manager
    console.log(`Deploying Standard VaultManager with the account: ${deployer.address}`);
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const vaultManager = await VaultManager.deploy();
    await deployContract(vaultManager, "VaultManager")
    // Record address in chainid
    await recordAddress(ethers, "VaultManager", vaultManager.address)


    // Deploy V1
    console.log(`Deploying Standard V1 with the account: ${deployer.address}`);
    const V1 = await ethers.getContractFactory("V1");
    const v1 = await V1.deploy(vaultManager.address);
    await deployContract(v1, "V1")
    // Record address in chainid
    await recordAddress(ethers, "V1", v1.address)


    // Deploy Stablecoin
    // Assign minter role to the Vault Manager
    // Deploy FeePool

    // Initiailize VaultManager
    

    

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify VaultManager
    await hre.run("verify:verify", {
        contract: "contracts/vaults/meter/VaultManager.sol:VaultManager",
        address: vaultManager.address,
        constructorArguments: [],
    })
    
    // Verify V1
    await hre.run("verify:verify", {
        contract: "contracts/vaults/meter/V1.sol:V1",
        address: v1.address,
        cosntructorArguments: [],
    })
  });
