/**
 * In-page anchor ids and deep-link query keys for the Airport Transfer page —
 * deliberately **import-free**, the same split `containers/wellness/anchors.ts`
 * makes. The booking island, the sticky bar and the server-rendered cards all
 * need these values, and none of them may drag the Zod-validated content
 * layer into a client bundle (DECISIONS.md D25).
 */

/** The booking form — every "book" / "choose this car" CTA lands here. */
export const BOOKING_ANCHOR_ID = "book";

/** The fleet band. */
export const FLEET_ANCHOR_ID = "fleet";

/**
 * Query keys a card can set to pre-select the form — e.g. a fleet card links
 * to `?vehicle=premium-suv#book`. Read once on mount by `useBookingFromUrl`;
 * an unknown value is ignored.
 */
export const BOOKING_QUERY = {
  vehicle: "vehicle",
  service: "service",
} as const;

/**
 * Fired on `window` by `PreselectButton` after it rewrites the query string,
 * so the already-mounted booking island re-reads the URL. A same-page
 * `next/link` navigation emits neither `hashchange` nor `popstate`.
 */
export const BOOKING_PRESELECT_EVENT = "transfer:preselect";

/** `?vehicle=premium-suv#book` — the one place the deep-link string is built. */
export function bookingHref(key: keyof typeof BOOKING_QUERY, value: string): string {
  return `?${BOOKING_QUERY[key]}=${encodeURIComponent(value)}#${BOOKING_ANCHOR_ID}`;
}
