import type { BookingAdapter, BookingOutcome } from "@/lib/booking/types";
import type { BookingSearch } from "@/schemas/booking";

/**
 * (C) ENQUIRY FALLBACK — always present (CLAUDE.md §4).
 *
 * Not a consolation prize: at a 20-something-room boutique property every
 * booking is touched by a person anyway, so a guest who lands here is on the
 * same path as one who phones. It carries the search forward as query
 * parameters so nobody has to type their dates twice, and so the contact form
 * can pre-fill in Step 15.
 *
 * `reservations@eminpasha.com` is the approved address for reservations
 * (02_CONTENT_SOURCE_OF_TRUTH.md §1); the contact route owns the actual
 * send, so this adapter only ever produces a URL.
 */
export function enquiryHref(search: BookingSearch): string {
  const params = new URLSearchParams({
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adults: String(search.adults),
    children: String(search.children),
    rooms: String(search.rooms),
    subject: "availability",
  });
  if (search.promoCode) {
    params.set("promoCode", search.promoCode);
  }
  if (search.roomTypeId) {
    params.set("roomTypeId", search.roomTypeId);
  }
  return `/contact?${params.toString()}`;
}

export const enquiryAdapter: BookingAdapter = {
  id: "enquiry",
  submit(search): Promise<BookingOutcome> {
    return Promise.resolve({
      kind: "enquiry",
      href: enquiryHref(search),
      reason: "not-configured",
    });
  },
};
