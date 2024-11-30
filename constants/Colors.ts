// Base colors - the foundation of our color system
const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#F7F7F7',
    200: '#E6E6E6',
    300: '#CCCCCC',
    400: '#B3B3B3',
    500: '#999999',
    600: '#808080',
    700: '#666666',
    800: '#4D4D4D',
    900: '#333333',
  },
  // Main theme colors
  theme: {
    primary: '#A15A1C', // Main brand color
    secondary: '#2f95dc', // Current blue color
    accent: '#4A90E2', // Accent color for highlights and CTAs
  },
} as const;

// Semantic colors - how colors are used in the app
const semantic = {
  primary: palette.theme.primary,
  secondary: palette.theme.secondary,
  accent: palette.theme.accent,
  text: {
    primary: palette.white,
    secondary: palette.gray[300],
    inverse: palette.black,
  },
  background: {
    primary: palette.black,
    secondary: palette.gray[900],
    inverse: palette.white,
  },
  border: {
    light: palette.gray[200],
    dark: palette.gray[800],
  },
} as const;

// Common colors that don't change with theme
const common = {
  transparent: 'transparent',
  overlay: {
    light: 'rgba(0,0,0,0.8)',
    dark: 'rgba(0,0,0,0.9)',
  },
  gradient: {
    start: 'rgba(0,0,0,0)',
    middle: 'rgba(0,0,0,0.8)',
    end: 'rgba(0,0,0,0.9)',
  },
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FFCC00',
} as const;

// Theme-specific colors
const light = {
  text: semantic.text.inverse,
  background: semantic.background.inverse,
  tint: semantic.primary,
  tabIconDefault: palette.gray[400],
  tabIconSelected: semantic.primary,

  // Navigation
  navigationBackground: palette.white,
  navigationBorder: palette.gray[200],

  // Menu specific colors
  menuText: semantic.text.primary,
  menuTitle: semantic.text.primary,
  menuPrice: semantic.text.primary,
  menuLink: semantic.accent,

  // Form elements
  input: {
    background: palette.gray[100],
    text: palette.black,
    placeholder: palette.gray[500],
    border: palette.gray[300],
  },

  // Buttons
  button: {
    primary: semantic.primary,
    secondary: semantic.secondary,
    accent: semantic.accent,
    text: palette.white,
  },

  tabs: {
    background: semantic.primary,
    active: palette.white,
    inactive: 'rgba(255, 255, 255, 0.7)',
    border: 'transparent',
  },
} as const;

const dark = {
  text: semantic.text.primary,
  background: semantic.background.primary,
  tint: palette.white,
  tabIconDefault: palette.gray[600],
  tabIconSelected: palette.white,

  // Navigation
  navigationBackground: palette.black,
  navigationBorder: palette.gray[800],

  // Menu specific colors
  menuText: semantic.text.primary,
  menuTitle: semantic.text.primary,
  menuPrice: semantic.text.primary,
  menuLink: semantic.accent,

  // Form elements
  input: {
    background: palette.gray[900],
    text: palette.white,
    placeholder: palette.gray[500],
    border: palette.gray[700],
  },

  // Buttons
  button: {
    primary: semantic.primary,
    secondary: semantic.secondary,
    accent: semantic.accent,
    text: palette.white,
  },

  tabs: {
    background: semantic.primary,
    active: palette.white,
    inactive: 'rgba(255, 255, 255, 0.7)',
    border: 'transparent',
  },
} as const;

export default {
  light,
  dark,
  common,
  palette,
  semantic,
} as const;
