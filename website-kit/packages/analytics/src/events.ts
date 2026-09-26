/**
 * Typed event helpers pushed to the GTM dataLayer. Contact-channel clicks
 * (WhatsApp/tel/mail) are tracked here — see the contact block.
 */
export type TrackedEvent =
  | { event: "cta_click"; label: string; location: string }
  | { event: "contact_click"; channel: "whatsapp" | "tel" | "email" }
  | { event: "form_submit"; formId: string }
  | { event: "page_view"; path: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(payload: TrackedEvent): void {
  // TODO: ensure dataLayer exists then push. No PII in payloads.
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}
