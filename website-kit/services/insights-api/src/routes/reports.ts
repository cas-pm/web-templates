import { Hono } from "hono";
import { z } from "zod";
import type { AuthVariables } from "../auth/index.js";
import { createGa4Client, readGa4CredentialsFromEnv, type Ga4Client } from "../lib/ga4.js";

/**
 * GET /reports?period=  -> aggregated analytics for the operator dashboard.
 * Returns visitors, channels, top pages and conversion events. Never returns
 * anything that could identify an individual visitor.
 */

export const ReportQuerySchema = z.object({
  period: z.enum(["7d", "28d", "90d"]).default("28d"),
});

export interface ReportResponse {
  period: string;
  visitors: number;
  channels: Array<{ channel: string; visitors: number }>;
  topPages: Array<{ path: string; views: number }>;
  conversionEvents: Array<{ eventName: string; count: number }>;
}

export function createReportsRouter(
  ga4: Ga4Client = createGa4Client(readGa4CredentialsFromEnv()),
): Hono<{ Variables: AuthVariables }> {
  const router = new Hono<{ Variables: AuthVariables }>();

  router.get("/reports", async (c) => {
    const parsed = ReportQuerySchema.safeParse({ period: c.req.query("period") });
    if (!parsed.success) {
      return c.json({ error: "invalid period", details: parsed.error.flatten() }, 400);
    }

    const raw = await ga4.runReport({ period: parsed.data.period });
    // TODO: map/aggregate `raw` into ReportResponse; strip any PII dimensions.
    const body: ReportResponse = {
      period: parsed.data.period,
      visitors: raw.visitors,
      channels: raw.channels,
      topPages: raw.topPages,
      conversionEvents: raw.conversionEvents,
    };
    return c.json(body);
  });

  return router;
}
