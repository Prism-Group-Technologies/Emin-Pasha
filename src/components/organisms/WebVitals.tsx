"use client";

import { useReportWebVitals } from "next/web-vitals";

import { hasConsent } from "@/stores/consentStore";

/**
 * Real-user Web Vitals, reported **only after marketing consent**.
 *
 * `hasConsent` is checked inside the callback rather than around the hook —
 * a hook cannot be called conditionally, and consent can be granted mid-
 * session, so gating at the point of send is both correct and picks up a
 * later opt-in without a reload. Metrics sampled before consent are dropped,
 * not queued: replaying them would be collecting data from before agreement.
 *
 * Verified against next@16.2.12: `useReportWebVitals` is exported from
 * `next/web-vitals`. No analytics vendor is wired yet (TODO(EMIN-Q31)), so
 * this pushes to `window.dataLayer` — the same consent-gated sink the booking
 * events use.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (!hasConsent("marketing")) {
      return;
    }
    window.dataLayer?.push({
      event: "web_vitals",
      metric_name: metric.name,
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
  });

  return null;
}
