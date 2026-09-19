import "server-only";

import { identity } from "@/content/identity";
import { consoleAdapter } from "@/lib/mail/consoleAdapter";
import type { EnquiryKind, MailAdapter, MailMessage, MailResult } from "@/lib/mail/types";

export type { EnquiryKind, MailMessage, MailResult } from "@/lib/mail/types";

/**
 * Department routing, from the approved §1 NAP and §9 contact channels — the
 * source lists exactly two addresses, so nothing invents a third
 * (`events@`, `spa@` and the like do not exist).
 */
const INBOX: Record<EnquiryKind, string> = {
  booking: identity.reservationsEmail,
  rfp: identity.email,
  spa: identity.email,
  // Table reservations are handled by the reservations desk, the same team
  // that fields room bookings — no separate dining@ address exists (§1).
  dining: identity.reservationsEmail,
  // "Stay in the story" enquiries are room-booking leads — same desk, same
  // reasoning as dining. No separate address exists (§1).
  story: identity.reservationsEmail,
  // Transfers are arranged by reservations — the approved §8 copy says so
  // ("Arrange transfers at reservations@eminpasha.com").
  transfer: identity.reservationsEmail,
  // Lounge tables, experiences and photoshoots go to reservations by default;
  // the spaces route overrides `to` for private hire, which the events team
  // on the general inbox handles (the same split as `rfp`).
  spaces: identity.reservationsEmail,
  contact: identity.email,
  newsletter: identity.email,
};

export function inboxFor(kind: EnquiryKind): string {
  return INBOX[kind];
}

/**
 * The active adapter. Swapping providers is this one line — everything else
 * depends on `MailAdapter`, not on a vendor (TODO(EMIN-Q34)).
 */
const adapter: MailAdapter = consoleAdapter;

export function sendEnquiry(message: MailMessage): Promise<MailResult> {
  return adapter.send(message);
}
