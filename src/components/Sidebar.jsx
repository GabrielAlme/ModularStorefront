import React, { useState } from 'react';
import './Settings.css';

// Feature 1: Custom Background (CreateNewBackground branch)
import CustomBackgroundTab from './CustomBackgroundTab';

// Feature 2: Add Template (AddBackground branch)
import AddTemplateTab from './AddTemplateTab';

// Feature 3: Request New Panel (RequestPanel branch)
import RequestPanelTab from './RequestPanelTab';

const Sidebar = () => {
  // Controls whether the settings modal overlay is visible
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="sidebar">

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
<CustomBackgroundTab
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      {/* Feature 2 Modal */}
      <AddTemplateTab
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      {/* Feature 3 Modal */}
      <RequestPanelTab
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

    </div>
  );
};

export default Sidebar;
