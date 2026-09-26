import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { loadConfig } from "./config.js";
import { baseAuth, requirePublishAuth, type AuthVariables } from "./auth.js";
import { createGitHubClient } from "./lib/github.js";
import { createClaudeProposer } from "./propose/index.js";
import { validateProposal } from "./validate/index.js";
import { buildPreview } from "./preview/index.js";
import { createPublisher, type IdempotencyStore, type PublishResult } from "./publish/index.js";
import { createHistory } from "./history/index.js";
import { createRollback } from "./rollback/index.js";
import { createStatus } from "./status/index.js";

/**
 * content-assist entrypoint. Every route sits behind baseAuth; the publish
 * route additionally requires requirePublishAuth (separate check).
 *
 * Note: this service never loads GA4 credentials — see config.ts.
 */

// Minimal in-memory idempotency store. TODO: persist for multi-instance.
function memoryIdempotency(): IdempotencyStore {
  const store = new Map<string, PublishResult>();
  return {
    async get(key) {
      return store.get(key) ?? null;
    },
    async put(key, result) {
      store.set(key, result);
    },
  };
}

export function createApp(): Hono<{ Variables: AuthVariables }> {
  const config = loadConfig();
  const gh = createGitHubClient(config);
  const proposer = createClaudeProposer(config.ANTHROPIC_API_KEY);
  const publisher = createPublisher(gh, memoryIdempotency());
  const history = createHistory(gh);
  const rollback = createRollback(gh);
  const status = createStatus(gh);

  const app = new Hono<{ Variables: AuthVariables }>();
  app.get("/healthz", (c) => c.text("ok"));

  // Base auth gate for everything below.
  app.use("*", baseAuth(config));

  // TODO: wire fields/ (GET /fields?slug=&lang=) once content loading is added.
  app.post("/propose", async (c) => {
    void proposer;
    // TODO: load page, resolve field, call proposer.propose(...).
    return c.json({ error: "not implemented" }, 501);
  });

  app.post("/validate", async (c) => {
    void validateProposal;
    return c.json({ error: "not implemented" }, 501);
  });

  app.post("/preview", async (c) => {
    void buildPreview;
    return c.json({ error: "not implemented" }, 501);
  });

  // Publish: base gate PLUS separate publish authorization.
  app.post("/publish", requirePublishAuth(config), async (c) => {
    void publisher;
    return c.json({ error: "not implemented" }, 501);
  });

  app.get("/history", async (c) => c.json(await history.list()));

  app.post("/rollback", requirePublishAuth(config), async (c) => {
    void rollback;
    return c.json({ error: "not implemented" }, 501);
  });

  app.get("/status/:runId", async (c) => {
    const runId = Number(c.req.param("runId"));
    return c.json(await status.poll(runId));
  });

  return app;
}

const port = Number(process.env.PORT ?? 8788);
serve({ fetch: createApp().fetch, port });
