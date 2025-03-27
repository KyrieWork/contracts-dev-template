import { HardhatUserConfig } from "hardhat/config";
import { Chains, Chains_API_Keys, Chains_Custom_List } from "./chains";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.25",
    settings: {
      // evmVersion: "istanbul",
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...Chains,
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
  mocha: {
    timeout: 300000,
  },
  sourcify: {
    // sourcify is a decentralized source code verification service.
    enabled: false,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    noColors: true,
    outputFile: "./out/gasReporter.txt",
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
