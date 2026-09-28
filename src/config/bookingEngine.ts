/**
 * LetsBook — the hotel's live booking engine (Yanolja Cloud Solution).
 *
 * ## Why this is a public constant and not an env var
 *
 * `env.YCS_HOTEL_CODE`, `YCS_API_KEY` and `YCS_AUTH_CODE` are credentials and
 * stay server-only. This is not one of those: it is the same URL printed on
 * the property's own "Book Now" button, reachable by anyone, and it has to be
 * readable from the content layer (`content/navigation.ts`) and from client
 * components (the header CTA, the sticky bars) alike. Routing it through
 * `@/config/env` would drag every server-only var beside it into the client
 * graph — so the public fact lives here, in a module with no secrets in it,
 * and `env.YCS_BOOKING_URL` remains available as a per-environment override
 * (see `containers/booking/bookingData.ts`).
 *
 * Resolves TODO(EMIN-Q49): the URL below was supplied by the operator from
 * the live engine, not constructed.
 */
export const BOOKING_ENGINE_URL = "https://letsbook.me/booking/theeminpashahotelspakampala";

/**
 * The verified query-string names, and **only** the verified ones.
 *
 * Every key here was read off a real LetsBook search URL supplied by the
 * operator:
 *
 *     …/theeminpashahotelspakampala?checkin=2026-09-28&checkout=2026-09-29&adults=2&children=0
 *
 * `rooms`, `promoCode` and `roomTypeId` are deliberately absent. The engine is
 * a client-rendered SPA with no published deep-link documentation, so their
 * parameter names cannot be read off anything — and a guessed name is the one
 * failure mode worth engineering against here: the link would still resolve to
 * a real engine, still look correct, and silently drop the guest's third room
 * or their promo code with no error anywhere. `buildDeepLink` skips any field
 * this map does not name, so those three travel no further than the form until
 * a real URL carrying them is captured (then: add the key, nothing else).
 *
 * Dates are `YYYY-MM-DD`, which is what the engine's own URL uses and what
 * `bookingSearchSchema` already produces — no conversion at the boundary.
 */
export const BOOKING_ENGINE_PARAMS = {
  checkIn: "checkin",
  checkOut: "checkout",
  adults: "adults",
  children: "children",
} as const;
