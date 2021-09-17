import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";
import { executeTx, deployContract } from "./helper";

task("deploy-stnd", "Deploy Standard Multichain Token").setAction(async (args, { ethers }) => {
    const [deployer] = await ethers.getSigners();
  
    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // Deploy  Impl
    console.log(`Deploying Standard Multichain Token Impl with the account: ${deployer.address}`);
    const TokenImpl = await ethers.getContractFactory("UChildAdministrableERC20")
    const impl = await TokenImpl.deploy()
    await deployContract(impl, "UChildAdministrableERC20")

    // Deploy Proxy
    console.log(`Deploying Standard Multichain Token Proxy with the account: ${deployer.address}`);
    const Proxy = await ethers.getContractFactory("UChildERC20Proxy")
    const proxy = await Proxy.deploy(impl.address)
    await deployContract(proxy, "UChildERC20Proxy")

    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );
  });
