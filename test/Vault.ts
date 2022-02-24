import { exec } from "child_process";
import { assert } from "console";
import { FACTORY_ROLE, ZERO } from "../cli/helper";
import { executeTx, deployContract, ChainId, getAddress } from "./helper";
const { EtherscanProvider } = require("@ethersproject/providers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  now,
  mine,
  setTime,
  setTimeAndMine,
  Ganache,
  impersonate,
  skipBlocks,
  stopMining,
  startMining,
  addToBlock,
} = require("./helpers");
const LPS = require("./LiquidityProtectionService.json");

const expectArray = (actual, expected) => {
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i].toString()).to.equal(expected[i].toString());
  }
};

describe("Vault", function () {
  before(async function () {
    // setup the whole contracts
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy WETH
    console.log(`Deploying Wrapped ETH with the account: ${deployer.address}`);
    const WETH = await ethers.getContractFactory("WETH9_");
    const weth = await WETH.deploy();
    await deployContract(weth, "WETH9_");

    // deposit WETH for test
    const wethDeposit = await weth.deposit({
      value: ethers.utils.parseEther("1"),
    });
    await executeTx(wethDeposit, "Execute deposit at");

    // Deploy STND

    // Deploy  Impl
    console.log(
      `Deploying Standard Multichain Token Impl with the account: ${deployer.address}`
    );
    const TokenImpl = await ethers.getContractFactory(
      "UChildAdministrableERC20"
    );
    const impl = await TokenImpl.deploy();
    await deployContract(impl, "UChildAdministrableERC20");

    // Deploy Proxy
    console.log(
      `Deploying Standard Multichain Token Proxy with the account: ${deployer.address}`
    );
    const Proxy = await ethers.getContractFactory("UChildERC20Proxy");
    const proxy = await Proxy.deploy(impl.address);
    await deployContract(proxy, "UChildERC20Proxy");

    // Initialize proxy with necessary info
    const tx0 = await TokenImpl.attach(proxy.address).initialize(
      "Standard",
      "STND",
      18,
      "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"
    );
    await executeTx(tx0, "Execute initialize at");

    // Mint initial total supply if parent
    const mint = await TokenImpl.attach(proxy.address).mint(
      deployer.address,
      ethers.utils.parseUnits("100000000", 18)
    );
    await executeTx(mint, "Execute Mint at");

    // Deploy AMM

    // Deploy factory
    console.log(
      `Deploying Standard AMM factory with the account: ${deployer.address}`
    );
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(deployer.address);
    await deployContract(factory, "UniswapV2Factory");

    // Set Fee to
    const tx1 = await factory.connect(deployer).setFeeTo(deployer.address);
    await executeTx(tx1, "Execute setFeeTo at");

    // Deploy router
    console.log(
      `Deploying Standard AMM router with the account: ${deployer.address}`
    );
    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const router = await Router.deploy(factory.address, weth.address);
    await deployContract(router, "UniswapV2Router02");

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
      "meterUSD",
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
    const bndstrtgy = await BondedStrategy.deploy(proxy.address);
    await deployContract(bndstrtgy, "BondedStrategy");

    // approve certain amount to Vault
    const approveDex = await mtr.approve(
      router.address,
      ethers.utils.parseUnits("1000000", 18)
    );
    const pair1 = await factory.createPair(weth.address, mtr.address)
    executeTx(pair1, "create pair between weth and usm at")
    const pairAddr = await factory.getPair(weth.address, mtr.address)
    


    // print vault code hash for UniswapV2Library to use
    console.log(
      `VaultCodeHash(For VaultLibrary vaultfor() function): ${await vaultFactory.vaultCodeHash()}`
    );
    console.log(
      `Change VaultLibrary vaultFor() with the creation hash above then recompile after verification`
    );

    // Deploy liquidator
    const Liquidator = await ethers.getContractFactory("Liquidator");
    const liquidator = await Liquidator.deploy();

    // Initialize Vault manager
    const tx2 = await vaultManager
      .attach(vaultManager.address)
      .initialize(mtr.address, vaultFactory.address, liquidator.address);
    await executeTx(tx2, "Execute initialize at");

    // Initiailize VaultFactory
    const tx = await vaultFactory
      .attach(vaultFactory.address)
      .initialize(
        v1.address,
        factory.address,
        weth.address,
        vaultManager.address
      );
    await executeTx(tx, "Execute initialize at");

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockoracle = await MockOracle.deploy("100000000", "USM TEST");
    const chainId = (await mockoracle.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = ChainId[chainId];
    await deployContract(
      mockoracle,
      `Mock Oracle(constant USM TEST on ${chain})`
    );

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const mockoracle2 = await MockOracle.deploy("300000000000", "WETH TEST");
    await deployContract(
      mockoracle2,
      `Mock Oracle(constant WETH TEST on ${chain})`
    );

    // Deploy Mock Oracle
    console.log(`Deploying MockOracle with the account: ${deployer.address}`);
    const mockoracle3 = await MockOracle.deploy("50000000", "Global USM price TEST");
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
    const addOracle2 = await vaultManager.addOracle(
      weth.address,
      mockoracle2.address
    );
    await executeTx(addOracle2, "Execute addOracle of weth test at");
    const addOracle3 = await vaultManager.addOracle(
      ZERO,
      mockoracle3.address
    );
    await executeTx(addOracle3, "Execute addOracle of USM dex test at");

    // initialize CDP
    const initializeCDP = await vaultManager.initializeCDP(
      weth.address,
      15000000,
      2000000,
      500000,
      8035200,
      true
    );
    await executeTx(initializeCDP, "Execute initializeCDP at");

    // Approve spending collateral
    const WETHImpl = await ethers.getContractFactory("WETH9_");
    // approve certain amount
    const approve = await WETHImpl.attach(weth.address).approve(
      vaultManager.address,
      ethers.utils.parseUnits("1000000", 18)
    );
    await executeTx(approve, "Execute Approve at");
    // Create CDP
    const createCDP = await vaultManager.createCDP(
      weth.address,
      "100000000000000000",
      "200000000000000000"
    );
    await executeTx(createCDP, "Execute createCDP at");

    const createCDP2 = await vaultManager.createCDP(
      weth.address,
      "100000000000000000",
      "200000000000000000"
    );
    await executeTx(createCDP2, "Execute createCDP at");

    // Get data from deployments
    this.vault = await vaultFactory.allVaults(0);
    this.weth = weth.address;
    this.vaultFactory = vaultFactory.address;
    this.vaultManager = vaultManager.address;
    this.stablecoin = mtr.address;
    this.cAmount = "100000000000000000";
    this.dAmount = "200000000000000000";
    this.cOracle = mockoracle2.address;
    this.dOracle = mockoracle.address;
    this.liquidator = liquidator;
    this.pair = pairAddr;
    this.v1 = v1;
    this.timestamp = await now();
  });

  it("A vault should work depositCollateral", async function () {
    const vaultAddr = this.vault;
    console.log(vaultAddr);
    // Test vault
    const Vault = await ethers.getContractFactory("Vault");

    // Deposit Collateral
    const depositCollateral = await Vault.attach(
      vaultAddr
    ).depositCollateralNative({ value: ethers.utils.parseEther("0.1") });

    await executeTx(depositCollateral, "Execute depositCollateralNative at");
  });

  it("A vault should work withdrawCollateralNative", async function () {
    const vaultAddr = this.vault;
    console.log(vaultAddr);
    // Test vault
    const Vault = await ethers.getContractFactory("Vault");
    const collateral = await Vault.attach(vaultAddr).collateral();
    console.log(collateral);
    assert(collateral == this.weth);

    // Deposit Collateral
    const depositCollateralNative = await Vault.attach(
      vaultAddr
    ).depositCollateralNative({ value: ethers.utils.parseEther("0.1") });

    await executeTx(
      depositCollateralNative,
      "Execute depositCollateralNative at"
    );
    // simulate CDP position
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const isValid = await VaultManager.attach(this.vaultManager).isValidCDP(
      this.weth,
      this.stablecoin,
      "99999999999999999",
      this.dAmount
    );
    console.log(isValid);

    // Withdraw Collateral Native
    const withdrawCollateralNative = await Vault.attach(
      vaultAddr
    ).withdrawCollateralNative(100000000);
    await executeTx(
      withdrawCollateralNative,
      "Execute withdrawCollateralNative at"
    );
  });

  it("A vault should work withdrawCollateral", async function () {
    const vaultAddr = this.vault;
    console.log(vaultAddr);
    // Test vault
    const Vault = await ethers.getContractFactory("Vault");
    const collateral = await Vault.attach(vaultAddr).collateral();
    console.log(collateral);
    assert(collateral == this.weth);

    // Deposit Collateral
    const depositCollateralNative = await Vault.attach(
      vaultAddr
    ).depositCollateralNative({ value: ethers.utils.parseEther("0.1") });

    await executeTx(
      depositCollateralNative,
      "Execute depositCollateralNative at"
    );
    // simulate CDP position
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const isValid = await VaultManager.attach(this.vaultManager).isValidCDP(
      this.weth,
      this.stablecoin,
      "99999999999999999",
      this.dAmount
    );
    console.log(isValid);

    // Withdraw Collateral
    const withdrawCollateral = await Vault.attach(vaultAddr).withdrawCollateral(
      100000000
    );
    await executeTx(withdrawCollateral, "Execute withdrawCollateral at");
  });

  it("A vault should work borrowMoreNative", async function () {
    // Approve spending collateral
    const WETHImpl = await ethers.getContractFactory("WETH9_");
    // approve certain amount to Vault
    const approve = await WETHImpl.attach(this.weth).approve(
      this.vault,
      ethers.utils.parseUnits("1000000", 18)
    );
    await executeTx(approve, "Execute Approve at");
    const vaultAddr = this.vault;
    // approve certain amount
    console.log(vaultAddr);
    // Test vault
    const Vault = await ethers.getContractFactory("Vault");
    const collateral = Vault.attach(vaultAddr).collateral();
    console.log(collateral);
    assert(collateral == this.weth);

    // Deposit Collateral
    const depositCollateralNative = await Vault.attach(
      vaultAddr
    ).depositCollateralNative({ value: ethers.utils.parseEther("0.1") });

    await executeTx(
      depositCollateralNative,
      "Execute depositCollateralNative at"
    );
    // simulate CDP position
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const isValid = await VaultManager.attach(this.vaultManager).isValidCDP(
      this.weth,
      this.stablecoin,
      "99999999999999999",
      this.dAmount
    );
    console.log(isValid);

    // borrow more
    const borrowMore = await Vault.attach(vaultAddr).borrowMoreNative(
      this.dAmount,
      { value: this.cAmount }
    );
    await executeTx(borrowMore, "Execute borrowMore at");
  });

  it("A vault should work borrowMore", async function () {
    // Approve spending collateral
    const WETHImpl = await ethers.getContractFactory("WETH9_");
    // approve certain amount to Vault
    const approve = await WETHImpl.attach(this.weth).approve(
      this.vault,
      ethers.utils.parseUnits("1000000", 18)
    );
    await executeTx(approve, "Execute Approve at");
    const vaultAddr = this.vault;
    // approve certain amount
    console.log(vaultAddr);
    // Test vault
    const Vault = await ethers.getContractFactory("Vault");
    const collateral = await Vault.attach(vaultAddr).collateral();
    console.log(collateral);
    assert(collateral == this.weth);
    const outstandingPayment = await Vault.attach(vaultAddr).outstandingPayment();
    console.log("Outstanding Payment: ", outstandingPayment.toString())
    const later = await now();
    console.log("Passed time:", later - this.timestamp);

    // Deposit Collateral
    const depositCollateralNative = await Vault.attach(
      vaultAddr
    ).depositCollateralNative({ value: ethers.utils.parseEther("0.1") });

    await executeTx(
      depositCollateralNative,
      "Execute depositCollateralNative at"
    );
    // simulate CDP position
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const isValid = await VaultManager.attach(this.vaultManager).isValidCDP(
      this.weth,
      this.stablecoin,
      "99999999999999999",
      this.dAmount
    );
    console.log(isValid);

    // borrow more
    const borrowMore = await Vault.attach(vaultAddr).borrowMore(
      this.cAmount,
      this.dAmount
    );
    await executeTx(borrowMore, "Execute borrowMore at");
  });

  it("vault liquidates once oracle changes price", async function () {
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const ERC20 = await ethers.getContractFactory("WETH9_");
    const Vault = await ethers.getContractFactory("Vault");
    const VaultManager = await ethers.getContractFactory("VaultManager");

    // get info from vault
    let collateral = await Vault.attach(this.vault).collateral();
    let debt = await Vault.attach(this.vault).debt();
    let [mcr, lfr, sfr, cDecimals, on] = await VaultManager.attach(
      this.vaultManager
    ).getCDPConfig(collateral);
    let cAmount = await ERC20.attach(collateral).balanceOf(this.vault);
    let dAmount = await Vault.attach(this.vault).borrow();
    let cPrice = await MockOracle.attach(this.cOracle).getThePrice();
    let dPrice = await MockOracle.attach(this.dOracle).getThePrice();

    console.log(cPrice, dPrice, collateral, debt, mcr, cAmount, dAmount);

    // get previous position
    let cv = cPrice.mul(cAmount);
    let dv = dPrice.mul(dAmount);
    console.log(cv);
    console.log(dv);
    console.log(cv.gt(dv));
    let cr = cv.div(dv);
    console.log(cr);
    console.log(mcr.div(10000).div(100));
    assert(cr > mcr.div(10000).div(100));
    // get whether the position is valid
    const isValidCDP = await VaultManager.attach(this.vaultManager).isValidCDP(
      collateral,
      debt,
      cAmount,
      dAmount
    );
    console.log(isValidCDP);
    const mockOracle = await MockOracle.attach(this.cOracle).setPrice("1000");
    await executeTx(mockOracle, "execute setPrice at");
    let cPrice2 = await MockOracle.attach(this.cOracle).getThePrice();
    let dPrice2 = await MockOracle.attach(this.dOracle).getThePrice();

    // get after position
    let cr2 = cPrice2.mul(cAmount).div(dPrice2.mul(dAmount));
    console.log(cr2);
    console.log(mcr.div(10000).div(100));
    assert(cr2 > mcr.div(10000).div(100));
    const isValidCDP2 = await VaultManager.attach(this.vaultManager).isValidCDP(
      collateral,
      debt,
      cAmount,
      dAmount
    );
    console.log(isValidCDP2);
    const liquidate = await Vault.attach(this.vault).liquidate();
    await executeTx(liquidate, "execute liquidate at");
    console.log(await ERC20.attach(collateral).balanceOf(this.liquidator.address))
    console.log(await ERC20.attach(collateral).balanceOf(this.pair))
  });

  it("vaultmanager rebases supply once price goes down", async function () {
    const VaultManager = await ethers.getContractFactory("VaultManager");
    const tx = await VaultManager.attach(this.vaultManager).setDesiredSupply("10000000000000000000000000000000000000")
    const ERC20 = await ethers.getContractFactory("WETH9_");
    executeTx(tx, "set desired supply at")
    const totalSupply = await ERC20.attach(this.stablecoin).totalSupply();
    console.log(totalSupply.toString())
    const before = await VaultManager.attach(this.vaultManager).desiredSupply()
    console.log(before.toString())
    const tx2 = await VaultManager.attach(this.vaultManager).setRebaseActive(true);
    executeTx(tx2, "set rebase active at")
    const tx3 = await VaultManager.attach(this.vaultManager).rebase()
    executeTx(tx3, "rebase at")
    const after = await VaultManager.attach(this.vaultManager).desiredSupply()
    console.log(after.toString())

    assert(after.gt(before))
  });

  it("An v1 SVG should generate a image byte data", async function () {
    // setup the whole contracts
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy pureSVG
    console.log(`Deploying pureSVG with the account: ${deployer.address}`);
    const SVG = await ethers.getContractFactory("PureSVG");
    const svg = await SVG.deploy();
    await deployContract(svg, "PureSVG");
    //const data = await svg.svgToImageURI();
    //console.log(data)

    // Deploy NFT constructor and descriptor
    const Constructor = await ethers.getContractFactory("NFTConstructor");
    const constructor = await Constructor.deploy(this.vaultFactory, this.vaultManager, "HARDHAT");
    await deployContract(constructor, "NFTConstructor");

    const tuples = await constructor.generateParams(1);
    console.log(tuples)

    const Descriptor = await ethers.getContractFactory("NFTDescriptor");
    const descriptor = await Descriptor.deploy(constructor.address);
    await deployContract(descriptor, "NFTDescriptor");

    const image = await descriptor.svgToImageURITest(1);
    console.log("Image data")
    console.log(image)

    const tokenURI = await descriptor.tokenURI(1);
    console.log("Encoded tokenURI")
    console.log(tokenURI)

    const setSVG = await this.v1.setSVG(descriptor.address);
    await executeTx(setSVG, "set SVG");

  });
});