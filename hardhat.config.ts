import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { Chains, Chains_API_Keys, Chains_Custom_List } from "./chains";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
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
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...Chains,
  },
  mocha: {
    timeout: 300000,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    noColors: true,
    outputFile: "./out/gasReporter.txt",
  },
  etherscan: {
    apiKey: {
      ...Chains_API_Keys,
    },
    customChains: Chains_Custom_List,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache/hardhat",
    artifacts: "./out/hardhat/artifacts",
  },
  contractSizer: {
    /// yarn run hardhat size-contracts
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  },
  abiExporter: {
    /// yarn run hardhat export-abi | yarn run hardhat clear-abi
    path: "./out/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    format: "minimal",
  },
};

export default config;
