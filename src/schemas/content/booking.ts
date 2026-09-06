import { z } from "zod";

/**
 * Interface copy for the availability widget. Like `shell.ts` this is not
 * *facts* about the hotel — no rates, no capacities, no availability claims —
 * only the words around the form. Logged as TODO(EMIN-Q68) with the rest of
 * the chrome copy.
 */
export const bookingCopySchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  fields: z.object({
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
    guests: z.string().min(1),
    adults: z.string().min(1),
    children: z.string().min(1),
    rooms: z.string().min(1),
    promoCode: z.string().min(1),
  }),
  actions: z.object({
    submit: z.string().min(1),
    submitting: z.string().min(1),
    openGuests: z.string().min(1),
    done: z.string().min(1),
    back: z.string().min(1),
    next: z.string().min(1),
    close: z.string().min(1),
  }),
  /** `{count}` is replaced with the night count. */
  nights: z.object({ one: z.string().min(1), many: z.string().min(1) }),

  /**
   * The collapsed sticky bar. It restates the search rather than repeating the
   * form, so it needs its own count templates (`{count}`) and its own action
   * labels — the full-form labels in `fields` read wrong on a one-line summary.
   */
  summary: z.object({
    label: z.string().min(1),
    editDates: z.string().min(1),
    editGuests: z.string().min(1),
    collapse: z.string().min(1),
    guests: z.object({ one: z.string().min(1), many: z.string().min(1) }),
    rooms: z.object({ one: z.string().min(1), many: z.string().min(1) }),
    /** Joins check-in and check-out, e.g. `30 Aug – 31 Aug`. */
    dateSeparator: z.string().min(1),
    /** Joins the summary parts, e.g. `1 night · 2 guests`. */
    partSeparator: z.string().min(1),
  }),
  states: z.object({
    idle: z.string().min(1),
    loading: z.string().min(1),
    handoff: z.string().min(1),
    empty: z.string().min(1),
  }),
  validation: z.object({
    checkInPast: z.string().min(1),
    checkOutNotAfter: z.string().min(1),
    checkOutTooLong: z.string().min(1),
    checkInTooFarAhead: z.string().min(1),
    required: z.string().min(1),
  }),
  errors: z.object({
    configuration: z.string().min(1),
    engineDown: z.string().min(1),
    dates: z.string().min(1),
    stayTooLong: z.string().min(1),
    occupancy: z.string().min(1),
    noAvailability: z.string().min(1),
    generic: z.string().min(1),
  }),
  enquiryFallback: z.object({
    lead: z.string().min(1),
    action: z.string().min(1),
  }),
});

export type BookingCopy = z.infer<typeof bookingCopySchema>;
