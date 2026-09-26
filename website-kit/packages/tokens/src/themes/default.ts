/** Semantic theme: maps colours/typography to CSS custom properties. */
export interface Theme {
  name: string;
  colors: {
    bg: string;
    fg: string;
    primary: string;
    primaryFg: string;
    muted: string;
    border: string;
  };
  fontFamily: {
    body: string;
    heading: string;
  };
}

export const defaultTheme: Theme = {
  name: "default",
  colors: {
    bg: "#ffffff",
    fg: "#0f172a",
    primary: "#2563eb",
    primaryFg: "#ffffff",
    muted: "#64748b",
    border: "#e2e8f0",
  },
  fontFamily: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
};

/** Emit a theme as `:root` CSS custom properties. */
export function themeToCss(theme: Theme): string {
  const c = theme.colors;
  return `:root{--color-bg:${c.bg};--color-fg:${c.fg};--color-primary:${c.primary};--color-primary-fg:${c.primaryFg};--color-muted:${c.muted};--color-border:${c.border};--font-body:${theme.fontFamily.body};--font-heading:${theme.fontFamily.heading};}`;
}
