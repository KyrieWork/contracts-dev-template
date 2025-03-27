import { NetworkUserConfig } from "hardhat/types";
import { vars } from "hardhat/config";

/* # Hardhat account */
const TESTNET_PRIVATE_KEY = vars.get("TESTNET_PRIVATE_KEY");
const MAINNET_PRIVATE_KEY = vars.get("MAINNET_PRIVATE_KEY");

/* # Node RPC API keys */
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

/* # Block explorer API keys */
const SCAN_API_KEY = vars.get("SCAN_API_KEY");

const testnet: NetworkUserConfig = {
  url: `https://bsc-testnet.infura.io/v3/${INFURA_API_KEY}`,
  chainId: 97,
  accounts: [TESTNET_PRIVATE_KEY],
};

const mainnet: NetworkUserConfig = {
  url: `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  chainId: 56,
  accounts: [MAINNET_PRIVATE_KEY],
};

export const Chains = {
  testnet: testnet,
  mainnet: mainnet,
};

export const Chains_API_Keys = {
  testnet: SCAN_API_KEY || "empty",
  mainnet: SCAN_API_KEY,
};
export const Chains_Custom_List = [
  {
    network: "testnet",
    chainId: Chains.testnet.chainId!,
    urls: {
      apiURL: "https://testnet.bscscan.com/api",
      browserURL: "https://testnet.bscscan.com",
    },
  },
  {
    network: "mainnet",
    chainId: Chains.mainnet.chainId!,
    urls: {
      apiURL: "https://bscscan.com/api",
      browserURL: "https://bscscan.com",
    },
  },
];
