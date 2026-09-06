import { addDays, format } from "date-fns";

import { YCS_DATE_FORMAT } from "@/config/booking";
import type { BookingSearch } from "@/schemas/booking";

export const isoDate = (date: Date) => format(date, YCS_DATE_FORMAT);

/**
 * The one definition of "an empty search". It lives here rather than inline in
 * `useBookingForm` because the collapsed sticky bar has to render a summary
 * before any form instance has mounted, and a second copy of these defaults is
 * how the bar and the form end up disagreeing about tomorrow.
 *
 * Computed per call, never at module scope: a value frozen at import time is
 * wrong for anyone whose session crosses midnight.
 */
export function defaultBookingSearch(roomTypeId?: string): BookingSearch {
  const today = new Date();
  return {
    checkIn: isoDate(addDays(today, 1)),
    checkOut: isoDate(addDays(today, 2)),
    adults: 2,
    children: 0,
    rooms: 1,
    roomTypeId,
  };
}

/**
 * Seeds a widget from whatever the guest has already told us — the last
 * submitted search first, then the half-finished one they are editing now,
 * then the defaults. A guest who picks dates in the hero and scrolls into the
 * sticky bar meets their own dates, not tomorrow's.
 */
export function seedBookingSearch(
  stored: { last: BookingSearch | null; current: Partial<BookingSearch> },
  roomTypeId?: string,
): BookingSearch {
  return {
    ...defaultBookingSearch(roomTypeId),
    ...(stored.last ?? {}),
    ...stored.current,
    ...(roomTypeId ? { roomTypeId } : {}),
  };
}
