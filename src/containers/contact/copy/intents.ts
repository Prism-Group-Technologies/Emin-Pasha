/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

/**
 * How each intent shapes the form. `dates` picks the date block the adaptive
 * form renders; `guestsLabel` is omitted where a headcount means nothing.
 */
export interface ContactIntentConfig {
  value: "stay" | "events" | "dining" | "wellness" | "general";
  label: string;
  blurb: string;
  icon: IconName;
  dates: "range" | "single" | "none";
  dateLabel?: string;
  guestsLabel?: string;
  messageLabel: string;
  /** Which desk picks it up — shown beside the form, so the visitor knows. */
  desk: string;
}

/**
 * The five things people actually write in about. This list is the single
 * source for the Zod enum (`schemas/contact.ts`), the intent tiles, the
 * per-intent fields and the route's inbox routing, so none of them can drift.
 */
export const contactIntents = [
  {
    value: "stay",
    label: "A stay",
    blurb: "Rooms, suites, rates and dates",
    icon: "king-bed",
    dates: "range",
    guestsLabel: "Guests",
    messageLabel: "Anything we should know? (optional)",
    desk: "Reservations desk",
  },
  {
    value: "events",
    label: "An event",
    blurb: "Meetings, weddings, private hire",
    icon: "celebration",
    dates: "single",
    dateLabel: "Event date",
    guestsLabel: "Expected attendees",
    messageLabel: "Tell us about the occasion (optional)",
    desk: "Events team",
  },
  {
    value: "dining",
    label: "A table",
    blurb: "Restaurants, terrace, private dining",
    icon: "restaurant",
    dates: "single",
    dateLabel: "Preferred date",
    guestsLabel: "Party size",
    messageLabel: "Occasion, dietary needs, time (optional)",
    desk: "Reservations desk",
  },
  {
    value: "wellness",
    label: "Spa & wellness",
    blurb: "Treatments, gym, pool passes",
    icon: "spa",
    dates: "single",
    dateLabel: "Preferred date",
    guestsLabel: "Number of people",
    messageLabel: "Which treatment or pass? (optional)",
    desk: "Spa & wellness team",
  },
  {
    value: "general",
    label: "Something else",
    blurb: "Press, partnerships, feedback",
    icon: "chat",
    dates: "none",
    messageLabel: "How can we help?",
    desk: "Front office",
  },
] as const satisfies readonly ContactIntentConfig[];

export type ContactIntentValue = (typeof contactIntents)[number]["value"];

const BY_ID = new Map<string, ContactIntentConfig>(contactIntents.map((i) => [i.value, i]));

/** Falls back to "general", so an unknown value can never blank the form. */
export function intentById(value: string): ContactIntentConfig {
  return BY_ID.get(value) ?? contactIntents[4];
}
