import { useEffect, useState } from 'react';
import { useAuth } from '../authorization';

// New building-block panels for the workshop: a Text Box (with font controls) and a Button.
// This is a NEW file, so it does not change anyone else's code.
//
// MosaicWorkspace can pass each panel a "panelId" prop. When it does, a panel remembers its
// settings in this browser (per logged-in user). Without it, the panel still works but
// forgets its settings when the page reloads.
//
// To add another element later, write a component below and add one line to NEW_PANELS.

// Fonts that exist on every computer, so nothing has to be downloaded.
const FONTS = [
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Trebuchet', value: '"Trebuchet MS", sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
  { label: 'Impact', value: 'Impact, Haettenschweiler, sans-serif' },
];

const SIZES = [12, 14, 16, 18, 24, 32, 48, 64];

// Like useState, but saves to localStorage when the panel has an id.
// Returns [settings, update] where update({ key: newValue }) changes just those settings.
function usePanelState(panelId, defaults) {
  const auth = useAuth();
  const key = panelId != null ? `panel-data:${auth?.user?.id ?? 'guest'}:${panelId}` : null;

  const [state, setState] = useState(() => {
    if (!key) return defaults;
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(key)) };
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    if (!key) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage full or blocked, the panel just won't remember this time
    }
  }, [key, state]);

  const update = (patch) => setState((prev) => ({ ...prev, ...patch }));
  return [state, update];
}

const styles = {
  panel: { display: 'flex', flexDirection: 'column', gap: 8, padding: 8, boxSizing: 'border-box', height: '100%' },
  toolbar: { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  textarea: { flex: 1, minHeight: 120, width: '100%', boxSizing: 'border-box', resize: 'vertical' },
};

// ---------- Text Box: type text, pick the font, size, bold, italic and color ----------
export function TextBoxPanel({ panelId }) {
  const [box, update] = usePanelState(panelId, {
    text: '',
    font: FONTS[0].value,
    size: 16,
    bold: false,
    italic: false,
    color: '#000000',
  });

  return (
    <div style={styles.panel}>
      <div style={styles.toolbar}>
        <select value={box.font} onChange={(e) => update({ font: e.target.value })}>
          {FONTS.map((f) => (
            <option key={f.label} value={f.value}>{f.label}</option>
          ))}
        </select>
        <select value={box.size} onChange={(e) => update({ size: Number(e.target.value) })}>
          {SIZES.map((s) => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => update({ bold: !box.bold })}
          style={{ fontWeight: 'bold', opacity: box.bold ? 1 : 0.5 }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => update({ italic: !box.italic })}
          style={{ fontStyle: 'italic', opacity: box.italic ? 1 : 0.5 }}
        >
          I
        </button>
        <input type="color" value={box.color} onChange={(e) => update({ color: e.target.value })} />
      </div>
      <textarea
        value={box.text}
        placeholder="Type here..."
        onChange={(e) => update({ text: e.target.value })}
        style={{
          ...styles.textarea,
          fontFamily: box.font,
          fontSize: box.size,
          fontWeight: box.bold ? 'bold' : 'normal',
          fontStyle: box.italic ? 'italic' : 'normal',
          color: box.color,
        }}
      />
    </div>
  );
}

// ---------- Button: set the label, a link, and the colors ----------
export function ButtonPanel({ panelId }) {
  const [btn, update] = usePanelState(panelId, {
    label: 'Click me',
    url: '',
    color: '#2563eb',
    textColor: '#ffffff',
  });

  // Only real web links are allowed (blocks things like "javascript:...")
  const link = btn.url.trim();
  const validUrl = /^https?:\/\//i.test(link);

  const look = {
    background: btn.color,
    color: btn.textColor,
    padding: '10px 20px',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: validUrl ? 'pointer' : 'default',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div style={styles.panel}>
      <div style={{ textAlign: 'center', padding: 12 }}>
        {validUrl ? (
          <a href={link} target="_blank" rel="noopener noreferrer" style={look}>
            {btn.label || 'Button'}
          </a>
        ) : (
          <button type="button" style={look}>{btn.label || 'Button'}</button>
        )}
        {!validUrl && <p style={{ fontSize: 12, opacity: 0.6 }}>Add a link starting with https:// to make it clickable</p>}
      </div>
      <div style={styles.toolbar}>
        <label>Label <input value={btn.label} onChange={(e) => update({ label: e.target.value })} /></label>
        <label>Link <input value={btn.url} placeholder="https://..." onChange={(e) => update({ url: e.target.value })} /></label>
        <label>Color <input type="color" value={btn.color} onChange={(e) => update({ color: e.target.value })} /></label>
        <label>Text <input type="color" value={btn.textColor} onChange={(e) => update({ textColor: e.target.value })} /></label>
      </div>
    </div>
  );
}

// Add new elements here. The numbers only need to be unique across ALL panels, so these start
// at 101 to stay clear of the numbers used in registry.js. Never reuse or renumber one,
// because saved workspaces remember panels by number.
export const NEW_PANELS = {
  101: { title: 'Text Box', component: TextBoxPanel },
  102: { title: 'Button', component: ButtonPanel },
};
