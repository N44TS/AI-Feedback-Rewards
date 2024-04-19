import React from 'react';

function RewardModal({ isOpen, onClose, children, isLoading, handleRewardUser }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#16171a', padding: '20px', zIndex: 1000, border: '2px solid #0084ff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
      <p>Thank you for your feedback! Claim your reward below.</p>
      <button onClick={handleRewardUser} disabled={isLoading}>
        {isLoading ? 'Claiming...' : 'Claim Reward'}
      </button>
    </div>
  );
}

export default RewardModal;