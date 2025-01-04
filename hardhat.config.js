require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    node_modules: "./node_modules", // Add this line to include the node_modules directory
  },
  networks: {
    hardhat :{
      chainId : 1337,
    },
  },
};
