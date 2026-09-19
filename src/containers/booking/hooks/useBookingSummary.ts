"use client";

import { format, parseISO } from "date-fns";

import { DISPLAY_DATE_FORMAT } from "@/config/booking";
import type { BookingCopy } from "@/schemas/content/booking";

const plural = (template: { one: string; many: string }, count: number) =>
  (count === 1 ? template.one : template.many).replace("{count}", String(count));

/**
 * `2 guests · 1 room`. Exported because the hero's collapsed guests field
 * shows the same phrase without having any dates to summarise — and the
 * pluralisation rules are supposed to sit in one testable place, which a
 * second copy in that component would quietly undo.
 */
export function formatGuests(
  copy: BookingCopy,
  adults: number,
  children: number,
  rooms: number,
): string {
  const { summary } = copy;
  return [plural(summary.guests, adults + children), plural(summary.rooms, rooms)].join(
    summary.partSeparator,
  );
}

export interface BookingSummaryValues {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  nights: number;
}

export interface BookingSummary {
  /** `30 Aug 2026 – 31 Aug 2026` */
  dates: string;
  /** `1 night` — kept apart so it can be de-emphasised beside the dates. */
  nights: string;
  /** `2 guests · 1 room` */
  guests: string;
  /** The whole thing on one line, for the bar's accessible name. */
  spoken: string;
}

/**
 * Turns a search into the strings the collapsed bar shows. A plain function of
 * its inputs — no store read, no form read — so the bar, the mobile sheet and
 * any future variant can all render the same sentence, and so the pluralisation
 * rules sit in one testable place instead of in three components' JSX.
 */
export function useBookingSummary(values: BookingSummaryValues, copy: BookingCopy): BookingSummary {
  const { summary, nights: nightsCopy } = copy;
  const dates = [values.checkIn, values.checkOut]
    .map((value) => format(parseISO(value), DISPLAY_DATE_FORMAT))
    .join(summary.dateSeparator);

  const nights = plural(nightsCopy, values.nights);
  const guests = formatGuests(copy, values.adults, values.children, values.rooms);

  return { dates, nights, guests, spoken: [dates, nights, guests].join(summary.partSeparator) };
}
