import "./vault"
import "./vaultmanager"
import "./deploy"

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

