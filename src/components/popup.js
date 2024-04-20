import React from 'react';
import '../App.css';

function RewardModal({ isOpen, onClose, children, isLoading, handleRewardUser }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <p>Thank you for your feedback! Claim your reward below.</p>
      <div className="button-container">
        <button onClick={handleRewardUser} disabled={isLoading}>
          "Claim Reward"
        </button>
        {isLoading && <div className="button-spinner"></div>}
      </div>
    </div>
  );
}

export default RewardModal;