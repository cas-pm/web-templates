import type { Theme } from "./default.js";

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    bg: "#0f172a",
    fg: "#f8fafc",
    primary: "#60a5fa",
    primaryFg: "#0f172a",
    muted: "#94a3b8",
    border: "#1e293b",
  },
  fontFamily: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
};

// TODO: add per-client themes here (or generate from brand colours).
