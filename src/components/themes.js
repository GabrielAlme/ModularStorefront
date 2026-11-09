// Registry of basic color themes used by CustomBackgroundTab
export const BACKGROUND_THEMES = {
  default: {
    id: 'default',
    title: 'Default Cream',
    className: 'bg-default',
    textColor: '#111111',
  },
  midnight: {
    id: 'midnight',
    title: 'Midnight Slate',
    className: 'bg-midnight',
    textColor: '#f8fafc',
  },
  forest: {
    id: 'forest',
    title: 'Mint Forest',
    className: 'bg-forest',
    textColor: '#111111',
  },
  sunset: {
    id: 'sunset',
    title: 'Warm Sunset',
    className: 'bg-sunset',
    textColor: '#111111',
  },
};

// Registry of curated gradient templates used by AddTemplateTab
export const PRESET_WALLPAPERS = [
  {
    id: 'blueprint',
    title: 'Abstract',
    className: 'bg-tech-blueprint',
    textColor: '#f8fafc',
  },
  {
    id: 'ocean',
    title: 'Ocean',
    className: 'bg-dark-mesh',
    textColor: '#f8fafc',
  },
  {
    id: 'gradient',
    title: 'Gradient',
    className: 'bg-soft-gradient',
    textColor: '#f8fafc',
  },
];

// Dynamically builds the list of all CSS theme classes from the registries above
const ALL_THEME_CLASSES = [
  ...Object.values(BACKGROUND_THEMES).map((t) => t.className),
  ...PRESET_WALLPAPERS.map((p) => p.className),
];

// Helper to select the main workspace layout containers
function getLayoutTargets() {
  return [
    document.body,
    document.querySelector('.app'),
    document.querySelector('.ws'),
    document.querySelector('.workspace'),
  ].filter(Boolean);
}

// Calculates perceived brightness (YIQ formula) so custom colors get readable text automatically
function getContrastTextColor(hexColor) {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 135 ? '#111111' : '#f8fafc';
}

// Clears all active background classes, custom inline styles, and resets text color to dark charcoal
export function clearAllBackgrounds() {
  getLayoutTargets().forEach((element) => {
    element.classList.remove(...ALL_THEME_CLASSES);
    element.style.background = '';
  });

  // Fixes the white-text bug by resetting the CSS text variable back to dark charcoal
  document.documentElement.style.setProperty('--workspace-text', '#111111');
}

// Applies a registered CSS theme class and sets its corresponding text contrast variable
export function applyClassTheme(className, textColor = '#111111') {
  clearAllBackgrounds();
  getLayoutTargets().forEach((element) => {
    element.classList.add(className);
  });
  document.documentElement.style.setProperty('--workspace-text', textColor);
}

// Applies a custom solid hex color and dynamically calculates dark or light text contrast
export function applyCustomColor(hexColor) {
  clearAllBackgrounds();
  getLayoutTargets().forEach((element) => {
    element.style.background = hexColor;
  });
  const readableText = getContrastTextColor(hexColor);
  document.documentElement.style.setProperty('--workspace-text', readableText);
}

// Applies a direct image URL as a centered, full-cover background
export function applyCustomImage(imageUrl) {
  clearAllBackgrounds();
  getLayoutTargets().forEach((element) => {
    element.style.background = `url('${imageUrl}') center/cover no-repeat`;
  });
  document.documentElement.style.setProperty('--workspace-text', '#111111');
}
