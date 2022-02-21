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

describe("SVG", function () {
  it("An SVG should generate a image byte data", async function () {
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
    const data = await svg.svgToImageURI();
    console.log(data)
  });
});
