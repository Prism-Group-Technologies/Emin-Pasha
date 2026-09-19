import { format, isValid, parse } from "date-fns";

const ISO = "yyyy-MM-dd";

/**
 * The form keeps dates as ISO `yyyy-MM-dd` strings (see `schemas/contact.ts`);
 * the picker speaks `Date`. These two are the only crossing, so the local-date
 * parse — never `new Date("2026-10-10")`, which is UTC midnight and lands on
 * the previous day west of Greenwich — lives in exactly one place.
 */
export function toIsoDate(date: Date | null): string {
  return date && isValid(date) ? format(date, ISO) : "";
}

export function fromIsoDate(value: string | undefined): Date | null {
  if (!value) {
    return null;
  }
  const date = parse(value, ISO, new Date());
  return isValid(date) ? date : null;
}
