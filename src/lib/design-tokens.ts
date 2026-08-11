// ============================================================
// HACKER HOUSE GOA 2026 — Design Tokens
// ============================================================

export const colors = {
  goaGreen: '#1E5B3A',
  goaGreenDark: '#163D28',
  goaGreenDeep: '#0F2E1D',
  cream: '#F6F0D8',
  creamLight: '#FAF7ED',
  creamDark: '#E8DFC4',
  sunYellow: '#F5DD3B',
  sunYellowDark: '#D4BE1F',
  hotPink: '#E62E78',
  hotPinkDark: '#C41E62',
  darkInk: '#17251C',
  darkInkLight: '#1F3326',
  white: '#FFFFFF',
  offWhite: '#FAFAF5',
  black: '#0A0A0A',
  overlay: 'rgba(30, 91, 58, 0.85)',
} as const;

export const typography = {
  display: {
    family: '"Bodoni Moda", "DM Serif Display", Georgia, serif',
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },
  mono: {
    family: '"IBM Plex Mono", "JetBrains Mono", "Courier New", monospace',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
  section: '6rem',
  sectionMobile: '3rem',
} as const;

export const shadows = {
  card: '4px 4px 0px rgba(23, 37, 28, 0.2)',
  cardHover: '6px 6px 0px rgba(23, 37, 28, 0.25)',
  sign: '3px 3px 0px rgba(23, 37, 28, 0.3)',
  button: '2px 2px 0px rgba(23, 37, 28, 0.2)',
  buttonPress: '1px 1px 0px rgba(23, 37, 28, 0.2)',
  frame: '0 8px 32px rgba(23, 37, 28, 0.3)',
} as const;

export const borders = {
  thin: '1px solid',
  medium: '2px solid',
  thick: '3px solid',
  heavy: '4px solid',
} as const;

export const animation = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '800ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;
