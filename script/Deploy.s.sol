// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import { Script, console } from "forge-std/Script.sol";

/* 
Deploy(Like:BSC-TestNet) CMD:
```
forge script script/Deploy.s.sol:DeploySript --rpc-url $ETH_TEST_RPC_URL --broadcast --verify -v --verifier blockscout --verifier-url https://api-testnet.bscscan.com/api --legacy
```
 */

contract DeploySript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy contract...

        vm.stopBroadcast();
    }
}
