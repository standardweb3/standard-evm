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
  it("VaultManager can add Oracle", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Mock = ethers.getContractFactory("MockToken");
    const Dummy = ethers.getContractFactory("Dummy");
    const VaultManager = ethers.getContractFactory("VaultManager");
    const collateral = (await Mock).deploy("Collateral", "clt");
    const stable = (await Mock).deploy("Stable", "stc");
    const quantity = 1000e18;
    const dummy = (await Dummy).deploy("1000000000");
    const vltmgr = (await VaultManager).deploy();
    (await vltmgr).addOracle(stable, dummy);
  });

  it("Vault should generate new vault contract with predictable hash", async function () {
    const [owner] = await ethers.getSigners();
    const MTR = await ethers.getContractFactory("MeterToken");
    const V1 = await ethers.getContractFactory("V1");
    const VaultManager = ethers.getContractFactory("VaultManager");
    const FeePool = ethers.getContractFactory("BondedStartegy");
  });
});
