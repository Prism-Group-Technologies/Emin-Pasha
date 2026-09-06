import { enquiryAdapter, enquiryHref } from "@/lib/booking/enquiry";
import type { BookingAdapter, BookingContext, BookingOutcome } from "@/lib/booking/types";
import { ycsDeepLinkAdapter } from "@/lib/booking/ycsDeepLink";
import type { BookingSearch } from "@/schemas/booking";

export { enquiryHref };
export type { BookingContext, BookingOutcome } from "@/lib/booking/types";

/**
 * The composition root. Only client-safe adapters are wired here —
 * `ycsApiAdapter` is deliberately absent, because importing it would pull
 * `server-only` into the client graph and fail the build. Phase 2 reaches it
 * through `POST /api/booking/availability` instead, which is the whole point
 * of the interface: promoting the API flow changes this file and the route
 * handler, not one line of UI.
 */
const primary: BookingAdapter = ycsDeepLinkAdapter;

/**
 * Runs the primary adapter and guarantees an ending. Any outcome that is not
 * a usable handoff resolves to the enquiry path with the guest's dates
 * carried across — CLAUDE.md §2's "a page with no conversion path is a bug",
 * applied to the one interaction that matters most.
 */
export async function submitBooking(
  search: BookingSearch,
  context: BookingContext,
): Promise<BookingOutcome> {
  const outcome = await primary.submit(search, context);
  if (outcome.kind === "enquiry") {
    return { ...outcome, href: enquiryHref(search) };
  }
  return outcome;
}

export { enquiryAdapter, ycsDeepLinkAdapter };
