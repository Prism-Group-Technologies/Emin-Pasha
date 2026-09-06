import type { BookingAdapter, BookingContext, BookingOutcome } from "@/lib/booking/types";
import type { BookingSearch } from "@/schemas/booking";

/**
 * (A) DEEP-LINK HANDOFF — v1 default.
 *
 * ## Why this adapter cannot construct a URL yet
 *
 * The vendor's public documentation (api.ezeetechnosys.com, read 2026-08-02)
 * documents the **REST API only**. It does not document the customer-facing
 * booking-engine deep link at all: there is no page describing the "Book Now"
 * URL, and no query-string parameter names for pre-filling a search. The one
 * booking-engine URL that appears anywhere in the docs is a bare path in a
 * `HotelList` response (`<url>/booking/book-rooms-<slug>`) with no query
 * string attached.
 *
 * Guessing `checkin=`/`check_in_date=`/`arrival=` here would produce a link
 * that looks right, deep-links to a real engine, and silently drops the
 * guest's dates — the worst possible failure, because it converts a working
 * enquiry into an abandoned booking without erroring. So this adapter refuses
 * to guess: with no verified parameter map it returns the enquiry outcome,
 * which is a complete, working path to a booking.
 *
 * ## To finish it
 *
 * Open the hotel's existing "Book Now" link, run one search in it, copy the
 * resulting URL **including its query string**, and paste it into
 * `docs/DECISIONS.md` (D33). Fill `YCS_BOOKING_URL` and the map below from
 * that real URL. Nothing else in the module changes.
 */
export const DEEP_LINK_PARAMS: Readonly<Record<keyof DeepLinkFields, string>> | null = null;

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

/**
 * Exported for the moment the parameter names are known: given the verified
 * map it builds the link, and it is already covered by the UTM and encoding
 * rules. It is unreachable until `DEEP_LINK_PARAMS` is non-null.
 */
export function buildDeepLink(
  baseUrl: string,
  params: Readonly<Record<keyof DeepLinkFields, string>>,
  search: BookingSearch,
  context: BookingContext,
): string {
  const url = new URL(baseUrl);
  const set = (key: keyof DeepLinkFields, value: string | number | undefined) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(params[key], String(value));
    }
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
    if (!context.bookingUrl || DEEP_LINK_PARAMS === null) {
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
