import React, { useState } from 'react';
import './Settings.css';

// Feature 1: Custom Background (CreateNewBackground branch)

// Feature 2: Add Template (AddBackground branch)

// Feature 3: Request New Panel (RequestPanel branch)
import RequestPanelTab from './RequestPanelTab';

const Sidebar = () => {
  // Controls whether the settings modal overlay is visible
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="sidebar">
      <div>This is empty for now</div>

      {/* Icon-only settings trigger button sized via --settings-icon-size */}
      <button
        type="button"
        className="sidebar-settings-btn"
        onClick={() => setIsSettingsOpen(true)}
        aria-label="Settings"
        title="Settings"
      >
        ⚙️
      </button>

      {/* Feature 1 Modal */}

      {/* Feature 2 Modal */}

      {/* Feature 3 Modal */}
      <RequestPanelTab
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
