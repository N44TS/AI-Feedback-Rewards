import React, { useState } from 'react';
import './App.css';
import { connectWallet, rewardUser } from './eth';
import analyseFeedback from './AiAnalysis.js';
import RewardModal from './components/popup.js';
import emailjs from 'emailjs-com';


function App() {
  const [userAddress, setUserAddress] = useState('');
  const [signer, setSigner] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [isLoading, setIsLoading] = useState(false); // State to control loading spinner
  const [feedbackItems, setFeedbackItems] = useState([]); // State to hold feedback items
  const [isClaiming, setIsClaiming] = useState(false); // State to manage claiming process

  const handleConnectWallet = async () => {
    console.log("Attempting to connect wallet...");
    try {
      const { address, signer } = await connectWallet();
      console.log('Connect wallet response:', { address, signer });
      if (address) {
        setUserAddress(address);
        setSigner(signer);
        setIsWalletConnected(true);
        console.log('Wallet connected with address:', address);
      } else {
        console.log('No address returned, failed to connect wallet.');
        alert('Failed to connect wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please make sure your MetaMask is unlocked and you are connected to the correct network.');
    }
  };

  const handleSubmitFeedback = async (feedbackText) => {
    console.log("Submitting feedback:", feedbackText);
    const feedbackResult = await analyseFeedback(feedbackText);
    if (feedbackResult.isConstructive === 'no' && feedbackResult.suggestions.length > 0) {
      // Display suggestions to the user
      alert('Your feedback could be more constructive. Here are some suggestions:\n' + feedbackResult.suggestions.join('\n'));
    } else if (feedbackResult.isConstructive === 'yes') {
      setFeedbackSubmitted(true); // Only set to true if feedback is constructive
      setModalIsOpen(true); // Open the reward modal
    } else {
      alert('Feedback is not constructive enough. Please try again.');
    }
  }

  const handleRewardUser = async () => {
    setModalIsOpen(false); // Close the modal immediately
    setIsClaiming(true); // Show the spinner and "Claiming" text
    try {
      // Call the rewardUser function with the signer and userAddress
      await rewardUser(signer, userAddress);
      alert('Reward successful!');
    } catch (error) {
      console.error('Error rewarding user:', error);
      // Check if the error message contains "Submission limit reached"
      if (error.message.includes("Submission limit reached")) {
        alert('You have reached the submission limit.');
      } else {
        alert('Failed to claim reward. Please try again.');
      }
    } finally {
      setIsClaiming(false); // Hide the spinner and "Claiming" text
    }
  };
     
  return (
    <div>
      {isWalletConnected && (
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
          {`${userAddress.substring(0, 4)}...${userAddress.substring(userAddress.length - 5)}`}
        </div>
      )}
      {isClaiming && (
        <div className="claiming-container">
          <div className="spinner"></div>
          <p>Claiming...</p>
        </div>
      )}
      <>
        <div className="feedback-container">
          <h2>Give constructive feedback, get instantly rewarded!</h2>
          <p>Your feedback helps us improve. Please let us know what you think.</p>
          <p>Please share your constructive criticism, feature requests, or suggestions for improvement. Detailed feedback is especially appreciated and rewarded!</p>
          <textarea 
            placeholder="What feature would you like to see? How can we improve?" 
            value={feedbackText} 
            onChange={(e) => setFeedbackText(e.target.value)}
            style={{minHeight: '100px', minWidth: '300px'}}
          ></textarea>
          {!isWalletConnected && (
            <button onClick={handleConnectWallet}>
              Connect Wallet
            </button>
          )}
          {isWalletConnected && (
            <button 
              onClick={() => handleSubmitFeedback(feedbackText)}
              disabled={feedbackText.trim() === ''}
            >
              Submit Feedback
            </button>
          )}
        </div>    
        {/* <div>
          <h3>Recent Feedback</h3>
          {feedbackItems.map((item, index) => (
            <div key={index} className="feedback-item">
              {item}
            </div>
          ))}
        </div> */}
        <RewardModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} handleRewardUser={handleRewardUser} isLoading={isLoading}>
            <p>Thank you for the constructive feedback!</p>
            <button onClick={handleRewardUser} disabled={isLoading}>
              {isLoading ? 'Claiming...' : 'Claim Reward'}
            </button>
        </RewardModal>
      </>
    </div>
  );
}

export default App;

