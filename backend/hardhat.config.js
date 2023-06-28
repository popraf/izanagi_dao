require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
const { privateKey, polygonMumbaiRPC } = require('./.env.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",

  defaultNetwork: "localhost",

  networks: {
    hardhat: {},

    mumbai: {
      url: polygonMumbaiRPC,
      accounts: [privateKey],
      gasPrice: 3500000,
    },

    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [privateKey],
    },

    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },

};
