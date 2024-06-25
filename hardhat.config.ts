import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-gas-reporter";
import "solidity-coverage";

/* # Hardhat set  */

/* # Hardhat account */
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

/* # Node RPC API keys */
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

/* # Block explorer API keys */
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 300000,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    noColors: true,
    // outputFile: "./out/.gasReporter",
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};

export default config;
