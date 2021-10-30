import { task, types } from "hardhat/config";
import { BigNumber, constants, ContractFactory } from "ethers";
import { executeTx, deployContract, ZERO } from "../helper";
const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
};

// npx hardhat --network rinkeby amm-factory-deploy --dividend 0xc778417E063141139Fce010982780140Aa0cD5Ab
task("amm-factory-deploy", "Deploy Standard AMM")
  .addOptionalParam("treasury", "Address of treasury", ZERO, types.string)
  .addOptionalParam("dividend", "Address of dividend pool", ZERO, types.string)
  .setAction(async ({ treasury, dividend }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy factory
    console.log(`Deploying Standard AMM factory with the account: ${deployer.address}`);
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(deployer.address);
    await deployContract(factory, "UniswapV2Factory")


    // Set Fee to
    const tx = await factory.connect(deployer).setFeeTo(deployer.address);
    await executeTx(tx, "Execute setFeeTo at")

    if (treasury !== ZERO) {
      // Set Treasury to
      const pool = await factory.connect(deployer).setTreasuryTo(treasury)
      await executeTx(pool, "Execute setTreasuryTo at")
    }

    if (dividend !== ZERO) {
      // Set Fee Pool to
      const pool = await factory.connect(deployer).setPoolTo(dividend)
      await executeTx(pool, "Execute setPoolTo at")
    }

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // print pair code hash for UniswapV2Library to use
    console.log(`PairCodeHash(For UniswapV2Library pairfor() function): ${await factory.pairCodeHash()}`)
    console.log(`Change UniswapV2Library pairFor() with the creation hash above then recompile after verification`)

    // print fee recipients
    console.log("Treasury: ", await factory.treasuryTo())
    console.log("Dividend: ", await factory.poolTo())

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify Factory
    await hre.run("verify:verify", {
      contract: "contracts/uniswapv2/UniswapV2Factory.sol:UniswapV2Factory",
      address: factory.address,
      constructorArguments: [deployer.address],
    })
  });

// npx hardhat --network rinkeby amm-factory-deploy --dividend 0xc778417E063141139Fce010982780140Aa0cD5Ab

task("amm-factory-set-feeto", "Set feeTo of dex")
  .addParam("factory", "Address of UniswapV2Factory contract")
  .addParam("feeto", "Address of dividend pool contract")
  .setAction(async ({ factory, feeto }, { ethers }) => {

    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    if (feeto !== ZERO) {
      // Get previous dividend
      console.log("Previous feeTo: ", await Factory.attach(factory).feeTo())
      // Set Fee Pool to
      const pool = await Factory.attach(factory).setFeeTo(feeto)
      await executeTx(pool, "Execute setFeeTo at")
    }
  })

task("amm-factory-set-dividend", "Set dividend of dex")
  .addParam("factory", "Address of UniswapV2Factory contract")
  .addParam("dividend", "Address of dividend pool contract")
  .setAction(async ({ factory, dividend }, { ethers }) => {

    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    if (dividend !== ZERO) {
      // Get previous dividend
      console.log("Previous dividend: ", await Factory.attach(factory).poolTo())
      // Set Fee Pool to
      const pool = await Factory.attach(factory).setPoolTo(dividend)
      await executeTx(pool, "Execute setPoolTo at")
      console.log("Current dividend: ", await Factory.attach(factory).poolTo())
    }
  })

// npx hardhat --network rinkeby amm-factory-deploy --dividend 0xc778417E063141139Fce010982780140Aa0cD5Ab
task("amm-factory-set-treasury", "Set treasury of dex")
  .addParam("factory", "Address of UniswapV2Factory contract")
  .addParam("treasury", "Address of dividend pool contract")
  .setAction(async ({ factory, treasury }, { ethers }) => {

    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    if (treasury !== ZERO) {
      // Get previous dividend
      console.log("Previous treasury: ", await Factory.attach(factory).treasuryTo())
      // Set Fee Pool to
      const pool = await Factory.attach(factory).setTreasuryTo(treasury)
      await executeTx(pool, "Execute setTreasuryTo at")
      console.log("Current treasury: ", await Factory.attach(factory).treasuryTo())
    }
  })

task("amm-router-deploy", "Deploy Standard AMM")
  .addParam("factory", "Address of factory")
  .addParam("weth", "Address of Wrapped ETH")
  .setAction(async ({ factory, weth }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy router
    assert(
      ethers.utils.isAddress(weth),
      `WETH address '${weth}' is invalid.`
    );
    console.log(`Deploying Standard AMM router with the account: ${deployer.address}`);
    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const router = await Router.deploy(factory, weth);
    await deployContract(router, "UniswapV2Router02")

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify Router
    await hre.run("verify:verify", {
      contract: "contracts/uniswapv2/UniswapV2Router02.sol:UniswapV2Router02",
      address: router.address,
      constructorArguments: [factory, weth],
    })
  })

task("callhash-deploy", "Deploy util for getting call hash for pair")
  .setAction(async (args, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy GetCallHash
    console.log(`Deploying Call Hash Getter with the account: ${deployer.address}`);
    const CallHash = await ethers.getContractFactory("GetCallHash");
    const callhash = await CallHash.deploy();
    await deployContract(callhash, "GetCallHash")


    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify Factory
    await hre.run("verify:verify", {
      contract: "contracts/utils/GetCallHash.sol:GetCallHash",
      address: callhash.address,
      constructorArguments: []
    })
  });


task("amm-pair-switch-fees", "Set dividend of dex")
  .addParam("pair", "Address of UniswapV2Factory contract")
  .addParam("treasury", "Set treasury distribution to")
  .addParam("dividend", "Set dividend distribution to")
  .setAction(async ({ pair, treasury, dividend }, { ethers }) => {
    const [deployer] = await ethers.getSigners();

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Check fee recipients
    const Pair = await ethers.getContractFactory("UniswapV2Pair")
    const treasuryOn =   await Pair.attach(pair).treasury();
    const dividendOn = await Pair.attach(pair).pool();
    console.log("Before: ", "[treasuryOn]", treasuryOn, "[dividendOn]", dividendOn)

    const tx = await Pair.attach(pair).switchFees((treasury === 'true'), (dividend === 'true'));
    await executeTx(tx, "Execute switchFees at")
    const treasuryOnAfter =   await Pair.attach(pair).treasury();
    const dividendOnAfter = await Pair.attach(pair).pool();
    console.log("After: ", "[treasuryOn]", treasuryOnAfter,  "[dividendOn]", dividendOnAfter)

    // Get before state
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  })