import type { MiddlewareHandler } from "hono";

/**
 * Pluggable auth. Both the portal page and the report API go through the SAME
 * middleware instance — see src/index.ts. Selection is by env, so a deployment
 * runs exactly one strategy.
 */

export interface AuthenticatedUser {
  /** Opaque subject id. Never a visitor identity — this is the operator. */
  subject: string;
}

/** Context variables an auth provider sets for downstream handlers. */
export type AuthVariables = {
  user: AuthenticatedUser;
};

export interface AuthProvider {
  readonly name: string;
  /** Hono middleware that authenticates the request or returns 401/302. */
  middleware(): MiddlewareHandler<{ Variables: AuthVariables }>;
}

export type AuthStrategy = "cloudflare-access" | "session-login";

export function selectAuthStrategy(env: NodeJS.ProcessEnv = process.env): AuthStrategy {
  const raw = env.AUTH_STRATEGY;
  if (raw === "cloudflare-access" || raw === "session-login") return raw;
  // TODO: decide default; failing closed is safest.
  throw new Error(`AUTH_STRATEGY must be set to a supported strategy, got: ${String(raw)}`);
}
