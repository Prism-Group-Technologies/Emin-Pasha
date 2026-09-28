import { BOOKING_ENGINE_PARAMS } from "@/config/bookingEngine";
import type { BookingAdapter, BookingContext, BookingOutcome } from "@/lib/booking/types";
import type { BookingSearch } from "@/schemas/booking";

/**
 * (A) DEEP-LINK HANDOFF — v1 default, and now live.
 *
 * ## What changed
 *
 * This adapter used to return the enquiry outcome unconditionally, because the
 * vendor documents the REST API only and says nothing about the guest-facing
 * booking-engine URL. Guessing `checkin=`/`check_in_date=`/`arrival=` would
 * have produced a link that looked right, deep-linked to a real engine, and
 * silently dropped the guest's dates.
 *
 * That is no longer a guess. The operator supplied a real LetsBook search URL
 * and its four parameter names are recorded in `config/bookingEngine.ts`, so
 * the handoff is a transcription of a working link rather than a construction.
 *
 * ## The map is deliberately partial
 *
 * `DeepLinkFields` still names all seven things the form can collect, because
 * that is what the search *means*. `BOOKING_ENGINE_PARAMS` names the four the
 * engine is known to read. `set()` below skips the difference rather than
 * inventing a key for it — so `rooms`, `promoCode` and `roomTypeId` stay in
 * the guest's search (and reach a human through the enquiry path) instead of
 * being posted to a parameter the engine may quietly ignore.
 *
 * ## To finish it
 *
 * Run one LetsBook search with multiple rooms, a promo code and a specific
 * room type selected, and copy the resulting URL. Add those keys to
 * `BOOKING_ENGINE_PARAMS`; they start flowing with no change to this file.
 * `roomTypeId` additionally needs a slug→engine-id map: the form currently
 * carries a content slug (`superior-room`), which is not what the engine
 * identifies a room type by.
 */
export const DEEP_LINK_PARAMS: Readonly<Partial<Record<keyof DeepLinkFields, string>>> =
  BOOKING_ENGINE_PARAMS;

interface DeepLinkFields {
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  rooms: string;
  promoCode: string;
  roomTypeId: string;
}

/** UTM keys forwarded verbatim so attribution survives the handoff. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function collectUtm(search: URLSearchParams): Record<string, string> {
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) {
      found[key] = value;
    }
  }
  return found;
}

export function buildDeepLink(
  baseUrl: string,
  params: Readonly<Partial<Record<keyof DeepLinkFields, string>>>,
  search: BookingSearch,
  context: BookingContext,
): string {
  const url = new URL(baseUrl);
  const set = (key: keyof DeepLinkFields, value: string | number | undefined) => {
    const name = params[key];
    // No mapped name means the engine is not known to read this field. Skip it:
    // an unread parameter is noise in the guest's address bar at best, and at
    // worst it collides with a key the engine uses for something else.
    if (name === undefined || value === undefined || value === "") {
      return;
    }
    url.searchParams.set(name, String(value));
  };
  set("checkIn", search.checkIn);
  set("checkOut", search.checkOut);
  set("adults", search.adults);
  set("children", search.children);
  set("rooms", search.rooms);
  set("promoCode", search.promoCode);
  set("roomTypeId", search.roomTypeId);
  for (const [key, value] of Object.entries(context.utm ?? {})) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export const ycsDeepLinkAdapter: BookingAdapter = {
  id: "ycsDeepLink",
  submit(search, context): Promise<BookingOutcome> {
    // `bookingUrl` is always supplied in practice (`getBookingWidgetData`
    // falls back to `BOOKING_ENGINE_URL`), but the interface allows it to be
    // absent and the enquiry path has to stay reachable for that case —
    // CLAUDE.md §4's "enquiry fallback always present".
    if (!context.bookingUrl || Object.keys(DEEP_LINK_PARAMS).length === 0) {
      return Promise.resolve({
        kind: "enquiry",
        href: "/contact",
        reason: "not-configured",
      });
    }
    return Promise.resolve({
      kind: "redirect",
      url: buildDeepLink(context.bookingUrl, DEEP_LINK_PARAMS, search, context),
    });
  },
};
