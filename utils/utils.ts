import hre from "hardhat";

export const Wallets = async () => {
  const accounts = await hre.ethers.getSigners();
  return {
    deployer: accounts[0],
    signer: accounts[1],
    operator: accounts[2],
    projectOwner: accounts[3],
    user: accounts[4],
    client1: accounts[5],
    client2: accounts[6],
    client3: accounts[7],
    attacker: accounts[8],
    other: accounts[9],
  };
};

export const WeiToEther = (wei: any) => {
  return hre.ethers.formatEther(wei);
};

export const EtherToWei = (ether: any) => {
  return hre.ethers.parseEther(String(ether));
};

export const ToBigInt = (value: any) => {
  return hre.ethers.toBigInt(value);
};

export const ToBigIntAdd = (value1: any, value2: any) => {
  return ToBigInt(value1) + ToBigInt(value2);
};

export const ToBigIntSub = (value1: any, value2: any) => {
  return ToBigInt(value1) - ToBigInt(value2);
};

export const ToBigIntMul = (value1: any, value2: any) => {
  return ToBigInt(value1) * ToBigInt(value2);
};

export const ToBigIntDiv = (value1: any, value2: any) => {
  return ToBigInt(value1) / ToBigInt(value2);
};
