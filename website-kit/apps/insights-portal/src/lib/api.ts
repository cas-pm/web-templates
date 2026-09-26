/**
 * Typed client for insights-api. Mirrors the API's ReportResponse shape.
 * Auth (Cf-Access header / session cookie) is forwarded by the caller — the
 * same gate that guards the API guards this portal.
 */
export interface ReportResponse {
  period: string;
  visitors: number;
  channels: Array<{ channel: string; visitors: number }>;
  topPages: Array<{ path: string; views: number }>;
  conversionEvents: Array<{ eventName: string; count: number }>;
}

export async function fetchReport(
  apiBaseUrl: string,
  period: string,
  _init?: RequestInit,
): Promise<ReportResponse> {
  // TODO: fetch(`${apiBaseUrl}/api/reports?period=${period}`, _init) and parse.
  void apiBaseUrl;
  void period;
  throw new Error("not implemented");
}
