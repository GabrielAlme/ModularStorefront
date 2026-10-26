import React, { useState } from 'react'; // ADDED: Import state hook to track modal open/close
import SettingsModal from './SettingsModal'; // ADDED: Import your unified settings panel

const Sidebar = () => {
  // ADDED: State variable controlling whether the configuration panel is visible
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="sidebar">
      <div>This is empty for now</div>
      
      {/* ADDED: Reusable custom trigger button that activates the overlay visibility */}
      <button 
        className="sidebar-settings-btn" 
        onClick={() => setIsSettingsOpen(true)}
      >
        ⚙️ Settings Manager
      </button>

      {/* ADDED: The modal container itself, passing down state control variables safely */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  )
}

export default Sidebar;