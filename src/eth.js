import { ethers } from 'ethers';
import contractABI from './utils/contractAbi.json';

const contractAddress = '0xb8e6bc0940A8186105B052C7Bf6F9b75C33Af789';

// Export a function to connect the wallet
export async function connectWallet() {
  if (window.ethereum) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { address, signer };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return { address: null, signer: null };
  }
} else {
  alert('Ethereum object not found, please install MetaMask.');
  return { address: null, signer: null };
}
}

// Initialize the contract with a signer when needed
export function getFeedbackRewardsContract(signer) {
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Export a function to reward a user, requiring a signer
export async function rewardUser(signer, userAddress) {
  const feedbackRewards = getFeedbackRewardsContract(signer);
  try {
    const tx = await feedbackRewards.rewardUser(userAddress);
    await tx.wait();
    console.log('Reward transaction successful:', tx);
    return true;
  } catch (error) {
    console.error('Reward transaction failed:', error);
    throw error;
  }
}