/**
 * Consent configuration (Google Consent Mode v2 style). Analytics/marketing
 * default to denied until the visitor opts in.
 */
export type ConsentState = "granted" | "denied";

export interface ConsentConfig {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
}

export const defaultConsent: ConsentConfig = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

/** Push an updated consent state to the dataLayer. */
export function updateConsent(_next: Partial<ConsentConfig>): void {
  // TODO: window.dataLayer.push(["consent", "update", _next]);
  void _next;
}
