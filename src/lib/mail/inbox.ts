import { identity } from "@/content/identity";
import type { EnquiryKind } from "@/lib/mail/types";

/**
 * Department routing, from the approved §1 NAP and §9 contact channels — the
 * source lists exactly two addresses, so nothing invents a third
 * (`events@`, `spa@` and the like do not exist).
 *
 * **Isomorphic on purpose.** This used to live in `lib/mail/index.ts`, which
 * is `server-only` because it reaches an adapter. The enquiry specs need the
 * same routing in the browser (the Web3Forms access key is chosen by which
 * desk owns the enquiry), so the table moved here where both sides can read
 * it. `lib/mail` re-exports it, so every server caller is unchanged.
 */
const INBOX: Record<EnquiryKind, string> = {
  booking: identity.reservationsEmail,
  // A named request to stay in one category, from the `RoomCard` dialog. Same
  // desk as `booking` — it is the same enquiry with a person attached.
  room: identity.reservationsEmail,
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
  // the spaces spec overrides `to` for private hire, which the events team
  // on the general inbox handles (the same split as `rfp`).
  spaces: identity.reservationsEmail,
  contact: identity.email,
  newsletter: identity.email,
};

export function inboxFor(kind: EnquiryKind): string {
  return INBOX[kind];
}
