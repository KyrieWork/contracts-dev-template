import { NetworkUserConfig } from 'hardhat/types';
import { ChainConfig } from '@nomicfoundation/hardhat-verify/types';
import { vars } from 'hardhat/config';

/* # Hardhat account */
const TESTNET_PRIVATE_KEY = vars.get('TESTNET_PRIVATE_KEY');
const MAINNET_PRIVATE_KEY = vars.get('MAINNET_PRIVATE_KEY');

/* # Node RPC API keys */
const INFURA_API_KEY = vars.get('INFURA_API_KEY');

/* # Block explorer API keys */
const SCAN_API_KEY = vars.get('SCAN_API_KEY');

export enum Network {
  HARDHAT = 'hardhat',
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  LOCALHOST = 'localhost',
}
export type ConfigChainType<T> = { [key in Network | string]: T };

export interface NetworkConfig {
  chainId: number;
  accounts: string[];
  apiKeys: {
    scan: string;
    infura?: string;
  };
  urls: {
    rpcUrl: string;
    apiURL?: string;
    browserURL?: string;
  };
}

export const getNetworkConfig: ConfigChainType<NetworkConfig> = {
  [Network.MAINNET]: {
    chainId: 56,
    accounts: [MAINNET_PRIVATE_KEY],
    apiKeys: {
      scan: SCAN_API_KEY,
      infura: INFURA_API_KEY,
    },
    urls: {
      rpcUrl: `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      apiURL: 'https://bscscan.com/api',
      browserURL: 'https://bscscan.com',
    },
  },
  [Network.TESTNET]: {
    chainId: 97,
    accounts: [TESTNET_PRIVATE_KEY],
    apiKeys: {
      scan: SCAN_API_KEY,
      infura: INFURA_API_KEY,
    },
    urls: {
      rpcUrl: `https://bsc-testnet.infura.io/v3/${INFURA_API_KEY}`,
      apiURL: 'https://testnet.bscscan.com/api',
      browserURL: 'https://testnet.bscscan.com',
    },
  },
  [Network.LOCALHOST]: {
    chainId: 243522,
    accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
    apiKeys: {
      scan: 'empty',
    },
    urls: {
      rpcUrl: `http://127.0.0.1:8545/`,
    },
  },
};

export const hardhatConfig_Chains = (config: NetworkConfig) => {
  return {
    url: config.urls.rpcUrl,
    chainId: config.chainId,
    accounts: config.accounts,
  } as NetworkUserConfig;
};

export const hardhatConfig_Custom_List = (config: NetworkConfig, network: Network) => {
  return {
    network: network as string,
    chainId: config!.chainId,
    urls: {
      apiURL: config!.urls.apiURL,
      browserURL: config!.urls.browserURL,
    },
  } as ChainConfig;
};

export const Chains = {
  testnet: hardhatConfig_Chains(getNetworkConfig[Network.TESTNET]),
  mainnet: hardhatConfig_Chains(getNetworkConfig[Network.MAINNET]),
};

export const Chains_API_Keys = {
  testnet: getNetworkConfig[Network.TESTNET].apiKeys.scan,
  mainnet: getNetworkConfig[Network.MAINNET].apiKeys.scan,
};

export const Chains_Custom_List = [
  hardhatConfig_Custom_List(getNetworkConfig[Network.TESTNET], Network.TESTNET),
  hardhatConfig_Custom_List(getNetworkConfig[Network.MAINNET], Network.MAINNET),
];
