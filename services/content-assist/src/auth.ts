import type { MiddlewareHandler } from "hono";
import type { Config } from "./config.js";

/**
 * content-assist auth. The base gate protects every route (portal + API). The
 * publish route additionally requires the PUBLISH_AUTH_TOKEN — a SEPARATE check
 * layered on top of the base gate (see requirePublishAuth).
 */

export type AuthVariables = {
  author: string;
};

/** Base auth gate for all content-assist routes. */
export function baseAuth(_config: Config): MiddlewareHandler<{ Variables: AuthVariables }> {
  return async (c, next) => {
    // TODO: verify operator identity (reuse the same strategy as insights-api,
    // e.g. Cf-Access header or shared session). Set c.set("author", subject).
    void c;
    await next();
  };
}

/** Extra, separate authorization required specifically for publishing. */
export function requirePublishAuth(config: Config): MiddlewareHandler<{ Variables: AuthVariables }> {
  return async (c, next) => {
    const token = c.req.header("x-publish-token");
    if (!token || token !== config.PUBLISH_AUTH_TOKEN) {
      return c.json({ error: "publish not authorized" }, 403);
    }
    // TODO: constant-time compare to avoid timing leaks.
    await next();
  };
}
