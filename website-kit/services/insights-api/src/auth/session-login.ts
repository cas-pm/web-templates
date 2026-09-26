import type { MiddlewareHandler } from "hono";
import { z } from "zod";
import type { AuthProvider, AuthVariables } from "./index.js";

/**
 * Password-login auth with server-side sessions. There is NO user database:
 * a single Argon2id password hash is read from env and compared against the
 * submitted password. Sessions are stored server-side and expire.
 */

export const SessionLoginEnvSchema = z.object({
  /** Argon2id hash of the single operator password. Verified via @node-rs/argon2. */
  SESSION_PASSWORD_HASH: z.string().min(1),
  /** Secret used to sign the session cookie. */
  SESSION_SECRET: z.string().min(16),
  /** Session lifetime in seconds. */
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(3600),
});
export type SessionLoginEnv = z.infer<typeof SessionLoginEnvSchema>;

const COOKIE_NAME = "insights_session";

interface SessionRecord {
  subject: string;
  /** Epoch ms when this session is no longer valid. */
  expiresAt: number;
}

/** Server-side session store. TODO: back with Redis/KV for multi-instance deploys. */
export interface SessionStore {
  create(subject: string, ttlSeconds: number): Promise<{ id: string }>;
  get(id: string): Promise<SessionRecord | null>;
  destroy(id: string): Promise<void>;
}

/** Simple in-memory store; single-instance only. */
export function createMemorySessionStore(): SessionStore {
  const sessions = new Map<string, SessionRecord>();
  return {
    async create(subject, ttlSeconds) {
      // TODO: use crypto.randomUUID() and store record.
      const id = crypto.randomUUID();
      sessions.set(id, { subject, expiresAt: Date.now() + ttlSeconds * 1000 });
      return { id };
    },
    async get(id) {
      const rec = sessions.get(id);
      if (!rec) return null;
      // TODO: enforce server-side expiry.
      if (rec.expiresAt <= Date.now()) {
        sessions.delete(id);
        return null;
      }
      return rec;
    },
    async destroy(id) {
      sessions.delete(id);
    },
  };
}

/** Fixed-window/token-bucket login rate limiter keyed by client identifier. */
export interface RateLimiter {
  /** Returns true if the attempt is allowed, false if rate-limited. */
  check(key: string): Promise<boolean>;
}

export function createLoginRateLimiter(): RateLimiter {
  return {
    async check(_key: string): Promise<boolean> {
      // TODO: implement per-IP login rate limiting (e.g. N attempts / window).
      return true;
    },
  };
}

export function createSessionLoginProvider(
  env: NodeJS.ProcessEnv = process.env,
  store: SessionStore = createMemorySessionStore(),
  rateLimiter: RateLimiter = createLoginRateLimiter(),
): AuthProvider & {
  /** POST /login handler — verifies password, sets the session cookie. */
  handleLogin: MiddlewareHandler<{ Variables: AuthVariables }>;
} {
  const cfg = SessionLoginEnvSchema.parse(env);

  const handleLogin: MiddlewareHandler<{ Variables: AuthVariables }> = async (c) => {
    const allowed = await rateLimiter.check(clientKey(c));
    if (!allowed) return c.json({ error: "too many attempts" }, 429);

    // TODO: read password from body, verify against cfg.SESSION_PASSWORD_HASH
    // using argon2.verify(hash, password). On mismatch -> 401.
    // TODO: on success, store.create(subject, cfg.SESSION_TTL_SECONDS) and set a
    // Secure; HttpOnly; SameSite=Strict cookie named `${COOKIE_NAME}`.
    void cfg;
    void COOKIE_NAME;
    return c.json({ error: "not implemented" }, 401);
  };

  const middleware = (): MiddlewareHandler<{ Variables: AuthVariables }> => {
    return async (c, next) => {
      const sid = readSessionCookie(c);
      if (!sid) return c.json({ error: "unauthenticated" }, 401);
      const rec = await store.get(sid);
      if (!rec) return c.json({ error: "unauthenticated" }, 401);
      c.set("user", { subject: rec.subject });
      await next();
    };
  };

  return { name: "session-login", middleware, handleLogin };
}

// --- helpers (stubs) -------------------------------------------------------

function clientKey(_c: unknown): string {
  // TODO: derive a stable key (client IP from trusted proxy header).
  return "unknown";
}

function readSessionCookie(_c: unknown): string | null {
  // TODO: parse the signed session cookie from the request.
  return null;
}
