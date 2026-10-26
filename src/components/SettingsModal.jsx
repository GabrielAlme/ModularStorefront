import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  // Set the default tab to presets on this branch
  const [activeTab, setActiveTab] = useState('presets');

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
        element.classList.remove(
          'bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset',
          'bg-tech-blueprint', 'bg-dark-mesh', 'bg-soft-gradient'
        );
      }
    });
  };

  const applyPresetWallpaper = (wallpaperClass) => {
    clearAllBackgrounds();
    const targets = [
      document.body,
      document.querySelector('.app'),
      document.querySelector('.ws'),
      document.querySelector('.workspace')
    ];
    targets.forEach(element => {
      if (element) {
        element.classList.add(wallpaperClass);
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
            disabled
          >
            🎨 Custom Background
          </button>
          <button 
            className={`tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            🖼️ Add Template
          </button>
          <button 
            className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
            disabled
          >
            📥 Request New Panel
          </button>
        </div>

        {/* --- TAB CONTENT VIEWPORT PANELS --- */}
        {activeTab === 'presets' && (
          <div className="tab-panel">
            <div className="modal-section">
              <h4>Canvas Controls</h4>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                Load an instantly ready production layout template below:
              </p>
              
              <div className="bg-wallpaper-grid">
                <div 
                  className="wallpaper-card bg-tech-blueprint" 
                  onClick={() => applyPresetWallpaper('bg-tech-blueprint')}
                >
                  Abstract
                </div>
                <div 
                  className="wallpaper-card bg-dark-mesh" 
                  onClick={() => applyPresetWallpaper('bg-dark-mesh')}
                >
                  Ocean
                </div>
                <div 
                  className="wallpaper-card bg-soft-gradient" 
                  onClick={() => applyPresetWallpaper('bg-soft-gradient')}
                >
                  Gradient
                </div>
              </div>

              <button 
                className="theme-btn" 
                style={{ backgroundColor: '#fee2e2', width: '100%', marginTop: '5px' }} 
                onClick={clearAllBackgrounds}
              >
                Clear Custom Backdrop
              </button>
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
