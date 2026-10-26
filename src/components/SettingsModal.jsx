import React, { useState } from 'react';
import { BACKGROUND_THEMES } from './themes.js'; 

const SettingsModal = ({ isOpen, onClose }) => {
  // Navigation State Tracker: Controls which workspace view pane is rendering
  const [activeTab, setActiveTab] = useState('customizer');
  
  // Custom Customizer Inputs States
  const [customBgColor, setCustomBgColor] = useState('#F2EBDD');
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!isOpen) return null;

  const clearAllBackgrounds = () => {
    const targets = [
      document.body,
      document.querySelector('.app'),
      document.querySelector('.ws'),
      document.querySelector('.workspace')
    ];
    targets.forEach(element => {
      if (element) {
        element.classList.remove('bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset');
        element.style.background = '';
      }
    });
  };

  const applyPresetTheme = (themeClass) => {
    clearAllBackgrounds();
    const targets = [
      document.body,
      document.querySelector('.app'),
      document.querySelector('.ws'),
      document.querySelector('.workspace')
    ];
    targets.forEach(element => {
      if (element) {
        element.classList.add(themeClass);
      }
    });
  };

  const handleCustomColorChange = (newHexValue) => {
    setCustomBgColor(newHexValue);
    clearAllBackgrounds();
    const targets = [
      document.body,
      document.querySelector('.app'),
      document.querySelector('.ws'),
      document.querySelector('.workspace')
    ];
    targets.forEach(element => {
      if (element) {
        element.style.background = newHexValue;
      }
    });
  };

  const handleCustomImageSubmit = (e) => {
    e.preventDefault();
    if (!customImageUrl.trim()) return;
    clearAllBackgrounds();
    const targets = [
      document.body,
      document.querySelector('.app'),
      document.querySelector('.ws'),
      document.querySelector('.workspace')
    ];
    targets.forEach(element => {
      if (element) {
        element.style.background = `url('${customImageUrl}') center/cover no-repeat`;
      }
    });
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div id="config-modal-view" className="settings-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* --- MODAL TAB BAR CONTROLLER SYSTEM --- */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'customizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('customizer')}
          >
            🎨 Custom Background
          </button>
          <button 
            className={`tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
            disabled // Locked on this branch; handled in AddBackground branch
          >
            🖼️ Add Template
          </button>
          <button 
            className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
            disabled // Locked on this branch; handled in RequestPanel branch
          >
            📥 Request New Panel
          </button>
        </div>

        {/* --- TAB CONTENT VIEWPORT PANELS --- */}
        {activeTab === 'customizer' && (
          <div className="tab-panel">
            {/* Palette Presets */}
            <div className="modal-section">
              <h4>Basic Themes</h4>
              <div>
                {Object.values(BACKGROUND_THEMES).map((theme) => (
                  <button 
                    key={theme.id} 
                    className="theme-btn"
                    onClick={() => applyPresetTheme(theme.className)}
                  >
                    {theme.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive Settings */}
            <div className="modal-section">
              <h4>Advanced Options</h4>
              <div className="customizer-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Solid Background Tone:</label>
                <input 
                  type="color" 
                  className="color-input-circle"
                  value={customBgColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                />
              </div>

              <form onSubmit={handleCustomImageSubmit} className="image-input-row" style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'block' }}>Custom Background Image URL:</label>
                <input 
                  type="text"
                  className="image-url-field"
                  placeholder="Paste direct image URL (https://...)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                />
                <button type="submit" className="theme-btn" style={{ margin: '8px 0 0 0', width: 'fit-content' }}>
                  Apply Image
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
