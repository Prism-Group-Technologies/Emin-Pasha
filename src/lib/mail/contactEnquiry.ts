import "server-only";

import { contactTimeOptions, replyChannelOptions } from "@/containers/contact/copy/form";
import { intentById } from "@/containers/contact/copy/intents";
import { identity } from "@/content/identity";
import type { ContactIntent, ContactValues } from "@/schemas/contact";

type Field = { label: string; value: string };

/**
 * Department routing for the adaptive Contact form, from the two approved
 * inboxes only (§1) — no `events@` or `spa@` is invented. Stay and dining are
 * reservations-desk leads, the same desk the Dining and Story forms feed;
 * events, wellness and general go to the front office, like the RFP and spa
 * forms do.
 */
const INTENT_INBOX: Record<ContactIntent, string> = {
  stay: identity.reservationsEmail,
  dining: identity.reservationsEmail,
  events: identity.email,
  wellness: identity.email,
  general: identity.email,
};

const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

const orDash = (value: string | undefined) => (value ? value : "—");

export const contactInbox = (values: ContactValues): string => INTENT_INBOX[values.intent];

export const contactSubject = (values: ContactValues): string =>
  `Website enquiry — ${intentById(values.intent).label}`;

/**
 * Only the fields the chosen intent actually rendered: a visitor who opened
 * "A stay", typed dates, then switched to "Something else" should not send the
 * desk a stay's arrival date under a press enquiry.
 */
function intentFields(values: ContactValues): Field[] {
  const config = intentById(values.intent);
  const dates: Record<typeof config.dates, Field[]> = {
    range: [
      { label: "Arrival", value: orDash(values.arrival) },
      { label: "Departure", value: orDash(values.departure) },
    ],
    single: [{ label: config.dateLabel ?? "Date", value: orDash(values.eventDate) }],
    none: [],
  };
  const guests = config.guestsLabel
    ? [{ label: config.guestsLabel, value: orDash(values.guests) }]
    : [];
  return [{ label: "About", value: config.label }, ...dates[config.dates], ...guests];
}

export function contactFields(values: ContactValues): Field[] {
  return [
    ...intentFields(values),
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: orDash(values.phone) },
    { label: "Country", value: orDash(values.country) },
    { label: "Reply by", value: labelOf(replyChannelOptions, values.replyChannel) },
    { label: "Best time", value: labelOf(contactTimeOptions, values.contactTime) },
    { label: "Message", value: orDash(values.message) },
  ];
}
