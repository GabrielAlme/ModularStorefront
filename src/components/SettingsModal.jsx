import React from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Task execution: Safely stripping active body modifiers to drop canvas back to system baselines
  const removeBackground = () => {
    document.body.classList.remove('bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset');
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Workspace Background Options</h3>
        
        <div className="modal-section">
          <h4>Canvas Controls</h4>
          <button 
            className="theme-btn" 
            style={{ backgroundColor: '#fee2e2' }} 
            onClick={removeBackground}
          >
            Clear Custom Backdrop
          </button>
        </div>

        <button className="theme-btn" onClick={onClose} style={{ width: '100%' }}>
          Close Panel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;