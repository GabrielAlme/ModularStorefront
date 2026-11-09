import React, { useState } from 'react';
import CustomBackgroundTab from './CustomBackgroundTab';
import AddTemplateTab from './AddTemplateTab';
import RequestPanelTab from './RequestPanelTab';

const Sidebar = () => {
  // Tracks whether the settings overlay is open
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Set default tab per branch: 'presets' (AddBackground), 'customizer' (CreateNewBackground), or 'request' (RequestPanel)
  const [activeTab, setActiveTab] = useState('presets');

  // Helper to close the modal and reset back to this branch's default tab
  const handleClose = () => {
    setIsSettingsOpen(false);
    setActiveTab('presets'); // Match the default tab above
  };

  return (
    <div className="sidebar">
      <div>This is empty for now</div>

      {/* Trigger button that opens the Steam-style settings window */}
      <button
        type="button"
        className="sidebar-settings-btn"
        onClick={() => setIsSettingsOpen(true)}
      >
        ⚙️ Settings Manager
      </button>

      {/* Renders whichever standalone tab component is currently active */}
      {activeTab === 'customizer' && (
        <CustomBackgroundTab
          isOpen={isSettingsOpen}
          onClose={handleClose}
          onSelectTab={setActiveTab}
        />
      )}

      {activeTab === 'presets' && (
        <AddTemplateTab
          isOpen={isSettingsOpen}
          onClose={handleClose}
          onSelectTab={setActiveTab}
        />
      )}

      {activeTab === 'request' && (
        <RequestPanelTab
          isOpen={isSettingsOpen}
          onClose={handleClose}
          onSelectTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Sidebar;
