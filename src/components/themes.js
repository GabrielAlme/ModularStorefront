// Registry of basic color themes rendered dynamically by CustomBackgroundTab.
// Storing themes as data objects makes adding new colors effortless without touching JSX or CSS.
export const BACKGROUND_THEMES = {
  default: {
    id: 'default',
    title: 'Default Cream',
    background: '#F2EBDD',
    textColor: '#111111',
  },
  midnight: {
    id: 'midnight',
    title: 'Midnight Slate',
    background: '#1E293B',
    textColor: '#111111',
  },
  forest: {
    id: 'forest',
    title: 'Mint Forest',
    background: '#D1FAE5',
    textColor: '#111111',
  },
  sunset: {
    id: 'sunset',
    title: 'Warm Sunset',
    background: '#FFEDD5',
    textColor: '#111111',
  },
};

// Registry of curated gradient templates rendered dynamically by AddTemplateTab.
export const PRESET_WALLPAPERS = [
  {
    id: 'blueprint',
    title: 'Abstract',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
    textColor: '#111111',
  },
  {
    id: 'ocean',
    title: 'Ocean',
    background: 'linear-gradient(135deg, #0d9488 0%, #111827 100%)',
    textColor: '#111111',
  },
  {
    id: 'gradient',
    title: 'Gradient',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    textColor: '#111111',
  },
];

// Calculates perceived brightness using the standard YIQ luminance formula.
// Ensures custom hex colors always pair with readable dark or light text.
function getContrastTextColor(hexColor) {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 135 ? '#111111' : '#f8fafc';
}

// Updates global CSS custom properties on :root so the entire workspace, navbar,
// and body update reactively without manual DOM class manipulation.
function setWorkspaceTheme(backgroundValue, textColorValue) {
  document.documentElement.style.setProperty('--workspace-bg', backgroundValue);
  document.documentElement.style.setProperty('--workspace-text', textColorValue);
}

// Restores the default cream background and dark charcoal text.
export function clearAllBackgrounds() {
  setWorkspaceTheme('#F2EBDD', '#111111');
}

// Applies any preset theme or gradient object from the registries above.
export function applyThemePreset(background, textColor = '#111111') {
  setWorkspaceTheme(background, textColor);
}

// Applies a user-selected hex color and automatically sets readable text contrast.
export function applyCustomColor(hexColor) {
  const readableText = getContrastTextColor(hexColor);
  setWorkspaceTheme(hexColor, readableText);
}

// Applies a direct HTTPS image URL as a centered, full-cover workspace backdrop.
export function applyCustomImage(imageUrl) {
  setWorkspaceTheme(`url('${imageUrl}') center/cover no-repeat`, '#111111');
}
