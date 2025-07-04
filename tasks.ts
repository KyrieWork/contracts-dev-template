import { task } from 'hardhat/config';
import { Contract } from 'ethers';

// cmd: npx hardhat task:accounts
task('task:accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// cmd: npx hardhat task:balance --account 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --network localhost
task('task:balance', "Prints an account's balance")
  .addParam('account', "The account's address")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);

    console.log(hre.ethers.formatEther(balance), 'ETH');
  });

// cmd: npx hardhat task:blockNumber --network localhost
task('task:blockNumber', 'Get current network block height').setAction(async (taskArgs, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log(`Current block height: ${blockNumber}`);
});

// cmd: npx hardhat task:verify-contract --contract <contract address> --name <contract name> --network localhost --args <constructor arguments,comma separated>
task('task:verify-contract', 'Verify contract code')
  .addParam('contract', 'Deployed contract address')
  .addParam('name', 'Contract name')
  .addOptionalParam('args', 'Constructor arguments, comma separated', '')
  .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.contract;
    const contractName = taskArgs.name;
    let constructorArgs: any[] = [];

    if (taskArgs.args) {
      constructorArgs = taskArgs.args.split(',');
    }

    console.log(`Verifying contract ${contractName} at address ${contractAddress}`);

    try {
      await hre.run('verify:verify', {
        address: contractAddress,
        contract: `contracts/${contractName}.sol:${contractName}`,
        constructorArguments: constructorArgs,
      });
      console.log('Contract verification successful!');
    } catch (error) {
      console.error('Contract verification failed:', error);
    }
  });

// cmd: npx hardhat task:deploy-contract --name ERC20Mock --args "a,b" --network localhost
task('task:deploy-contract', 'Deploy smart contract')
  .addParam('name', 'Contract name')
  .addOptionalParam('args', 'Constructor arguments, comma separated', '')
  .setAction(async (taskArgs, hre) => {
    await hre.run('compile');

    const contractName = taskArgs.name;
    const networkName = hre.network.name;
    let constructorArgs: any[] = [];

    if (taskArgs.args) {
      constructorArgs = taskArgs.args.split(',');
    }

    console.log(`Deploying ${contractName} to ${networkName} network`);

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deployer address: ${deployer.address}`);

    try {
      // Load contract factory
      const artifact = await hre.artifacts.readArtifact(contractName);
      const factory = new hre.ethers.ContractFactory(artifact.abi, artifact.bytecode, deployer);

      // Deploy contract
      const contract = await factory.deploy(...constructorArgs);
      await contract.waitForDeployment();

      const contractAddress = await contract.getAddress();
      console.log(`${contractName} has been deployed to address: ${contractAddress}`);

      // Save deployment information
      const fs = require('fs');
      const deployments = JSON.parse(
        fs.existsSync('./out/deployments.json')
          ? fs.readFileSync('./out/deployments.json', 'utf8')
          : '{}'
      );

      if (!deployments[networkName]) {
        deployments[networkName] = {};
      }

      deployments[networkName][contractName] = {
        address: contractAddress,
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        args: constructorArgs,
      };

      if (!fs.existsSync('./out')) {
        fs.mkdirSync('./out', { recursive: true });
      }

      fs.writeFileSync('./out/deployments.json', JSON.stringify(deployments, null, 2));

      console.log(`Deployment information saved to ./out/deployments.json`);

      return { contract, address: contractAddress };
    } catch (error) {
      console.error(`Deployment failed:`, error);
      throw error;
    }
  });

// cmd: npx hardhat task:read-contract --address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --name ERC20Mock --function balanceOf --args 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network localhost
task('task:read-contract', "Call contract's read-only method")
  .addParam('address', 'Contract address')
  .addParam('name', 'Contract name')
  .addParam('function', 'Function name')
  .addOptionalParam('args', 'Function arguments, comma separated', '')
  .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.address;
    const contractName = taskArgs.name;
    const functionName = taskArgs.function;

    let functionArgs: any[] = [];
    if (taskArgs.args) {
      functionArgs = taskArgs.args.split(',');
    }

    console.log(`Calling ${contractName}'s ${functionName} function`);

    try {
      // Get contract instance
      const artifact = await hre.artifacts.readArtifact(contractName);
      const [signer] = await hre.ethers.getSigners();
      const contract = new Contract(contractAddress, artifact.abi, signer);

      // Call contract function
      const result = await contract[functionName](...functionArgs);
      console.log(`Result:`, result);
      return result;
    } catch (error) {
      console.error(`Function call failed:`, error);
      throw error;
    }
  });

