/**
 * insights-portal display config. Two modes, switched here (or via env):
 *   - "links":     a static list of report links
 *   - "dashboard": an in-page dashboard rendering the report
 *
 * The portal NEVER shows individual visitor identities — only aggregates
 * returned by insights-api.
 */
export type PortalMode = "links" | "dashboard";

export interface PortalConfig {
  mode: PortalMode;
  /** Base URL of insights-api (server-side fetch). */
  apiBaseUrl: string;
}

export function loadPortalConfig(env: Record<string, string | undefined> = import.meta.env): PortalConfig {
  const mode = env.PUBLIC_PORTAL_MODE === "dashboard" ? "dashboard" : "links";
  return {
    mode,
    // TODO: point at the deployed insights-api.
    apiBaseUrl: env.INSIGHTS_API_URL ?? "http://localhost:8787",
  };
}
