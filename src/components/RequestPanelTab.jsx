import React, { useState } from 'react';

const RequestPanelTab = ({ isOpen, onClose, onSelectTab }) => {
  const [panelTitle, setPanelTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  if (!isOpen) return null;

  const handleRequestPanel = (e) => {
    e.preventDefault();
    if (!panelTitle.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide a panel title.' });
      return;
    }
    setStatusMessage({
      type: 'success',
      text: `Success: Panel request for "${panelTitle.trim()}" sent to administration database review.`,
    });
    setPanelTitle('');
  };

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
          <button type="button" className="tab-btn" onClick={() => onSelectTab?.('presets')}>
            <span>🖼️</span>
            <span>Add Template</span>
          </button>
          <button type="button" className="tab-btn active">
            <span>📥</span>
            <span>Request New Panel</span>
          </button>
        </nav>

        {/* Right Content Viewport */}
        <div className="settings-viewport">
          <div>
            <h3 className="settings-viewport-header">Request New Panel</h3>

            <div className="setting-group-card">
              <form onSubmit={handleRequestPanel}>
                <label className="setting-title" htmlFor="panel-title-input">
                  Propose Custom Production Panel
                </label>
                <p className="setting-description" style={{ marginBottom: '12px' }}>
                  Submit a request for a new widget or panel module to be added to the registry.
                </p>

                <input
                  id="panel-title-input"
                  type="text"
                  className="image-url-field"
                  value={panelTitle}
                  onChange={(e) => {
                    setPanelTitle(e.target.value);
                    if (statusMessage.text) setStatusMessage({ type: '', text: '' });
                  }}
                  placeholder="Database Panel, Analytics Graph..."
                />

                <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="submit" className="theme-btn">
                    Transmit Review Request
                  </button>

                  {statusMessage.text && (
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: statusMessage.type === 'error' ? '#f87171' : '#66c0f4',
                      }}
                    >
                      {statusMessage.text}
                    </span>
                  )}
                </div>
              </form>
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

export default RequestPanelTab;