// cmd: npx hardhat task:write-contract --address 0x5FbDB2315678afecb367f032d93F642f64180aa3  --name ERC20Mock --function mint --args 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,1000000000000000000000000 --value 0 --network localhost
task('task:write-contract', "Call contract's write method")
  .addParam('address', 'Contract address')
  .addParam('name', 'Contract name')
  .addParam('function', 'Function name')
  .addOptionalParam('args', 'Function arguments, comma separated', '')
  .addOptionalParam('value', 'ETH amount to send with transaction', '0')
  .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.address;
    const contractName = taskArgs.name;
    const functionName = taskArgs.function;
    const value = hre.ethers.parseEther(taskArgs.value);

    let functionArgs: any[] = [];
    if (taskArgs.args) {
      functionArgs = taskArgs.args.split(',');
    }

    console.log(`Calling ${contractName}'s ${functionName} function with ${taskArgs.value} ETH`);

    try {
      // Get contract instance
      const artifact = await hre.artifacts.readArtifact(contractName);
      const [signer] = await hre.ethers.getSigners();
      const contract = new Contract(contractAddress, artifact.abi, signer);

      // Call contract function
      const tx = await contract[functionName](...functionArgs, { value });
      console.log(`Transaction hash:`, tx.hash);

      // Wait for transaction confirmation
      console.log(`Waiting for transaction confirmation...`);
      const receipt = await tx.wait();
      console.log(
        `Transaction confirmed, block number: ${receipt.blockNumber}, Gas used: ${receipt.gasUsed}`
      );

      return receipt;
    } catch (error) {
      console.error(`Function call failed:`, error);
      throw error;
    }
  });

// cmd: npx hardhat task:list-deployments --network localhost
task('task:list-deployments', 'List deployed contracts').setAction(async (taskArgs, hre) => {
  const fs = require('fs');

  if (!fs.existsSync('./out/deployments.json')) {
    console.log('No deployment records found');
    return;
  }

  const deployments = JSON.parse(fs.readFileSync('./out/deployments.json', 'utf8'));

  if (taskArgs.network) {
    // Show deployments for specific network
    const networkDeployments = deployments[taskArgs.network];

    if (!networkDeployments) {
      console.log(`No deployment records found for network ${taskArgs.network}`);
      return;
    }

    console.log(`Deployments on ${taskArgs.network} network:`);
    for (const [contractName, info] of Object.entries(networkDeployments)) {
      console.log(`- ${contractName}: ${(info as any).address}`);
    }
  } else {
    // Show deployments for all networks
    console.log('Deployments on all networks:');
    for (const [network, contracts] of Object.entries(deployments)) {
      console.log(`\n${network} network:`);
      for (const [contractName, info] of Object.entries(contracts as any)) {
        console.log(`- ${contractName}: ${(info as any).address}`);
      }
    }
  }
});

