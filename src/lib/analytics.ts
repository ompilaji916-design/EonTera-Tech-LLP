export type AnalyticsEvent =
  | "page_view"
  | "product_view"
  | "download"
  | "contact_click"
  | "phone_click"
  | "email_click"
  | "quote_request"
  | "expert_enquiry"
  | "resource_download"
  | "search_usage";

export function track(event: AnalyticsEvent, detail: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event: `eontera_${event}`, ...detail };
  const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("eontera:analytics", { detail: payload }));
}
