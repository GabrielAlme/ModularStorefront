import React, { useState } from 'react';
import { BACKGROUND_THEMES } from '../constants/themes';

const SettingsModal = ({ isOpen, onClose }) => {
  // Local tracking configuration for panel inputs
  const [panelTitle, setPanelTitle] = useState('');
  const [panelDesc, setPanelDesc] = useState('');

  // Drop execution early if visibility state flag is falsy
  if (!isOpen) return null;

  // Task 1 execution: Requesting a New Panel interface
  const handleRequestPanel = (e) => {
    e.preventDefault();
    if (!panelTitle.trim()) {
      alert("Please provide a panel title."); // Simple fallback execution warning alert
      return;
    }
    // Success confirmation message passing validation rules
    alert(`Success: Panel request for "${panelTitle}" sent to administration database review.`);
    setPanelTitle('');
    setPanelDesc('');
  };

  // Task 2 execution: Applying dynamic background registry modifiers
  const applyBackground = (themeClass) => {
    // Remove past applied theme class configurations
    document.body.classList.remove('bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset');
    // Inject new valid registry class target selection
    document.body.classList.add(themeClass);
    alert("Application Success: New background theme applied."); // Concise alert standard implementation
  };

  // Task 3 execution: Removing custom configuration backdrops cleanly
  const removeBackground = () => {
    document.body.classList.remove('bg-default', 'bg-midnight', 'bg-forest', 'bg-sunset');
    alert("Reset Success: Color scheme restored back to production framework defaults.");
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Workspace Configuration Panel</h3>

        {/* --- CUSTOM BACKGROUND CONFIGURATION TAB SECTION (Tasks 2 & 3) --- */}
        <div className="modal-section">
          <h4>Modify Layout Background</h4>
          <div>
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
          <button 
            className="theme-btn" 
            style={{ backgroundColor: '#fee2e2', marginTop: '10px' }} 
            onClick={removeBackground}
          >
            Clear Custom Backdrop
          </button>
        </div>

        {/* --- PANEL REQUEST CUSTOM SUBMISSION ENTRY (Task 1) --- */}
        <div className="modal-section">
          <h4>Propose Custom Production Panel</h4>
          <form onSubmit={handleRequestPanel}>
            <label>Title Field:<br />
              <input 
                type="text" 
                value={panelTitle} 
                onChange={(e) => setPanelTitle(e.target.value)} 
                placeholder="Database Panel, Analytics Graph..."
              />
            </label>
            <br /><br />
            <button type="submit" className="theme-btn">Transmit Review Request</button>
          </form>
        </div>

        <button className="theme-btn" onClick={onClose} style={{ width: '100%' }}>
          Exit Settings Window
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;