const Promise = require('bluebird');

const now = async () => (await ethers.provider.getBlock('latest')).timestamp;
const mine = () => network.provider.send('evm_mine', []);
const stopMining = () => network.provider.send("evm_setAutomine", [false]);
const startMining = () => network.provider.send('evm_setAutomine', [true]);
const setTime = (timestamp) => network.provider.send('evm_setNextBlockTimestamp', [parseInt(timestamp)]);
const setTimeAndMine = async (timestamp) => {
  await setTime(timestamp);
  await mine();
};

const addToBlock = async (txFunc) => {
  await Promise.delay(100);
  const tx = txFunc();
  await Promise.delay(100);
  return tx;
};

const skipBlocks = async (blocks) => {
  for (let i = 0; i < blocks; i++) {
    await mine();
  }
};

class Ganache {
  constructor() {
    this.snapshotId = 0;
  }

  async revert() {
    await network.provider.send('evm_revert', [this.snapshotId]);
    return this.snapshot();
  }

  async snapshot() {
    this.snapshotId = await network.provider.send('evm_snapshot', []);
  }
}

const impersonate = async (address) => {
  await network.provider.send('hardhat_impersonateAccount', [address]);
  return ethers.provider.getSigner(address);
};


module.exports = {
  now, mine, setTime, setTimeAndMine, Ganache, impersonate, skipBlocks,
  startMining, stopMining, addToBlock
};