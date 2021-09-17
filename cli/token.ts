import { task, types } from "hardhat/config";
import { BigNumber, constants } from "ethers";
import "@nomiclabs/hardhat-etherscan";
import { executeTx, deployContract} from "./helper";
import { ConstructorFragment } from "@ethersproject/abi";

task("token-deploy", "Deploy Standard Multichain Token").setAction(async (args, {ethers}) => {
    
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

    // Initialize proxy with necessary info
    const tx = await impl.attach(proxy.address).initialize("Standard", "STND", 18, "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa");
    await executeTx(tx, "Execute initialize at")

    console.log(
      `Deployer balance: ${ethers.utils.formatEther(
        await deployer.getBalance()
      )} ETH`
    );

    // INFO: hre can only be imported inside task
    const hre = require("hardhat")
    // Verify Impl
    await hre.run("verify:verify", {
        contract: "contracts/tokens/multichain/stnd_multichain_impl.sol:UChildAdministrableERC20",
        address: impl.address,
        constructorArguments: []
    })

    // Verify proxy
    console.log(impl.address)
    await hre.run("verify:verify", {
        contract: "contracts/tokens/multichain/stnd_multichain_proxy.sol:UChildERC20Proxy",
        address: proxy.address,
        constructorArguments: [impl.address]
    })
  });

/* Verify Command
At root directory:
npx hardhat --network {network} verify {address} 0xAd41F311C835224447c54C98fADf5E0AD9Eff077
npx hardhat --network {network} verify --contract contracts/tokens/multichain/stnd_multichain_proxy.sol:UChildERC20Proxy \
{address} \
{address of impl}
*/