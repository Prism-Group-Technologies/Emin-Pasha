import { identity } from "@/content/identity";
import { whatsappOpenings } from "@/content/whatsapp";

/**
 * Maps deep link for the sticky "Directions" action.
 *
 * Built from the approved NAP address string
 * (02_CONTENT_SOURCE_OF_TRUTH.md §1) via Google's documented
 * `search?api=1&query=` form, which resolves a free-text address server-side.
 * It deliberately does **not** use a lat/long pin: the property's real
 * coordinates are TODO(EMIN-Q20) and inventing them would put a fabricated
 * fact in a live navigation link. Swap to a coordinate `query` once Q20 is
 * answered, and this is the only line that changes.
 */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  identity.address,
)}`;

export const telephoneUrl = `tel:${identity.telephone.replace(/\s/g, "")}`;

export const emailUrl = `mailto:${identity.email}`;

/**
 * `wa.me/<number>?text=<encoded>` is WhatsApp's own documented click-to-chat
 * form: the number comes from the approved NAP (§1) via `identity`, the text
 * from `content/whatsapp`, and the two are joined here rather than at each
 * call site so the query-string form exists exactly once.
 *
 * The message is only ever *pre-filled*, never sent — the guest sees it in
 * the compose box and can replace every word. That is the whole reason to
 * prefill: a thread that opens with context is answered faster than an empty
 * one, without taking the first word out of the guest's hands.
 *
 * Deliberately **not exported**. Every WhatsApp link on the site resolves to
 * one of the two constants below, so the set of messages the property can
 * receive under a guest's name stays closed and reviewable in
 * `content/whatsapp.ts` (CLAUDE.md §5.4).
 */
function whatsappChatUrl(message: string): string {
  return `${identity.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

/**
 * The default hand-off — header, mobile action bar, the floating dock, and
 * the NAP rows in the footer, on the contact page and on the home page.
 * Nothing about the guest's intent is known at any of those, so the opening
 * line does not presume one.
 */
export const whatsappUrl = whatsappChatUrl(whatsappOpenings.general);

/**
 * For the two home-page surfaces that sit directly beside a booking CTA —
 * the book-direct argument and the closing block. The guest has already
 * declared the intent by choosing that button over the ones around it, so
 * making them retype it is friction with no purpose.
 */
export const whatsappBookingUrl = whatsappChatUrl(whatsappOpenings.booking);
