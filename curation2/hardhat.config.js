require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const goerli_rpc_url = "https://rpc.ankr.com/eth_goerli"
const etherscan_key = process.env.ETHERSCAN_KEY
const priv_key = process.env.PRIVATE_KEY

module.exports = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
    },
    goerli: {
      url: goerli_rpc_url,
      accounts: [priv_key]
    },    
  },  
  etherscan: {
    apiKey: etherscan_key
  }
};