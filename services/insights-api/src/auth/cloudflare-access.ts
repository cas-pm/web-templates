import type { MiddlewareHandler } from "hono";
import { z } from "zod";
import type { AuthProvider, AuthVariables } from "./index.js";

/**
 * Verifies the `Cf-Access-Jwt-Assertion` header that Cloudflare Access injects.
 * The JWT is validated against the team's public JWKS.
 */

export const CfAccessEnvSchema = z.object({
  /** e.g. "https://<team>.cloudflareaccess.com" */
  CF_ACCESS_TEAM_DOMAIN: z.string().url(),
  /** Application Audience (AUD) tag from the Access application. */
  CF_ACCESS_AUD: z.string().min(1),
});
export type CfAccessEnv = z.infer<typeof CfAccessEnvSchema>;

const CF_ACCESS_HEADER = "cf-access-jwt-assertion";

export function createCloudflareAccessProvider(
  env: NodeJS.ProcessEnv = process.env,
): AuthProvider {
  const cfg = CfAccessEnvSchema.parse(env);
  // TODO: build a jose remote JWKS set from `${cfg.CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`.
  void cfg;

  const middleware = (): MiddlewareHandler<{ Variables: AuthVariables }> => {
    return async (c, next) => {
      const token = c.req.header(CF_ACCESS_HEADER);
      if (!token) {
        return c.json({ error: "missing Cf-Access-Jwt-Assertion" }, 401);
      }
      // TODO: jwtVerify(token, jwks, { audience: cfg.CF_ACCESS_AUD, issuer: cfg.CF_ACCESS_TEAM_DOMAIN })
      // TODO: on success c.set("user", { subject: payload.sub }) then `await next()`; else 401.
      void next;
      return c.json({ error: "not implemented" }, 401);
    };
  };

  return { name: "cloudflare-access", middleware };
}
