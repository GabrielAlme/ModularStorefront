import React from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Task execution: Safely clear previous custom body styles before injecting image sets
  const clearAllBackgrounds = () => {
    document.body.classList.remove(
      'bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset',
      'bg-tech-blueprint', 'bg-dark-mesh', 'bg-soft-gradient'
    );
  };

  // Task execution: Apply a specific preset asset backdrop class to the document tree
  const applyPresetWallpaper = (wallpaperClass) => {
    clearAllBackgrounds();
    document.body.classList.add(wallpaperClass);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Workspace Quick Templates</h3>
        
        <div className="modal-section">
          <h4>Canvas Controls</h4>
          <p style={{ fontSize: '0.85rem', color: '#555' }}>
            Load an instantly ready production layout template below:
          </p>
          
          {/* Wallpaper Asset Thumbnail Flex Grid Selection */}
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

        <button className="theme-btn" onClick={onClose} style={{ width: '100%' }}>
          Close Panel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;