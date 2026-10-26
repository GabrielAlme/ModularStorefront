import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  // Navigation State Tracker: Default active tab set to 'request' on this branch
  const [activeTab, setActiveTab] = useState('request');
  const [panelTitle, setPanelTitle] = useState('');

  if (!isOpen) return null;

  const handleRequestPanel = (e) => {
    e.preventDefault();
    if (!panelTitle.trim()) {
      alert("Please provide a panel title.");
      return;
    }
    alert(`Success: Panel request for "${panelTitle}" sent to administration database review.`);
    setPanelTitle('');
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div id="config-modal-view" className="settings-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* --- MODAL TAB BAR CONTROLLER SYSTEM --- */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'customizer' ? 'active' : ''}`}
            disabled
          >
            🎨 Custom Background
          </button>
          <button 
            className={`tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
            disabled
          >
            🖼️ Add Template
          </button>
          <button 
            className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            📥 Request New Panel
          </button>
        </div>

        {/* --- TAB CONTENT VIEWPORT PANELS --- */}
        {activeTab === 'request' && (
          <div className="tab-panel">
            <div className="modal-section">
              <h4>Propose Custom Production Panel</h4>
              <form onSubmit={handleRequestPanel}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Title Field:
                </label>
                <input 
                  type="text" 
                  value={panelTitle} 
                  onChange={(e) => setPanelTitle(e.target.value)} 
                  placeholder="Database Panel, Analytics Graph..."
                  style={{ width: '90%', padding: '0.5rem', border: '1px solid black', borderRadius: '8px' }}
                />
                <br /><br />
                <button type="submit" className="theme-btn" style={{ margin: '0' }}>
                  Transmit Review Request
                </button>
              </form>
            </div>
          </div>
        )}

        <button className="theme-btn" onClick={onClose} style={{ width: '100%', marginTop: '15px' }}>
          Close Panel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
