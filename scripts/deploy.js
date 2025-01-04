
const hre = require("hardhat");

async function main() {

  const EVM = await hre.ethers.deployContract("VotingMachine");

  await EVM.waitForDeployment();

  console.log(
    `EVM Successfully deployed to ${EVM.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
