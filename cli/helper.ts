

/// executes txs without race conditions in production environment
/// example
/// const tx = await factory.connect(deployer).setFeeTo(deployer.address);
/// await executeTx(tx, "Execute setFeeTo at")
/// logs Executes setFeeTo at: 0xf81ded9ca5936a06f9a4ee53db8a568eb84ffd39095ff6dfe0ff5aa60bb98058
export async function executeTx(tx: any, event: string) {
    console.log(`${event}: ${tx.hash}`);
    console.log("Mining...");
    await tx.wait();
}
  