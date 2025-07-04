import hre from 'hardhat';

type ContractItem = {
  address: string;
  contract: any;
};

export const MockToken = async (name: string, symbol: string) => {
  const MockToken = await hre.ethers.getContractFactory('ERC20Mock');
  const token = await MockToken.deploy(name, symbol);
  const tokenAddress = await token.getAddress();
  return { address: tokenAddress, contract: token } as ContractItem;
};
