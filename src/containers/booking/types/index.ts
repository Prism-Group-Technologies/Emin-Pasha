import type { BookingCopy } from "@/schemas/content/booking";

/**
 * Everything the widgets need, assembled server-side and handed across as one
 * plain serializable prop — the same discipline as `headerData` (DECISIONS.md
 * D25), so the Zod-validated content layer never reaches the client bundle.
 */
export interface BookingWidgetData {
  copy: BookingCopy;
  /** `env.YCS_BOOKING_URL`. Server-only *name*; its value may cross. */
  bookingUrl?: string;
  limits: {
    maxStayNights: number | null;
    maxAdvanceDays: number | null;
    maxAdults: number;
    maxChildren: number;
    maxRooms: number;
  };
}
