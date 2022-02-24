

export async function verify(hre, contract, at, args) {
    await hre.run("verify:verify", {
        contract: "contracts/tokens/meter.sol:MeterToken",
        address: at,
        cosntructorArguments: args,
      });
}