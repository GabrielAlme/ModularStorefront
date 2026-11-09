// Registry of basic color themes used by CustomBackgroundTab
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

// Registry of curated gradient templates used by AddTemplateTab
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

// Calculates perceived brightness so custom hex colors get readable text automatically
function getContrastTextColor(hexColor) {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 135 ? '#111111' : '#f8fafc';
}

// Updates root CSS custom properties dynamically
function setWorkspaceTheme(backgroundValue, textColorValue) {
  document.documentElement.style.setProperty('--workspace-bg', backgroundValue);
  document.documentElement.style.setProperty('--workspace-text', textColorValue);
}

// Resets workspace CSS variables back to default cream and dark charcoal text
export function clearAllBackgrounds() {
  setWorkspaceTheme('#F2EBDD', '#111111');
}

// Applies any theme or gradient object from themes.js
export function applyThemePreset(background, textColor = '#111111') {
  setWorkspaceTheme(background, textColor);
}

// Applies a custom solid hex color and calculates readable text contrast
export function applyCustomColor(hexColor) {
  const readableText = getContrastTextColor(hexColor);
  setWorkspaceTheme(hexColor, readableText);
}

// Applies a direct image URL as a centered, full-cover background
export function applyCustomImage(imageUrl) {
  setWorkspaceTheme(`url('${imageUrl}') center/cover no-repeat`, '#111111');
}
