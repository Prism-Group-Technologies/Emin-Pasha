import { bookingLimits } from "@/config/booking";
import { env } from "@/config/env";
import type { BookingWidgetData } from "@/containers/booking/types";
import { bookingCopy } from "@/content/booking";

/**
 * Server-side assembly point. Imported only by Server Components, which is
 * what keeps `@/config/env` (and therefore every server-only var beside
 * `YCS_BOOKING_URL`) out of the client graph.
 */
export function getBookingWidgetData(): BookingWidgetData {
  return {
    copy: bookingCopy,
    bookingUrl: env.YCS_BOOKING_URL,
    limits: {
      maxStayNights: bookingLimits.maxStayNights,
      maxAdvanceDays: bookingLimits.maxAdvanceDays,
      maxAdults: bookingLimits.maxAdults,
      maxChildren: bookingLimits.maxChildren,
      maxRooms: bookingLimits.maxRooms,
    },
  };
}
