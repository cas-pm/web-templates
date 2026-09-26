import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { AuthProvider, AuthVariables } from "./auth/index.js";
import { selectAuthStrategy } from "./auth/index.js";
import { createCloudflareAccessProvider } from "./auth/cloudflare-access.js";
import { createSessionLoginProvider } from "./auth/session-login.js";
import { createReportsRouter } from "./routes/reports.js";

/**
 * insights-api entrypoint.
 *
 * Both the portal page and the report API go through the SAME auth middleware.
 * We mount `auth.middleware()` once at the top so every downstream route —
 * page and API alike — is guarded identically.
 */

function buildAuthProvider(): AuthProvider {
  switch (selectAuthStrategy()) {
    case "cloudflare-access":
      return createCloudflareAccessProvider();
    case "session-login":
      return createSessionLoginProvider();
  }
}

export function createApp(): Hono<{ Variables: AuthVariables }> {
  const app = new Hono<{ Variables: AuthVariables }>();
  const auth = buildAuthProvider();

  // Public: health + (for session-login) the login endpoint.
  app.get("/healthz", (c) => c.text("ok"));
  if ("handleLogin" in auth) {
    app.post("/login", (auth as ReturnType<typeof createSessionLoginProvider>).handleLogin);
  }

  // Single auth gate for BOTH the page and the API.
  app.use("*", auth.middleware());

  // Page (server-rendered portal shell) and API share the gate above.
  app.get("/", (c) => c.html("<!-- TODO: render portal shell for c.get('user') -->"));
  app.route("/api", createReportsRouter());

  return app;
}

// TODO: guard with import.meta.main equivalent if imported elsewhere.
const port = Number(process.env.PORT ?? 8787);
serve({ fetch: createApp().fetch, port });
