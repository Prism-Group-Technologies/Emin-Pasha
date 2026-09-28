import { bookingLimits } from "@/config/booking";
import { BOOKING_ENGINE_URL } from "@/config/bookingEngine";
import { env } from "@/config/env";
import type { BookingWidgetData } from "@/containers/booking/types";
import { bookingCopy } from "@/content/booking";

/**
 * Server-side assembly point. Imported only by Server Components, which is
 * what keeps `@/config/env` (and therefore every server-only var beside
 * `YCS_BOOKING_URL`) out of the client graph.
 *
 * `bookingUrl` resolves the override before the default, so an environment can
 * be pointed at a staging engine by setting one var — and so the live engine
 * still works in every environment that sets nothing, which is all of them.
 */
export function getBookingWidgetData(): BookingWidgetData {
  return {
    copy: bookingCopy,
    bookingUrl: env.YCS_BOOKING_URL ?? BOOKING_ENGINE_URL,
    limits: {
      maxStayNights: bookingLimits.maxStayNights,
      maxAdvanceDays: bookingLimits.maxAdvanceDays,
      maxAdults: bookingLimits.maxAdults,
      maxChildren: bookingLimits.maxChildren,
      maxRooms: bookingLimits.maxRooms,
    },
  };
}
