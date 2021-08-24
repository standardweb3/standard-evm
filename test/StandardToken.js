const { expect } = require('chai');
const { now, mine, setTime, setTimeAndMine, Ganache,
  impersonate, skipBlocks, stopMining, startMining, addToBlock } = require('./helpers');
const LPS = require('./LiquidityProtectionService.json');

const expectArray = (actual, expected) => {
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i].toString()).to.equal(expected[i].toString());
  }
};


// Case 1: create vault with two mock tokens
describe('')

/*
describe('StandardToken', function() {
  let owner, user1, user2, user3, revoker;
  let ownerSigner, user1Signer, user2Signer, user3Signer, revokerSigner;
  let lps, lp, lpSigner;
  const EXT = 10n ** 18n;
  const HUNDRED_PERCENT = 10n ** 18n;
  const TOTAL_SUPPLY = 100000000n * EXT;
  const ganache = new Ganache();
  const SOME_ADDRESS = '0x1000000000000000000000000000000000000000';
  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  const FREEZE = 15;
  const GAS_LIMIT = { gasLimit: 200000 };

  const ProtectionConfig = {
    FirstBlockTrap_skip: false,

    LiquidityAmountTrap_skip: false,
    LiquidityAmountTrap_blocks: 4,
    LiquidityAmountTrap_amount: 20000n * EXT,

    LiquidityPercentTrap_skip: false,
    LiquidityPercentTrap_blocks: 6,
    LiquidityPercentTrap_percent: HUNDRED_PERCENT / 20n,

    LiquidityActivityTrap_skip: false,
    LiquidityActivityTrap_blocks: 3,
    LiquidityActivityTrap_count: 8,

    TokensToPutIntoLiquidityPool: 400000n * EXT,
    PredeployedLPS: '0xaabAe39230233d4FaFf04111EF08665880BD6dFb',
  }
  const TRAP = ProtectionConfig.LiquidityAmountTrap_amount;
  const PERCENT_TRAP = ProtectionConfig.LiquidityPercentTrap_percent;

  before('snapshot', async function() {
    await skipBlocks(FREEZE);
    [ownerSigner, user1Signer, user2Signer, user3Signer, revokerSigner] = await ethers.getSigners();
    owner = ownerSigner.address;
    user1 = user1Signer.address;
    user2 = user2Signer.address;
    user3 = user3Signer.address;
    revoker = revokerSigner.address;
    if (ethers.utils.isAddress(ProtectionConfig.PredeployedLPS)) {
      lps = await ethers.getContractAt('ILiquidityProtectionService', ProtectionConfig.PredeployedLPS);
    } else {
      const LiquidityProtectionService = new ethers.ContractFactory(LPS.abi, LPS.bytecode, ownerSigner);
      lps = await LiquidityProtectionService.deploy('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
      await lps.deployed();
    }
    const ExampleToken = await ethers.getContractFactory('Standard');
    ext = await ExampleToken.deploy();
    await ext.deployed();
    lp = await lps.getLiquidityPool(ext.address, WETH);
    lpSigner = await impersonate(lp);
    await (await ownerSigner.sendTransaction({to: lp, value: ethers.utils.parseEther('1')})).wait();
    await ganache.snapshot();
  });
  afterEach('revert', function() { return ganache.revert(); });

  beforeEach('setup', async function() {
    await startMining();
  });

  // // it.only
  it('Should have valid initial distribution', async function() {
    expect(await ext.isProtected()).to.be.true;
    expect(await ext.balanceOf(owner)).to.equal(TOTAL_SUPPLY);
    await ext.transfer(user1, 10);
    expect(await ext.balanceOf(user1)).to.equal(10);
    await ext.connect(user1Signer).transfer(user2, 10);
    expect(await ext.balanceOf(user2)).to.equal(10);
    await ext.transfer(user1, TRAP);
    expect(await ext.balanceOf(user1)).to.equal(TRAP);
    await ext.transfer(user1, TRAP);
    await ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT);
    await skipBlocks(300);
    await ext.connect(lpSigner).transfer(user1, TRAP);
    await ext.connect(user1Signer).transfer(lp, TRAP);
    await expect(ext.connect(user1Signer).revokeBlocked([user1, user2, user3], revoker))
        .to.be.revertedWith('UsingLiquidityProtectionService: not admin');
  });

  it('Should trap all buyers in the first block', async function() {
    if (ProtectionConfig.FirstBlockTrap_skip) {
      console.log('FirstBlockTrap disabled.');
      return;
    }
    await stopMining();
    await addToBlock(() => ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user2, 1, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user3, 2, GAS_LIMIT));
    // Block user1.
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 3, GAS_LIMIT));
    // Should be blocked.
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 2, GAS_LIMIT));
    // Sells are not blocked.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 1, GAS_LIMIT));
    await addToBlock(() => ext.connect(user3Signer).transfer(user2, 1, GAS_LIMIT));
    await mine();
    await startMining();
    await expect(ext.connect(user1Signer).transfer(user3, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    expect(await ext.balanceOf(user1)).to.equal(3);
    expect(await ext.balanceOf(user2)).to.equal(1);
    expect(await ext.balanceOf(user3)).to.equal(1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(user2Signer).transfer(lp, 1);
    await ext.connect(lpSigner).transfer(user3, 1);
    await ext.connect(user3Signer).transfer(lp, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.equal(4);
    expect(await ext.balanceOf(user1)).to.equal(0);
    expect(await ext.balanceOf(user2)).to.equal(1);
    expect(await ext.balanceOf(user3)).to.equal(1);
  });

  it('Should trap all buyers who bought above amount limit', async function() {
    if (ProtectionConfig.LiquidityAmountTrap_skip) {
      console.log('LiquidityAmountTrap disabled.');
      return;
    }
    if (ProtectionConfig.LiquidityAmountTrap_blocks < 3) {
      console.log('LiquidityAmountTrap test does not support less than 3 blocks config.');
      return;
    }
    await (await ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT)).wait();
    // await skipBlocks(ProtectionConfig.LiquidityAmountTrap_blocks - 1);
    // await skipBlocks(1);
    await stopMining();
    await addToBlock(() => ext.transfer(user2, 1, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user3, 2, GAS_LIMIT));
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, TRAP / 2n, GAS_LIMIT));
    await addToBlock(() => ext.connect(lpSigner).transfer(user2, TRAP / 2n, GAS_LIMIT));
    await addToBlock(() => ext.connect(lpSigner).transfer(user3, TRAP / 2n, GAS_LIMIT));
    await mine();

    await addToBlock(() => ext.connect(lpSigner).transfer(user1, (TRAP / 2n) - 2n, GAS_LIMIT));
    await addToBlock(() => ext.connect(lpSigner).transfer(user2, (TRAP / 2n) - 1n, GAS_LIMIT));
    // Block user3.
    const tx1 = await addToBlock(() => ext.connect(lpSigner).transfer(user3, TRAP / 2n, GAS_LIMIT));

    await addToBlock(() => ext.connect(lpSigner).transfer(user3, 1, GAS_LIMIT));
    // Transfers are not counted.
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 2, GAS_LIMIT));
    // Sells are not counted.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 1, GAS_LIMIT));
    // Should be blocked.
    const tx2 = await addToBlock(() => ext.connect(user3Signer).transfer(user2, 1, GAS_LIMIT));
    await mine();

    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 1, GAS_LIMIT));
    // Block user2.
    const tx3 = await addToBlock(() => ext.connect(lpSigner).transfer(user2, 1, GAS_LIMIT));
    await mine();
    await startMining();
    await expect(tx1).to.emit(lps, 'Blocked').withArgs(lp, user3, 'LiquidityAmountTrap');
    await expect(tx2.wait()).to.be.reverted;
    await expect(tx3).to.emit(lps, 'Blocked').withArgs(lp, user2, 'LiquidityAmountTrap');
    await expect(ext.connect(user2Signer).transfer(user1, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    await expect(ext.connect(user3Signer).transfer(user1, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    expect(await ext.balanceOf(user1)).to.equal(TRAP - 3n);
    expect(await ext.balanceOf(user2)).to.equal(TRAP + 2n);
    expect(await ext.balanceOf(user3)).to.equal(TRAP + 3n);
    await ext.connect(user1Signer).transfer(lp, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(lpSigner).transfer(user3, 1);
    // Should not block after blocks passed.
    await ext.connect(lpSigner).transfer(user1, TRAP);
    await ext.connect(user1Signer).transfer(lp, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.equal(TRAP + TRAP + 3n + 4n);
    expect(await ext.balanceOf(user1)).to.equal(TRAP + TRAP - 4n);
    expect(await ext.balanceOf(user2)).to.equal(0);
    expect(await ext.balanceOf(user3)).to.equal(0);
  });

  it('Should trap all buyers who bought above percent limit', async function() {
    if (ProtectionConfig.LiquidityPercentTrap_skip) {
      console.log('LiquidityPercentTrap disabled.');
      return;
    }
    let liquidity = 100000n * EXT;
    await (await ext.transfer(lp, liquidity, GAS_LIMIT)).wait();
    // Skip amount trap.
    if (!ProtectionConfig.LiquidityAmountTrap_skip) {
      // await skipBlocks(ProtectionConfig.LiquidityAmountTrap_blocks - 1);
      await skipBlocks(1);
    }
    await stopMining();
    await addToBlock(() => ext.transfer(user2, 1, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user3, 2, GAS_LIMIT));
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 2n, GAS_LIMIT));
    liquidity -= liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 2n;
    await addToBlock(() => ext.connect(lpSigner).transfer(user2, liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 1n, GAS_LIMIT));
    liquidity -= liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 1n;
    // Block user3.
    const tx1 = await addToBlock(() => ext.connect(lpSigner).transfer(user3, liquidity * PERCENT_TRAP / HUNDRED_PERCENT + 1n, GAS_LIMIT));
    liquidity -= liquidity * PERCENT_TRAP / HUNDRED_PERCENT + 1n;
    await addToBlock(() => ext.connect(lpSigner).transfer(user3, 1, GAS_LIMIT));
    liquidity -= 1n;
    // Transfers are not counted.
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 2, GAS_LIMIT));
    // Sells are not counted.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 1, GAS_LIMIT));
    liquidity += 1n;
    // Should be blocked.
    const tx2 = await addToBlock(() => ext.connect(user3Signer).transfer(user2, 1, GAS_LIMIT));
    await mine();
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 2n, GAS_LIMIT));
    liquidity -= liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 2n;
    await addToBlock(() => ext.connect(lpSigner).transfer(user2, liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 1n, GAS_LIMIT));
    liquidity -= liquidity * PERCENT_TRAP / HUNDRED_PERCENT - 1n;
    // Block user2.
    const tx3 = await addToBlock(() => ext.connect(lpSigner).transfer(user2, liquidity / 100n, GAS_LIMIT));
    liquidity -= liquidity / 100n;
    await mine();
    await startMining();
    await expect(tx1).to.emit(lps, 'Blocked').withArgs(lp, user3, 'LiquidityPercentTrap');
    await expect(tx2.wait()).to.be.reverted;
    await expect(tx3).to.emit(lps, 'Blocked').withArgs(lp, user2, 'LiquidityPercentTrap');
    await expect(ext.connect(user2Signer).transfer(user1, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    await expect(ext.connect(user3Signer).transfer(user1, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    expect(await ext.balanceOf(lp)).to.equal(liquidity);
    await ext.connect(user1Signer).transfer(lp, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(lpSigner).transfer(user3, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.not.equal(0);
    expect(await ext.balanceOf(user1)).to.not.equal(0);
    expect(await ext.balanceOf(user2)).to.equal(0);
    expect(await ext.balanceOf(user3)).to.equal(0);
  });

  it('Should trap all traders if more than 8 trades in the second block', async function() {
    if (ProtectionConfig.LiquidityActivityTrap_skip) {
      console.log('LiquidityActivityTrap disabled.');
      return;
    }
    await (await ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT)).wait();
    // await mine();
    await stopMining();
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 100, GAS_LIMIT));
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 10, GAS_LIMIT));
    // Simple transfers are not counted.
    await addToBlock(() => ext.connect(user1Signer).transfer(user3, 10, GAS_LIMIT));
    await addToBlock(() => ext.connect(user3Signer).transfer(user1, 5, GAS_LIMIT));
    // User2 traded.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 5, GAS_LIMIT));
    for (let i = 0; i < ProtectionConfig.LiquidityActivityTrap_count - 2; i++) {
      await addToBlock(() => ext.connect(lpSigner).transfer(user1, 10, GAS_LIMIT));
    }
    // 16th tx block the sell (reverted).
    const tx = await addToBlock(() => ext.connect(user1Signer).transfer(lp, 10, GAS_LIMIT));
    // 16th tx block the block.
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 10, GAS_LIMIT));
    await mine();
    await startMining();
    await expect(tx.wait()).to.be.reverted;
    await expect(ext.connect(user2Signer).transfer(user1, 1))
        .to.be.revertedWith('LiquidityActivityTrap: blocked');
    await expect(ext.connect(user1Signer).transfer(owner, 1))
        .to.be.revertedWith('LiquidityActivityTrap: blocked');
    await ext.connect(user3Signer).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(lpSigner).transfer(user3, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.equal(157 + 6);
    expect(await ext.balanceOf(user1)).to.equal(0);
    expect(await ext.balanceOf(user2)).to.equal(0);
    expect(await ext.balanceOf(user3)).to.equal(5);
  });

  it('Should trap all traders if more than 8 trades in the third block, but do not trap second block traders', async function() {
    if (ProtectionConfig.LiquidityActivityTrap_skip) {
      console.log('LiquidityActivityTrap disabled.');
      return;
    }
    await (await ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT)).wait();
    // await mine();
    await stopMining();
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 100, GAS_LIMIT));
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 10, GAS_LIMIT));
    // Simple transfers are not counted.
    await addToBlock(() => ext.connect(user1Signer).transfer(user3, 10, GAS_LIMIT));
    await addToBlock(() => ext.connect(user3Signer).transfer(user1, 5, GAS_LIMIT));
    // User2 traded.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 5, GAS_LIMIT));
    for (let i = 0; i < ProtectionConfig.LiquidityActivityTrap_count - 2; i++) {
      await addToBlock(() => ext.connect(lpSigner).transfer(user1, 10, GAS_LIMIT));
    }
    await mine();
    for (let i = 0; i < ProtectionConfig.LiquidityActivityTrap_count + 1; i++) {
      await addToBlock(() => ext.connect(lpSigner).transfer(user1, 10, GAS_LIMIT));
    }
    await mine();
    await startMining();
    await expect(ext.connect(user1Signer).transfer(owner, 1))
        .to.be.revertedWith('LiquidityActivityTrap: blocked');
    await ext.connect(user2Signer).transfer(user1, 1);
    await ext.connect(user3Signer).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(lpSigner).transfer(user3, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.not.equal(0);
    expect(await ext.balanceOf(user1)).to.equal(0);
    expect(await ext.balanceOf(user2)).to.not.equal(0);
    expect(await ext.balanceOf(user3)).to.not.equal(0);
  });

  it('Should not trap traders after activity blocks passed', async function() {
    if (ProtectionConfig.LiquidityActivityTrap_skip) {
      console.log('LiquidityActivityTrap disabled.');
      return;
    }
    await (await ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT)).wait();
    await skipBlocks(ProtectionConfig.LiquidityActivityTrap_blocks);
    await stopMining();
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 100, GAS_LIMIT));
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 10, GAS_LIMIT));
    await addToBlock(() => ext.connect(user1Signer).transfer(user3, 10, GAS_LIMIT));
    await addToBlock(() => ext.connect(user3Signer).transfer(user1, 5, GAS_LIMIT));
    // User2 traded.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 5, GAS_LIMIT));
    for (let i = 0; i < ProtectionConfig.LiquidityActivityTrap_count + 1; i++) {
      await addToBlock(() => ext.connect(lpSigner).transfer(user1, 10, GAS_LIMIT));
    }
    await mine();
    await startMining();
    await ext.connect(user1Signer).transfer(user2, 1);
    await ext.connect(user2Signer).transfer(user1, 1);
    await ext.connect(user3Signer).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(lpSigner).transfer(user3, 1);

    await ext.revokeBlocked([user1, user2, user3], revoker);
    expect(await ext.balanceOf(revoker)).to.equal(0);
    expect(await ext.balanceOf(user1)).to.not.equal(0);
    expect(await ext.balanceOf(user2)).to.not.equal(0);
    expect(await ext.balanceOf(user3)).to.not.equal(0);
  });

  it('Should disable protection', async function() {
    const SECONDS_IN_DAY = 86400;
    await stopMining();
    await addToBlock(() => ext.transfer(lp, ProtectionConfig.TokensToPutIntoLiquidityPool, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user2, 1, GAS_LIMIT));
    await addToBlock(() => ext.transfer(user3, 2, GAS_LIMIT));
    // Block user1.
    await addToBlock(() => ext.connect(lpSigner).transfer(user1, 3, GAS_LIMIT));
    // Should be blocked.
    await addToBlock(() => ext.connect(user1Signer).transfer(user2, 2, GAS_LIMIT));
    // Sells are not blocked.
    await addToBlock(() => ext.connect(user2Signer).transfer(lp, 1, GAS_LIMIT));
    await addToBlock(() => ext.connect(user3Signer).transfer(user2, 1, GAS_LIMIT));
    await mine();
    await startMining();
    await expect(ext.connect(user1Signer).transfer(user3, 1))
        .to.be.revertedWith('FirstBlockTrap: blocked');
    await setTimeAndMine(1620086399)
    await ext.connect(user1Signer).transfer(user3, 1);
    await ext.connect(lpSigner).transfer(user1, 1);
    await ext.connect(lpSigner).transfer(user2, 1);
    await ext.connect(user2Signer).transfer(lp, 1);
    await ext.connect(lpSigner).transfer(user3, 1);
    await ext.connect(user3Signer).transfer(lp, 1);
    await expect(ext.revokeBlocked([user1, user2, user3], revoker))
        .to.be.revertedWith('UsingLiquidityProtectionService: protection removed');
  });
});

*/