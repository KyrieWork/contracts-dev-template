# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat node
source .env
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Hardhat ENV Set

ENV List:

- TESTNET_PRIVATE_KEY
- MAINNET_PRIVATE_KEY
- INFURA_API_KEY
- SCAN_API_KEY

CMD:

1. set env value: `npx hardhat vars set <name>`
2. delete: `npx hardhat vars delete <name>`
3. check all saved: `npx hardhat vars list`
4. get var value: `npx hardhat vars get <name>`
