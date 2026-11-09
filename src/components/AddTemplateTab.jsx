import React from 'react';
import { PRESET_WALLPAPERS, applyClassTheme, clearAllBackgrounds } from './themes';

const AddTemplateTab = ({ isOpen, onClose, onSelectTab }) => {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div id="config-modal-view" className="settings-modal" onClick={(e) => e.stopPropagation()}>
        {/* Left Steam-Style Navigation Column */}
        <nav className="settings-sidebar-nav">
          <div className="settings-sidebar-title">Settings</div>
          <button type="button" className="tab-btn" onClick={() => onSelectTab?.('customizer')}>
            <span>🎨</span>
            <span>Custom Background</span>
          </button>
          <button type="button" className="tab-btn active">
            <span>🖼️</span>
            <span>Add Template</span>
          </button>
          <button type="button" className="tab-btn" onClick={() => onSelectTab?.('request')}>
            <span>📥</span>
            <span>Request New Panel</span>
          </button>
        </nav>

        {/* Right Content Viewport */}
        <div className="settings-viewport">
          <div>
            <h3 className="settings-viewport-header">Add Template</h3>

            <div className="setting-group-card">
              <span className="setting-title">Canvas Controls</span>
              <p className="setting-description">
                Load an instantly ready production layout template below:
              </p>

              <div className="bg-wallpaper-grid">
                {PRESET_WALLPAPERS.map((preset) => (
                  <div
                    key={preset.id}
                    role="button"
                    tabIndex={0}
                    className={`wallpaper-card ${preset.className}`}
                    onClick={() => applyClassTheme(preset.className, preset.textColor)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        applyClassTheme(preset.className, preset.textColor);
                      }
                    }}
                  >
                    {preset.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="setting-group-card setting-row-between">
              <div>
                <span className="setting-title">Clear Custom Backdrop</span>
                <p className="setting-description">
                  Remove the active wallpaper template and restore default styling.
                </p>
              </div>
              <button type="button" className="theme-btn danger" onClick={clearAllBackgrounds}>
                Clear Custom Backdrop
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="button" className="theme-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplateTab;
