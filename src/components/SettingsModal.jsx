import React from 'react';
// Import the centralized color registry file located in your main src root
import { BACKGROUND_THEMES } from '../themes.js'; 

const SettingsModal = ({ isOpen, onClose }) => {
  // Drop execution early if visibility toggle state flag is falsy
  if (!isOpen) return null;

  // Task execution: Injecting a dynamic background class modifier to mutate the core root backdrop
  const applyBackground = (themeClass) => {
    // Clear out any previously injected registry backdrop definitions safely
    document.body.classList.remove('bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset');
    // Inject the new active choice theme token rule
    document.body.classList.add(themeClass);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Workspace Canvas Customization</h3>
        
        <div className="modal-section">
          <h4>Select Theme Template</h4>
          <div>
            {/* Loop through your centralized registry dynamically */}
            {Object.values(BACKGROUND_THEMES).map((theme) => (
              <button 
                key={theme.id} 
                className="theme-btn"
                onClick={() => applyBackground(theme.className)}
              >
                {theme.title}
              </button>
            ))}
          </div>
        </div>

        <button className="theme-btn" onClick={onClose} style={{ width: '100%' }}>
          Close Panel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;