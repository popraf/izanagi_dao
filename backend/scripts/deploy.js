const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
  
    const IzanagiDAO = await hre.ethers.deployContract('IzanagiDAO');
    console.log('deployContract finished. Deploying, please wait...');

    await IzanagiDAO.waitForDeployment();
    console.log('waitForDeployment finished.');

    const address = await IzanagiDAO.getAddress();
  
    console.log('Contract deployed to:', address);
  
    // Save contract address for later use
    fs.writeFileSync('contract-address.txt', address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
