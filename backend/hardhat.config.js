require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  defaultNetwork: "localhost",

  networks: {
    hardhat: {},

    mumbai: {
      url: polygonMumbaiRPC,
      accounts: [privateKey],
      gasPrice: 350000,
    },

    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },

};
