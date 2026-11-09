import React from 'react';
import { PRESET_WALLPAPERS, applyThemePreset, clearAllBackgrounds } from './themes';

const AddTemplateTab = ({ isOpen, onClose, onSelectTab }) => {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div id="config-modal-view" className="settings-modal" onClick={(e) => e.stopPropagation()}>
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
                    className="wallpaper-card"
                    style={{ background: preset.background }}
                    onClick={() => applyThemePreset(preset.background, preset.textColor)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        applyThemePreset(preset.background, preset.textColor);
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
