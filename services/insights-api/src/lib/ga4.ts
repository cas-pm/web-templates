import { z } from "zod";

/**
 * GA4 Data API client stub.
 *
 * Credentials are read from environment variables ONLY. Never accept creds via
 * request, config file, or constructor argument.
 */

export const Ga4EnvSchema = z.object({
  /** GA4 property id, e.g. "properties/123456789". */
  GA4_PROPERTY_ID: z.string().min(1),
  /** Service-account JSON (stringified) or a path — resolved by the SDK. */
  GA4_CREDENTIALS: z.string().min(1),
});
export type Ga4Env = z.infer<typeof Ga4EnvSchema>;

export interface Ga4Credentials {
  propertyId: string;
  /** Parsed service-account credentials for @google-analytics/data. */
  credentials: unknown;
}

/** Read + validate GA4 credentials from process.env. Throws if missing. */
export function readGa4CredentialsFromEnv(env: NodeJS.ProcessEnv = process.env): Ga4Credentials {
  const parsed = Ga4EnvSchema.parse(env);
  // TODO: JSON.parse GA4_CREDENTIALS (or read the file it points to) and shape
  // it into the { client_email, private_key, ... } object the SDK expects.
  return {
    propertyId: parsed.GA4_PROPERTY_ID,
    credentials: undefined,
  };
}

export interface ReportQuery {
  /** Reporting period, e.g. "7d", "28d", "90d". */
  period: string;
}

export interface Ga4Client {
  runReport(query: ReportQuery): Promise<Ga4RawReport>;
}

/** Minimal shape of the pieces of the GA4 runReport response we consume. */
export interface Ga4RawReport {
  visitors: number;
  channels: Array<{ channel: string; visitors: number }>;
  topPages: Array<{ path: string; views: number }>;
  conversionEvents: Array<{ eventName: string; count: number }>;
}

/**
 * Build a GA4 client backed by @google-analytics/data's BetaAnalyticsDataClient.
 * Returns a stub until wired up.
 */
export function createGa4Client(_creds: Ga4Credentials): Ga4Client {
  // TODO: instantiate BetaAnalyticsDataClient with _creds and map runReport
  // dimensions/metrics into Ga4RawReport.
  return {
    async runReport(_query: ReportQuery): Promise<Ga4RawReport> {
      // TODO: replace stub with real GA4 Data API call.
      return { visitors: 0, channels: [], topPages: [], conversionEvents: [] };
    },
  };
}
