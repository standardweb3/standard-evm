import { task, types } from "hardhat/config";
import { BigNumber, constants, ContractFactory } from "ethers";
import { executeTx, deployContract } from "./helper";

const assert = (condition, message) => {
    if (condition) return;
    throw new Error(message);
  };

  // npx hardhat --network rinkeby deploy-amm  --weth 0xdf032bc4b9dc2782bb09352007d4c57b75160b15
  task("deploy-amm", "Deploy Standard AMM")
  .addParam("weth", "Address of Wrapped ETH")
  .setAction(async ({weth}, { ethers }) => {
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

  
    // Deploy router
    assert(
        ethers.utils.isAddress(weth),
        `WETH address '${weth}' is invalid.`
    );
    console.log(`Deploying Standard AMM router with the account: ${deployer.address}`);
    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const router = await Router.deploy(factory.address, weth);
    await deployContract(router, "UniswapV2Router02")

    // Get results
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

  });




