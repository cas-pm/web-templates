/**
 * Base design tokens (theme-agnostic scales). Themes (themes/) map these onto
 * semantic CSS custom properties.
 */
export const space = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "4rem",
} as const;

export const fontSize = {
  sm: "0.875rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "3rem",
} as const;

export const radius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "1rem",
  full: "9999px",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export type Space = keyof typeof space;
export type FontSize = keyof typeof fontSize;
