import {
  executeTx,
  deployContract,
  ChainId,
  FACTORY_ROLE,
  getAddress,
  ZERO,
} from "../helper";
import { task, types } from "hardhat/config";

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
    console.log(`Deploying MeterUSD with the account: ${deployer.address}`);
    const MeterToken = await ethers.getContractFactory("MeterToken");
    const mtr = await MeterToken.deploy(
      "MeterUSD",
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

// npx hardhat --network rinkeby vault-test-deploy --weth 0xc778417E063141139Fce010982780140Aa0cD5Ab --stnd 0xccf56fb87850fe6cff0cd16f491933c138b7eadd --factory 0x71175AEB9f50c1906451681a37D1c622AA919290
task("vault-test-deploy", "Deploy Standard Vault Components")
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

    // Deploy FeePool
    console.log(
      `Deploying BondedStrategy with the account: ${deployer.address}`
    );
    const BondedStrategy = await ethers.getContractFactory("BondedStrategy");
    const bndstrtgy = await BondedStrategy.deploy(stnd);
    await deployContract(bndstrtgy, "BondedStrategy");

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

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy(100000000, "USM TEST");
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Mock Oracle(constant USM TEST on ${chain})`
    );

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle2 = await ethers.getContractFactory("MockOracle");
    const mockoracle2 = await MockOracle2.deploy("311200000000", "WETH TEST");
    await deployContract(
      mockoracle2,
      `Mock Oracle(constant WETH TEST on ${chain})`
    );

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const mockoracle3 = await MockOracle.deploy(
      "50000000",
      "Global USM price TEST"
    );
    await deployContract(
      mockoracle3,
      `Mock Oracle(constant USM on DEXes TEST on ${chain})`
    );

    // Add oracles to vaultmanager
    const addOracle = await vaultManager.addOracle(
      mtr.address,
      mockoracle.address
    );
    await executeTx(addOracle, "Execute addOracle of usm test at");
    const addOracle2 = await vaultManager.addOracle(weth, mockoracle2.address);
    await executeTx(addOracle2, "Execute addOracle of weth test at");
    await executeTx(addOracle2, "Execute addOracle of weth test at");
    const addOracle3 = await vaultManager.addOracle(ZERO, mockoracle3.address);
    await executeTx(addOracle3, "Execute addOracle of USM dex test at");

    // initialize CDP
    const initializeCDP = await vaultManager.initializeCDP(
      weth,
      15000000,
      2000000,
      500000,
      8035200,
      true
    );
    await executeTx(initializeCDP, "Execute initializeCDP at");

    // Approve spending collateral
    const TokenImpl = await ethers.getContractFactory("WETH9_");
    // approve certain amount
    const approve = await TokenImpl.attach(weth).approve(
      vaultManager.address,
      ethers.utils.parseUnits("1000000", 18)
    );
    await executeTx(approve, "Execute Approve at");

    // Create CDP
    const createCDP = await vaultManager.createCDP(
      weth,
      "100000000000000000",
      "95982310500000000"
    );
    await executeTx(createCDP, "Execute createCDP at");

    // Test vault
    const Vault = await ethers.getContractFactory("Vault");
    const vaultAddr = await vaultFactory.allVaults(0);

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
      cosntructorArguments: [vaultFactory.address],
    });

    // Verify FeePool
    await hre.run("verify:verify", {
      contract: "contracts/vaults/pool/BondedStrategy.sol:BondedStrategy",
      address: bndstrtgy.address,
      cosntructorArguments: [stnd, mtr.address],
    });
  });

task("vault-create-cdp", "createCDP in vaultmanager")
  .addOptionalParam("vaultmanager", "Contract address of vaultmanager")
  .addParam("collateral", "Contract address of collateral asset")
  .addParam("camount", "amount of collateral in 18 decimals")
  .addParam("damount", "amount of debt in 18 decimals")
  .setAction(
    async ({ vaultmanager, collateral, camount, damount }, { ethers }) => {
      const chainId = (await ethers.provider.getNetwork()).chainId;
      // Get network from chain ID
      let chain = ChainId[chainId];
      const vaultManager =
        (await getAddress("VaultManager", chain)) ?? vaultmanager;
      console.log(vaultManager);
      const VaultManager = await ethers.getContractFactory("VaultManager");

      // Create CDP
      const createCDP = await VaultManager.attach(vaultManager).createCDP(
        collateral,
        camount,
        damount
      );
      await executeTx(createCDP, "Execute createCDP at");
    }
  );

task("vault-rebase-set", "Configure rebase of the stablecoin supply")
  .addOptionalParam("vaultmanager", "Contract address of vaultmanager")
  .addOptionalParam(
    "desiredsupply",
    "desired supply of stablecoin in 18 decimal",
    "0"
  )
  .addOptionalParam("active", "whether rebase is active", "null")
  .setAction(async ({ vaultmanager, desiredsupply, active }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const vaultManager =
      (await getAddress("VaultManager", chain)) ?? vaultmanager;

    const mtr = (await getAddress("MeterToken", chain)) ?? vaultmanager;

    console.log(vaultManager);
    const VaultManager = await ethers.getContractFactory("VaultManager");

    const Stablecoin = await ethers.getContractFactory("MeterToken");
    const totalSupply = await Stablecoin.attach(mtr).totalSupply();
    console.log(totalSupply.toString());

    if (desiredsupply !== "0") {
      const supply = ethers.utils.parseUnits(desiredsupply, 18);
      const setDesiredSupply = await VaultManager.attach(
        vaultManager
      ).setDesiredSupply(supply);
      await executeTx(setDesiredSupply, "Execute setDesiredSupply at");
    }
    if (active !== "null") {
      const activeV = active === "true" ? true : false;
      const setRebaseActive = await VaultManager.attach(
        vaultManager
      ).setRebaseActive(activeV);
      await executeTx(setRebaseActive, "Execute setDesiredSupply at");
    }
    /// print result
    const rebase = await VaultManager.attach(vaultManager).rebaseActive();
    const currDesiredSupply = await VaultManager.attach(
      vaultManager
    ).desiredSupply();
    console.log(`Rebase active: ${rebase}`);
    console.log(`Current desired supply: ${currDesiredSupply}`);
  });

task("v1-set-svg", "Configure rebase of the stablecoin supply")
  .addOptionalParam("v1", "Contract address of v1")
  .addParam("networkname", "network name to display on nft")
  .setAction(async ({ v1, networkname }, { ethers }) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    const vaultFactory = await getAddress("VaultFactory", chain);
    const vaultManager = await getAddress("VaultManager", chain);

    const Constructor = await ethers.getContractFactory("NFTConstructor");
    const constructor = await Constructor.deploy(
      vaultFactory,
      vaultManager,
      networkname
    );
    await deployContract(constructor, "NFTConstructor");

    const Descriptor = await ethers.getContractFactory("NFTDescriptor");
    const descriptor = await Descriptor.deploy(constructor.address);
    await deployContract(descriptor, "NFTDescriptor");

    const v1addr = (await getAddress("V1", chain)) ?? v1;
    const V1 = await ethers.getContractFactory("V1");
    const setSVG = await V1.attach(v1addr).setSVG(descriptor.address);
    await executeTx(setSVG, "set SVG");
  });

task("nft-get-metadata", "get nft metadata")
  .addParam("nft", "NFT smart contract address")
  .addParam("id", "identifier of NFT")
  .setAction(async ({ nft, id }, { ethers }) => {
    const V1 = await ethers.getContractFactory("V1");
    const SVG = await V1.attach(nft).SVG();
    console.log(SVG);
    const tokenURI = await V1.attach(nft).tokenURI(id);
    console.log("Encoded tokenURI");
    console.log(tokenURI);
  });

  task("vltmgr-init-cdp-test", "initialize CDP as a collateral with test oracle")
  .addOptionalParam("vaultmanager", "VaultManager contract address", "")
  .addParam("collateral", "address of token contract")
  .addParam(
    "mcr",
    "Minimal Collaterization Ratio of the collateral in percent  e.g. 100.00000% == 10000000"
  )
  .addParam("lfr", "Liquidation Fee Ratio in percent")
  .addParam("sfr", "Stability Fee Ratio in percent")
  .addParam("on", "whether collateral should be accepted or not")
  .addParam("expiary", "number of seconds when CDP gets expired from initial config")
  .setAction(
    async ({ vaultmanager, collateral, mcr, lfr, sfr, expiary, on }, { ethers }) => {
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
      await executeTx(addOracle, "Execute addOracle of usm test at");


      const result = on === "true";
      const VaultManager = await ethers.getContractFactory("VaultManager");
      const initializeCDP = await VaultManager.attach(
        vaultManager
      ).initializeCDP(collateral, mcr, lfr, sfr, expiary, result);
      await executeTx(initializeCDP, "Execute initializeCDP at");
    }
  );

