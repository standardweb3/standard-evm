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
  



// npx hardhat --network rinkeby vault-test-deploy --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0x71175AEB9f50c1906451681a37D1c622AA919290
task("vault-mainnet-deploy", "Deploy Standard Vault Components")
  .addParam("weth", "Address of wrapped ether")
  .addParam("diaassetprices", "DIA asset prices address")
  .addParam("wethoraclekey", "Oracle key from DIA")
  .addParam("stnd", "Address of Standard")
  .addParam("factory", "UniswapV2Factory contract address")
  .setAction(async ({ weth, wethoraclekey, stnd, factory }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

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

    // Deploy liquidator
    const Liquidator = await ethers.getContractFactory("Liquidator");
    const liquidator = await Liquidator.deploy();
    await deployContract(liquidator, "Liquidator");

    // Deploy Vault manager
    console.log(
      `Deploying Standard VaultManager with the account: ${deployer.address}`
    );
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const vaultManager = await VaultManager.deploy();
    await deployContract(vaultManager, "VaultManager");

    // Deploy Stablecoin
    console.log(`Deploying MeterUSD with the account: ${deployer.address}`);
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = await MeterToken.deploy(
      "MeterUSD",
      "USM",
      vaultManager.address
    );
    await deployContract(mtr, "MeterToken");

    // Grant factory a factory role for vault to mint stablecoin
    const grantRole = await mtr.grantRole(FACTORY_ROLE, vaultFactory.address);
    await executeTx(grantRole, "Executing grantRole for vault factory at");

    // Initiailize VaultFactory
    const tx = await vaultFactory
      .attach(vaultFactory.address)
      .initialize(v1.address, factory, weth, vaultManager.address);
    await executeTx(tx, "Execute initialize at");

    // print vault code hash for UniswapV2Library to use
    console.log(
      `VaultCodeHash(For VaultLibrary vaultfor() function): ${await vaultFactory.vaultCodeHash()}`
    );
    console.log(
      `Change VaultLibrary vaultFor() with the creation hash above then recompile after verification`
    );

    // Initialize Vault manager
    const tx2 = await vaultManager
      .attach(vaultManager.address)
      .initialize(mtr.address, vaultFactory.address, ZERO);
    await executeTx(tx2, "Execute initialize at");

    // Deploy Constant Price Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy(100000000, "USM constant option price");
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Placeholder Oracle(constant USM 1$ price on ${chain})`
    );

    // Deploy WETH Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const WETHOracle = await ethers.getContractFactory("DiaKeyValue");
    const wethOracle = await WETHOracle.deploy("0x6E6E633320Ca9f2c8a8722c5f4a993D9a093462E", wethoraclekey);
    await deployContract(
      wethOracle,
      `Some WETH Oracle(provided by DIA on ${chain})`
    );

    // Deploy USM DEX Average Oracle
    console.log(`Deploying USM DEX Average Oracle with the account: ${deployer.address}`);
    const USMDexOracle = await ethers.getContractFactory("USMDexOracle")
    const usmDexOracle = await USMDexOracle.deploy(
      mtr.address,
      "USM DEX Average Price Oracle"
    );
    await deployContract(
      usmDexOracle,
      `USM DEX Average Price Oracle`
    );

    // Add oracles to vaultmanager
    const addOracle = await vaultManager.addOracle(
      mtr.address,
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

  task("vault-mainnet-redeploy", "Deploy Standard Vault Components")
  .addParam("weth", "Address of wrapped ether")
  .addParam("wethoracle", "weth oracle address")
  .addParam("stnd", "Address of Standard")
  .addParam("factory", "UniswapV2Factory contract address")
  .setAction(async ({ weth, wethoracle, stnd, factory }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

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

    /*
    // Deploy liquidator
    const Liquidator = await ethers.getContractFactory("Liquidator");
    const liquidator = await Liquidator.deploy();
    await deployContract(liquidator, "Liquidator");
    */

    // Deploy Vault manager
    console.log(
      `Deploying Standard VaultManager with the account: ${deployer.address}`
    );
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const vaultManager = await VaultManager.deploy();
    await deployContract(vaultManager, "VaultManager");

    // Deploy Stablecoin
    console.log(`Deploying MeterUSD with the account: ${deployer.address}`);
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = await MeterToken.deploy(
      "MeterUSD",
      "USM",
      vaultManager.address
    );
    await deployContract(mtr, "MeterToken");

    // Grant factory a factory role for vault to mint stablecoin
    const grantRole = await mtr.grantRole(FACTORY_ROLE, vaultFactory.address);
    await executeTx(grantRole, "Executing grantRole for vault factory at");

    // Initiailize VaultFactory
    const tx = await vaultFactory
      .attach(vaultFactory.address)
      .initialize(v1.address, factory, weth, vaultManager.address);
    await executeTx(tx, "Execute initialize at");

    // print vault code hash for UniswapV2Library to use
    console.log(
      `VaultCodeHash(For VaultLibrary vaultfor() function): ${await vaultFactory.vaultCodeHash()}`
    );
    console.log(
      `Change VaultLibrary vaultFor() with the creation hash above then recompile after verification`
    );

    // Initialize Vault manager
    const tx2 = await vaultManager
      .attach(vaultManager.address)
      .initialize(mtr.address, vaultFactory.address, ZERO);
    await executeTx(tx2, "Execute initialize at");

    /*
    // Deploy Constant Price Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy(100000000, "USM constant option price");
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Placeholder Oracle(constant USM 1$ price on ${chain})`
    );

    // Deploy WETH Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const WETHOracle = await ethers.getContractFactory("DiaKeyValue");
    const wethOracle = await WETHOracle.deploy("0x6E6E633320Ca9f2c8a8722c5f4a993D9a093462E", wethoraclekey);
    await deployContract(
      wethOracle,
      `Some WETH Oracle(provided by DIA on ${chain})`
    );
    */

    // Deploy USM DEX Average Oracle
    console.log(`Deploying USM DEX Average Oracle with the account: ${deployer.address}`);
    const USMDexOracle = await ethers.getContractFactory("USMDexOracle")
    const usmDexOracle = await USMDexOracle.deploy(
      mtr.address,
      "USM DEX Average Price Oracle"
    );
    await deployContract(
      usmDexOracle,
      `USM DEX Average Price Oracle`
    );


    const addOracle2 = await vaultManager.addOracle(weth, wethoracle);
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

