import React, { useState } from 'react';
import {
  BACKGROUND_THEMES,
  applyThemePreset,
  applyCustomColor,
  applyCustomImage,
  clearAllBackgrounds,
} from './themes';

const CustomBackgroundTab = ({ isOpen, onClose, onSelectTab }) => {
  const [customBgColor, setCustomBgColor] = useState('#F2EBDD');
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!isOpen) return null;

  const handleCustomColorChange = (e) => {
    const newHexValue = e.target.value;
    setCustomBgColor(newHexValue);
    applyCustomColor(newHexValue);
  };

  const handleCustomImageSubmit = (e) => {
    e.preventDefault();
    if (!customImageUrl.trim()) return;
    applyCustomImage(customImageUrl.trim());
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div id="config-modal-view" className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <nav className="settings-sidebar-nav">
          <div className="settings-sidebar-title">Settings</div>
          <button type="button" className="tab-btn active">
            <span>🎨</span>
            <span>Custom Background</span>
          </button>
          <button type="button" className="tab-btn" onClick={() => onSelectTab?.('presets')}>
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
            <h3 className="settings-viewport-header">Custom Background</h3>

            <div className="setting-group-card">
              <span className="setting-title">Basic Themes</span>
              <p className="setting-description" style={{ marginBottom: '12px' }}>
                Select a built-in palette theme for your workspace.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.values(BACKGROUND_THEMES).map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className="theme-btn"
                    onClick={() => applyThemePreset(theme.background, theme.textColor)}
                  >
                    {theme.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group-card setting-row-between">
              <div>
                <span className="setting-title">Solid Background Tone</span>
                <p className="setting-description">
                  Choose any custom color; workspace text updates automatically for readability.
                </p>
              </div>
              <input
                type="color"
                className="color-input-circle"
                value={customBgColor}
                onChange={handleCustomColorChange}
                aria-label="Solid background tone"
              />
            </div>

            <div className="setting-group-card">
              <form onSubmit={handleCustomImageSubmit}>
                <label className="setting-title" htmlFor="custom-image-url">
                  Custom Background Image URL
                </label>
                <p className="setting-description" style={{ marginBottom: '10px' }}>
                  Paste a direct HTTPS link to an image to set as your backdrop.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="custom-image-url"
                    type="text"
                    className="image-url-field"
                    placeholder="Paste direct image URL (https://...)"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                  />
                  <button type="submit" className="theme-btn">
                    Apply Image
                  </button>
                </div>
              </form>
            </div>

            <div className="setting-group-card setting-row-between">
              <div>
                <span className="setting-title">Reset Appearance</span>
                <p className="setting-description">Restore the default cream background.</p>
              </div>
              <button type="button" className="theme-btn danger" onClick={clearAllBackgrounds}>
                Reset Default
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

export default CustomBackgroundTab;
