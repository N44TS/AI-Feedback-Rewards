import React, { useState } from 'react';
import './App.css';
import { connectWallet, rewardUser, getFeedbackRewardsContract, addValidHashedToken } from './eth';
import analyseFeedback from './AiAnalysis.js';
import RewardModal from './components/popup.js';
import emailjs from 'emailjs-com';
import sha256 from 'crypto-js/sha256';
import qualifyImage from './images/QualifyButton.png';
import feedbackImage from './images/feedbackArrow.png';

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
  const [isQualified, setIsQualified] = useState(""); // State to track if the user is qualified to submit feedback
  const [isQualifying, setIsQualifying] = useState(false); // State to manage qualifying process

  const handleConnectWallet = async () => {
    try {
      const { address, signer } = await connectWallet();
      if (address && signer) {
        setUserAddress(address);
        setSigner(signer);
        setIsWalletConnected(true);
        return { wasConnected: true, signer };
      } else {
        return { wasConnected: false };
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return { wasConnected: false };
    }
  };

  const handleQualifyForFeedback = async () => {
    setIsQualifying(true); // Start of qualifying process
    let localSigner = signer;
    if (!isWalletConnected) {
      const connectionResult = await handleConnectWallet();
      if (!connectionResult.wasConnected) {
        console.log('Wallet connection failed or was cancelled by the user.');
        setIsQualifying(false); // Ensure to stop the spinner if wallet connection fails
        return;
      }
      localSigner = connectionResult.signer;
    }
    const token = new Date().toISOString();
    const hashedToken = "0x" + sha256(token).toString();
    localStorage.setItem('hashedToken', hashedToken);
    setIsQualified(true);
    console.log("Stored Hashed Token:", hashedToken);

    try {
      await addValidHashedToken(localSigner, hashedToken);
      alert("You're now qualified to submit feedback.");
    } catch (error) {
      console.error('Error adding valid hashed token:', error);
    } finally {
      setIsQualifying(false); // End of qualifying process
    }
  };

  const handleSubmitFeedback = async (feedbackText) => {
    const hashedToken = localStorage.getItem('hashedToken');
    if (!hashedToken) {
        alert('Please qualify for feedback submission by clicking the button.');
        return;
    }
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
    setIsClaiming(true); // Start of claiming process
    const hashedToken = localStorage.getItem('hashedToken');
    console.log("Retrieved Hashed Token:", hashedToken); // Added log
    if (!hashedToken) {
        alert('You are not qualified for feedback submission.');
        setIsClaiming(false); // Reset the claiming state
        return;
    }

    try {
      const feedbackRewards = getFeedbackRewardsContract(signer);
      const prefixedHashedToken = hashedToken.startsWith('0x') ? hashedToken : `0x${hashedToken}`;
      console.log("Prefixed Hashed Token:", prefixedHashedToken); // Added log
      const isTokenValid = await feedbackRewards.isHashedTokenValid(prefixedHashedToken);
      if (!isTokenValid) {
        alert('The provided token is not valid. Please try again.');
        setIsClaiming(false); // Reset the claiming state
        return;
      }
      await rewardUser(signer, userAddress, hashedToken);
      alert('Reward successful!');
      setModalIsOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error rewarding user:', error);
      alert('Failed to claim reward. Please try again.');
      setModalIsOpen(false); // Close modal on failure
    } finally {
      setIsClaiming(false); // Reset the claiming state
    }
  };
     
  return (
    <div>
       {isWalletConnected && (
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px', zIndex: 1000 }}>
          Connected: {`${userAddress.substring(0, 4)}...${userAddress.substring(userAddress.length - 5)}`}
        </div>
      )}
      <>
        <div className="feedback-container">
        <h1>Give Feedback. <br></br> Get <span style={{color: '#00bf63'}}>Paid</span>. </h1>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <p>Get instantly rewarded for your constructive criticism.</p>
          <img 
      src={feedbackImage} 
      alt="Feedback Arrow" 
      style={{ marginLeft: '100px', height: '170px', width: 'auto' }} // Adjust size and spacing as needed
    />
  </div>
          
          {/* <p>Please share your constructive criticism, feature requests, or suggestions for improvement. Detailed feedback is especially appreciated and rewarded!</p> */}
          <textarea 
            placeholder=
            "What feature would you like to see? How can we improve? Please share your constructive criticism, feature requests, or suggestions for improvement. Detailed feedback is especially appreciated and rewarded!" 
            value={feedbackText} 
            onChange={(e) => setFeedbackText(e.target.value)}
            style={{minHeight: '200px', minWidth: '300px'}}
          ></textarea>
          {!isWalletConnected && (
            <button onClick={handleConnectWallet}>
              Connect Wallet
            </button>
          )}
          {/* Image equivalent to the Qualify for Feedback button */}
      <div className="qualify-button-container" style={{ position: 'fixed', top: '20px', right: '20px' }}>
            <img 
              src={qualifyImage} 
              alt="Qualify for Feedback" 
              onClick={!isQualifying ? handleQualifyForFeedback : undefined} 
              style={{
                cursor: isQualifying ? 'default' : 'pointer',
                width: '500px',
                height: 'auto',
                position: 'fixed', 
                top: '20px', 
                right: '20px', 
                cursor: 'pointer'
              }}
            />
            {isQualifying && <div className="button-spinner-overlay"></div>}
          </div>


          {isWalletConnected && (
            <button 
              onClick={() => handleSubmitFeedback(feedbackText)}
              disabled={!isQualified || feedbackText.trim() === ''}
            >
              Submit Feedback
            </button>
          )}
          {isClaiming && <div className="button-spinner" style={{ marginTop: '10px' }}></div>}
        </div>    
        <RewardModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} handleRewardUser={handleRewardUser} isLoading={isLoading}>
            <p>Thank you for the constructive feedback!</p>
            <button onClick={handleRewardUser} disabled={isLoading}>
              {isLoading ? (
                <div className="button-spinner"></div>
              ) : (
                'Claim Reward'
              )}
            </button>
        </RewardModal>
      </>
    </div>
  );
}

export default App;