// cmd: npx hardhat task:transfer --to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --amount 1.23456789 --network localhost
task('task:transfer', 'Send native tokens (ETH/MATIC etc.)')
  .addParam('to', 'Recipient address')
  .addParam('amount', 'Amount to send')
  .setAction(async (taskArgs, hre) => {
    const toAddress = taskArgs.to;
    const amount = hre.ethers.parseEther(taskArgs.amount);

    console.log(`Sending ${taskArgs.amount} ETH to ${toAddress}`);

    const [sender] = await hre.ethers.getSigners();
    console.log(`Sender address: ${sender.address}`);

    const senderBalance = await hre.ethers.provider.getBalance(sender.address);
    console.log(`Sender balance: ${hre.ethers.formatEther(senderBalance)} ETH`);

    if (senderBalance < amount) {
      console.error(
        `Insufficient balance, need ${taskArgs.amount} ETH, but only have ${hre.ethers.formatEther(senderBalance)} ETH`
      );
      return;
    }

    try {
      const tx = await sender.sendTransaction({
        to: toAddress,
        value: amount,
      });

      console.log(`Transaction sent, hash: ${tx.hash}`);
      console.log(`Waiting for transaction confirmation...`);

      const receipt = await tx.wait();
      if (receipt) {
        console.log(`Transaction confirmed, block number: ${receipt.blockNumber}`);

        // Show balance after transfer
        const newBalance = await hre.ethers.provider.getBalance(sender.address);
        console.log(`New balance: ${hre.ethers.formatEther(newBalance)} ETH`);
      }

      return receipt;
    } catch (error) {
      console.error(`Transaction failed:`, error);
      throw error;
    }
  });

// cmd: npx hardhat task:impersonate --address 0x0000000000000000000000000000000000000123 --network localhost
task('task:impersonate', 'Impersonate specified address')
  .addParam('address', 'Address to impersonate')
  .setAction(async (taskArgs, hre) => {
    if (!['hardhat', 'localhost'].includes(hre.network.name)) {
      console.error(`This task can only be run on local networks (hardhat or localhost)`);
      return;
    }

    const targetAddress = taskArgs.address;

    try {
      console.log(`Impersonating address: ${targetAddress}`);

      // Make target address have enough ETH
      await hre.network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [targetAddress],
      });

      // Optional: provide some ETH to the impersonated account
      const [signer] = await hre.ethers.getSigners();
      await signer.sendTransaction({
        to: targetAddress,
        value: hre.ethers.parseEther('10'),
      });

      console.log(`Address ${targetAddress} has been impersonated and received 10 ETH`);

      const impersonatedSigner = await hre.ethers.getSigner(targetAddress);
      const balance = await hre.ethers.provider.getBalance(targetAddress);

      console.log(`Impersonated address balance: ${hre.ethers.formatEther(balance)} ETH`);

      // Return the impersonated signer for use in other scripts
      return impersonatedSigner;
    } catch (error) {
      console.error(`Failed to impersonate address:`, error);
      throw error;
    }
  });

// cmd: npx hardhat task:erc20-balance --token 0x5FbDB2315678afecb367f032d93F642f64180aa3 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network localhost
task('task:erc20-balance', 'Query ERC20 token balance')
  .addParam('token', 'Token contract address')
  .addParam('account', 'Account address')
  .setAction(async (taskArgs, hre) => {
    const tokenAddress = taskArgs.token;
    const accountAddress = taskArgs.account;

    // ERC20 token ABI
    const erc20Abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address owner) view returns (uint256)',
    ];

    try {
      // Create token contract instance
      const tokenContract = new Contract(tokenAddress, erc20Abi, hre.ethers.provider);

      // Get token information
      const [name, symbol, decimals, balance] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.balanceOf(accountAddress),
      ]);

      // Display formatted balance
      const formattedBalance = hre.ethers.formatUnits(balance, decimals);
      console.log(`Account ${accountAddress}'s ${name} (${symbol}) balance: ${formattedBalance}`);

      return {
        token: {
          address: tokenAddress,
          name,
          symbol,
          decimals,
        },
        account: accountAddress,
        balance,
        formattedBalance,
      };
    } catch (error) {
      console.error(`Failed to query ERC20 balance:`, error);
      throw error;
    }
  });
