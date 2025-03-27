# Sample Hardhat + Foundry Project

This project demonstrates a basic combined use case of Hardhat and Foundry. It comes with sample contracts, tests, and deployment modules.

## Quick Start

```shell
# Install dependencies
yarn install

# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Git submodules (if using libraries via Git submodules)
git submodule update --init --recursive

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration
source .env
```

## Common Commands

```shell
# Build commands
yarn build         # Compile contracts with both Hardhat and Foundry
yarn clean         # Remove build artifacts
yarn rebuild       # Clean and rebuild the project

# Node commands
yarn node-localnet # Start a local Anvil node
yarn node-mainnet  # Start a forked mainnet Anvil node
yarn node-testnet  # Start a forked testnet Anvil node

# Hardhat commands
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Project Structure

```
├── contracts/       # Smart contract source code
├── test/            # Hardhat/Hardhat tests (*.ts, *.t.sol files)
├── script/          # Foundry deployment scripts (*.s.sol files)
├── ignition/        # Hardhat Ignition modules
├── out/             # Foundry/Hardhat output directory
├── lib/             # Foundry libraries
├── utils/           # Utility scripts
├── hardhat.config.ts # Hardhat configuration
├── foundry.toml     # Foundry configuration
├── chains.ts        # Chain configuration
├── tasks.ts         # Hardhat tasks
└── ...
```

## Hardhat ENV Management

ENV List:

- TESTNET_PRIVATE_KEY
- MAINNET_PRIVATE_KEY
- INFURA_API_KEY
- SCAN_API_KEY

Commands:

1. Set env value: `npx hardhat vars set <name>`
2. Delete: `npx hardhat vars delete <name>`
3. List all saved: `npx hardhat vars list`
4. Get var value: `npx hardhat vars get <name>`

## Foundry Commands

```shell
# Compile
forge build

# Test
forge test

# Deploy
forge script script/Deploy.s.sol:Deploy --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast

# Format code
forge fmt
```

## Environment Variables

Create a `.env` file based on the provided `.env.example`:

```
# Networks
ETH_RPC_URL=your_mainnet_rpc_url
ETH_TEST_RPC_URL=your_testnet_rpc_url

# Private keys
PRIVATE_KEY=your_private_key
TESTNET_PRIVATE_KEY=your_testnet_private_key
MAINNET_PRIVATE_KEY=your_mainnet_private_key

# API Keys
INFURA_API_KEY=your_infura_api_key
SCAN_API_KEY=your_etherscan_api_key
```

Load environment variables:

```shell
source .env
```

## Development Workflow

1. **Write and compile contracts**
   - `yarn build`
2. **Write and run tests**
   - Hardhat tests: `npx hardhat test`
   - Foundry tests: `forge test`
3. **Deployment options**
   - Hardhat Ignition: `npx hardhat ignition deploy ./ignition/modules/Lock.ts`
   - Foundry Script: `forge script script/Deploy.s.sol:Deploy --rpc-url $ETH_RPC_URL --private-key $PRIVATE_KEY --broadcast`

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Foundry Book](https://book.getfoundry.sh/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
