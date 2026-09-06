/**
 * Booking search limits.
 *
 * **`maxStayNights` and `maxAdvanceDays` are deliberately `null`.** The brief
 * asks for both, and asks that they match what is configured in YCS. Those
 * configured values have not been supplied (TODO(EMIN-Q71)), and CLAUDE.md §3
 * forbids inventing them — a guessed 30-night cap that is really 21 rejects
 * real bookings, and a guessed 21 that is really 30 silently loses them.
 *
 * So the *mechanism* is built and wired: `bookingSearchSchema` reads these and
 * enforces whichever are non-null. Until they are supplied the widget imposes
 * no ceiling of its own, and the engine remains the authority — its
 * `NightsLimitExceeded` error code is already mapped to a guest-friendly
 * message in `lib/booking/errors.ts`, so an over-long stay fails politely at
 * handoff instead of being waved through.
 *
 * Set both to real numbers and validation moves client-side, which is where
 * it belongs. No other file changes.
 */
export const bookingLimits = {
  /** Longest stay the engine will accept, in nights. TODO(EMIN-Q71). */
  maxStayNights: null as number | null,
  /** How far ahead the engine allows booking, in days. TODO(EMIN-Q71). */
  maxAdvanceDays: null as number | null,
  /** Not vendor-configured — these are UI sanity bounds on the stepper. */
  maxAdults: 12,
  maxChildren: 8,
  maxRooms: 5,
} as const;

/** Both YCS request types and our own serialisation use `YYYY-MM-DD`. */
export const YCS_DATE_FORMAT = "yyyy-MM-dd";

/** `dd MMM yyyy` display format — CLAUDE.md §6.5. */
export const DISPLAY_DATE_FORMAT = "dd MMM yyyy";
