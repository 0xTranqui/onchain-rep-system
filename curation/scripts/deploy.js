// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const title = "Present Material";
  const curationPass = "0xC7A03190BdbA0DC9E70814308a665cBcC5e731C7";
  const curationLimit = 0;
  const isActive = true;

  const Manager = await hre.ethers.getContractFactory("CurationManager")

  const manager = await Manager.deploy(
    title,
    curationPass,
    curationLimit,
    isActive
  )

  await manager.deployed

  console.log(
    `CurationManager ${manager.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});