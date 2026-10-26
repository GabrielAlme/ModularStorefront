import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  // Capture local state entry isolated cleanly inside the local component scope
  const [panelTitle, setPanelTitle] = useState('');

  if (!isOpen) return null;

  // Task execution: Validating text inputs and firing a clean execution warning or success notification
  const handleRequestPanel = (e) => {
    e.preventDefault();
    if (!panelTitle.trim()) {
      alert("Please provide a panel title."); // Simple fallback execution warning alert
      return;
    }
    // Execution confirmation handling user notification patterns simply
    alert(`Success: Panel request for "${panelTitle}" sent to administration database review.`);
    setPanelTitle('');
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Propose Workspace Additions</h3>
        
        <div className="modal-section">
          <h4>Propose Custom Production Panel</h4>
          <form onSubmit={handleRequestPanel}>
            <label>Title Field:<br /><br />
              <input 
                type="text" 
                value={panelTitle} 
                onChange={(e) => setPanelTitle(e.target.value)} 
                placeholder="Database Panel, Analytics Graph..."
                style={{ width: '90%', padding: '0.5rem', borderRadius: '8px' }}
              />
            </label>
            <br /><br />
            <button type="submit" className="theme-btn">Transmit Review Request</button>
          </form>
        </div>

        <button className="theme-btn" onClick={onClose} style={{ width: '100%' }}>
          Close Panel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;