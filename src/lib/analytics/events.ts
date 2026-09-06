import { hasConsent } from "@/stores/consentStore";

/**
 * The four booking events, defined once and named once.
 *
 * **Nothing is sent without marketing consent.** `track()` checks
 * `hasConsent("marketing")` on every call rather than relying on the caller
 * to remember — a consent check you have to remember is one you will
 * eventually forget, and the cost of forgetting here is a regulatory problem,
 * not a bug. Events fired before consent are dropped, not queued: replaying
 * them the moment someone accepts would be collecting data from before they
 * agreed.
 *
 * There is no analytics vendor wired up yet (TODO(EMIN-Q31)). Until one is
 * chosen this pushes to `window.dataLayer` if a consent-gated loader has
 * created it, and is otherwise a no-op — so the call sites are correct now
 * and the vendor is a one-file change later.
 */
export type BookingAnalyticsEvent =
  "booking_widget_opened" | "dates_selected" | "guests_changed" | "availability_submitted";

/**
 * Homepage conversion events. The page sells three different things to three
 * different audiences (an overnight stay, an event, a day out in the city) and
 * until these fire there is no way to know which of the three the traffic
 * actually wants — only that somebody reached the booking widget.
 *
 * `home_lead_path_selected` is the one that earns its keep: it reports which
 * panel of the Plan Your Visit section a visitor opened, which is the closest
 * thing this page has to an intent signal.
 */
export type HomeAnalyticsEvent =
  "home_lead_path_selected" | "home_cta_clicked" | "home_section_cta_clicked";

export type AnalyticsEvent = BookingAnalyticsEvent | HomeAnalyticsEvent;

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined" || !hasConsent("marketing")) {
    return;
  }
  window.dataLayer?.push({ event, ...payload });
}

/**
 * Fires the conversion event **before** navigation and gives the beacon a
 * moment to leave. A `dataLayer.push` immediately followed by a same-tab
 * navigation is routinely lost, which would under-report exactly the event
 * the client cares most about. The delay is capped hard: a guest never waits
 * more than 150 ms to be taken to booking, consent or no consent.
 */
export async function trackThenNavigate(
  event: AnalyticsEvent,
  payload: EventPayload,
  navigate: () => void,
): Promise<void> {
  track(event, payload);
  if (hasConsent("marketing")) {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  navigate();
}
