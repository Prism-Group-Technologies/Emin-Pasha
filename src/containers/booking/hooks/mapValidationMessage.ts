import type { BookingCopy } from "@/schemas/content/booking";

/**
 * Zod issues carry stable keys (`checkOut.notAfter`), not sentences — so the
 * schema stays free of copy and the copy stays in `content/booking.ts`, which
 * is the only place either can be edited (CLAUDE.md §5.4). This maps one to
 * the other at the point of display.
 *
 * An unmapped key falls back to the generic required message rather than
 * leaking a raw issue key into the interface.
 */
const KEYS: Record<string, keyof BookingCopy["validation"]> = {
  "checkIn.past": "checkInPast",
  "checkIn.tooFarAhead": "checkInTooFarAhead",
  "checkOut.notAfter": "checkOutNotAfter",
  "checkOut.tooLong": "checkOutTooLong",
};

export function mapValidationMessage(
  message: string | undefined,
  copy: BookingCopy,
): string | undefined {
  if (!message) {
    return undefined;
  }
  const key = KEYS[message];
  return key ? copy.validation[key] : copy.validation.required;
}
