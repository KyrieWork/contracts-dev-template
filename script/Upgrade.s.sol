// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import { Script, console } from "forge-std/Script.sol";
import { Lock } from "../contracts/Lock.sol";

/* 
ERC1967Proxy upgradeToAndCall

Upgrade(Like:BSC-TestNet) CMD:
```
forge script script/Upgrade.s.sol:UpgradeScript --rpc-url $ETH_TEST_RPC_URL --broadcast --verify -v --verifier blockscout --verifier-url https://api-testnet.bscscan.com/api --legacy
```
 */

contract UpgradeScript is Script {
    address public target = address(0x0);

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        bytes memory upgradeData = abi.encodeWithSignature("upgradeToAndCall(address,bytes)", address(new Lock()), "");
        (bool s, ) = address(target).call(upgradeData);
        require(s, "upgrade target failed");

        console.log("Upgrade success!");
        vm.stopBroadcast();
    }
}
