import {
    executeTx,
    deployContract,
    ChainId,
    FACTORY_ROLE,
    getAddress,
    ZERO,
  } from "../helper";
  import { task, types } from "hardhat/config";
import { getEmitHelpers } from "typescript";
  


/*
// npx hardhat --network rinkeby vault-test-deploy --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0x71175AEB9f50c1906451681a37D1c622AA919290
task("deploy-dia-oracle", "Deploy DIA oracle")
  .addParam("asset", "Addr")
  .addParam("diaassetprices", "DIA asset prices address")
  .addParam("oraclekey", "Oracle key from DIA")
  .setAction(async ({ weth, wethoraclekey }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Get network from chain ID
    const chainId = await ethers.provider.chainId;
    let chain = ChainId[chainId];

    // Deploy WETH Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const WETHOracle = await ethers.getContractFactory("DiaKeyValue");
    const wethOracle = await WETHOracle.deploy("0x6E6E633320Ca9f2c8a8722c5f4a993D9a093462E", wethoraclekey);
    await deployContract(
      wethOracle,
      `Some WETH Oracle(provided by DIA on ${chain})`
    );

    // Add oracles to vaultmanager
    const addOracle = await vaultManager.addOracle(
      asset,
      mockoracle.address
    );
    await executeTx(addOracle, "Execute addOracle of usm test at");
    const addOracle2 = await vaultManager.addOracle(weth, wethOracle.address);
    await executeTx(addOracle2, "Execute addOracle of weth test at");
    await executeTx(addOracle2, "Execute addOracle of weth test at");
    const addOracle3 = await vaultManager.addOracle(ZERO, usmDexOracle.address);
    await executeTx(addOracle3, "Execute addOracle of USM dex test at");

    // initialize CDP
    const initializeCDP = await vaultManager.initializeCDP(
      weth,
      30000000,
      2000000,
      42000,
      8035200,
      true
    );
    await executeTx(initializeCDP, "Execute initializeCDP at");
    
  });
*/