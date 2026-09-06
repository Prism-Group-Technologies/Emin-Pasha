import { z } from "zod";

import { bookingLimits } from "@/config/booking";

/**
 * The availability search. Dates are `YYYY-MM-DD` strings, not `Date`
 * objects: that is the format every YCS request type takes
 * (`check_in_date`/`check_out_date` on `listing.php`, `from_date`/`to_date`
 * on `kioskconnectivity`), it survives the store, the URL and the RSC
 * boundary unchanged, and it sidesteps the timezone drift a `Date` picks up
 * when it crosses any of the three.
 */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Use a date in YYYY-MM-DD form." });

/** Local midnight today — not UTC, because "today" is the guest's today. */
export function startOfLocalToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseIsoDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = parseIsoDate(checkOut).getTime() - parseIsoDate(checkIn).getTime();
  return Math.round(ms / 86_400_000);
}

function daysFromToday(value: string): number {
  const ms = parseIsoDate(value).getTime() - startOfLocalToday().getTime();
  return Math.round(ms / 86_400_000);
}

export const bookingSearchSchema = z
  .object({
    checkIn: isoDate,
    checkOut: isoDate,
    adults: z.number().int().min(1).max(bookingLimits.maxAdults),
    children: z.number().int().min(0).max(bookingLimits.maxChildren),
    rooms: z.number().int().min(1).max(bookingLimits.maxRooms),
    /** Maps to `promotion_code` on the RoomList request type. */
    promoCode: z.string().trim().min(1).max(64).optional(),
    /** Maps to `roomtypeunkid`; set by `InlineBookingWidget` on room pages. */
    roomTypeId: z.string().trim().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (daysFromToday(value.checkIn) < 0) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: "checkIn.past" });
    }
    const nights = nightsBetween(value.checkIn, value.checkOut);
    if (nights < 1) {
      ctx.addIssue({ code: "custom", path: ["checkOut"], message: "checkOut.notAfter" });
    }
    // Both limits are enforced only once the real YCS-configured values are
    // supplied (config/booking.ts, TODO(EMIN-Q71)) — never against a guess.
    if (bookingLimits.maxStayNights !== null && nights > bookingLimits.maxStayNights) {
      ctx.addIssue({ code: "custom", path: ["checkOut"], message: "checkOut.tooLong" });
    }
    if (
      bookingLimits.maxAdvanceDays !== null &&
      daysFromToday(value.checkIn) > bookingLimits.maxAdvanceDays
    ) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: "checkIn.tooFarAhead" });
    }
  });

export type BookingSearch = z.infer<typeof bookingSearchSchema>;
