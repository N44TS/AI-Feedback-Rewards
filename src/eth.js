import { ethers } from 'ethers';
import contractABI from './utils/contractAbi.json';

const contractAddress = '0x092E3bBeb7c7A239059de7aB03335FE6261F1554';

// connect the wallet export function
export async function connectWallet() {
  if (window.ethereum) {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' }); 
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

export async function rewardUser(signer, userAddress, hashedToken) {
    const feedbackRewards = getFeedbackRewardsContract(signer);
    // Prefix the hashedToken with '0x' as if not already prefixed
    const prefixedHashedToken = hashedToken.startsWith('0x') ? hashedToken : `0x${hashedToken}`;
    try {
      const tx = await feedbackRewards.rewardUser(userAddress, prefixedHashedToken);
      await tx.wait();
      console.log('Reward transaction successful:', tx);
    } catch (error) {
      console.error('Error rewarding user:', error);
      throw error;
    }
}

// function to interact with addValidHashedToken
export async function addValidHashedToken(signer, hashedToken) {
    const feedbackRewards = getFeedbackRewardsContract(signer);
    const tx = await feedbackRewards.addValidHashedToken(hashedToken);
    await tx.wait();
    console.log('Hashed token added successfully');
}
