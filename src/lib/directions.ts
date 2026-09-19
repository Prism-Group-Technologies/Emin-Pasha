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

/**
 * The Spa & Wellness hand-off — the wellness hub's sticky bar and every
 * "book a treatment / a session / a swim" CTA on the spa, gym and pool
 * pages. The guest picked that button over the on-page enquiry form, so the
 * opening line names the intent; it still promises nothing.
 */
export const whatsappWellnessUrl = whatsappChatUrl(whatsappOpenings.wellness);

/**
 * The Meetings & Events hand-off — the events funnel's sticky bar and every
 * "talk to the events team" CTA on the hub and venue pages. The organiser
 * picked that button over the RFP form, so the opening line names the intent;
 * it still promises nothing.
 */
export const whatsappEventsUrl = whatsappChatUrl(whatsappOpenings.events);

/**
 * The Offers hand-off where no single offer is named — the offers hero, the
 * sticky bar and the closing band.
 */
export const whatsappOffersUrl = whatsappChatUrl(whatsappOpenings.offers);

/**
 * The Airport Transfer hand-off — the transfer page's hero, sticky bar, fleet
 * cards and closing band. The traveller picked that button over the booking
 * form, so the opening line names the intent; it still promises nothing.
 */
export const whatsappTransferUrl = whatsappChatUrl(whatsappOpenings.transfer);

/**
 * The Lounges & Spaces hand-off — the page's hero, sticky bar, spotlights and
 * closing band. The guest chose WhatsApp over the reservation form, so the
 * opening line names a lounge table or the gardens; it promises nothing.
 */
export const whatsappLoungesUrl = whatsappChatUrl(whatsappOpenings.lounges);

/**
 * The per-offer "claim" hand-off. The only parameterised opening: the offer
 * title fills the reviewed `offerClaim` template, and callers pass titles from
 * the Offers page catalogue only — never user input — so the set of messages
 * the property can receive stays closed.
 */
export function whatsappOfferClaimUrl(offerTitle: string): string {
  return whatsappChatUrl(whatsappOpenings.offerClaim.replace("{offer}", offerTitle));
}

/**
 * The Gallery hand-off where no single view is named — the gallery hero,
 * sticky bar and closing band.
 */
export const whatsappGalleryUrl = whatsappChatUrl(whatsappOpenings.gallery);

/**
 * The per-photo / per-collection "ask about this" hand-off. Callers pass
 * captions and collection titles from the gallery catalogue only — never user
 * input — so the set of messages the property can receive stays closed.
 */
export function whatsappGalleryViewUrl(viewTitle: string): string {
  return whatsappChatUrl(whatsappOpenings.galleryView.replace("{view}", viewTitle));
}

/**
 * The FAQ hand-off where no topic is named — the FAQ hero, the "can't find
 * your answer" card, the sticky bar and the closing band.
 */
export const whatsappFaqUrl = whatsappChatUrl(whatsappOpenings.faq);

/**
 * The per-topic "ask about this" hand-off under each FAQ answer. Callers pass
 * a phrase from the FAQ page's fixed topic list only — never the visitor's
 * search text — so the set of messages the property can receive stays closed.
 */
export function whatsappFaqTopicUrl(topicPhrase: string): string {
  return whatsappChatUrl(whatsappOpenings.faqTopic.replace("{topic}", topicPhrase));
}

/**
 * The legal pages' hand-off where no policy topic is named — the heroes,
 * sticky bars and closing bands on Privacy, Cookies, Terms and Accessibility.
 */
export const whatsappLegalUrl = whatsappChatUrl(whatsappOpenings.legal);

/**
 * The per-topic legal hand-off — "ask about this section" and each data-rights
 * request card. Callers pass a phrase from `containers/legal/anchors.ts` only,
 * never visitor input, so the set of messages stays closed.
 */
export function whatsappLegalTopicUrl(topicPhrase: string): string {
  return whatsappChatUrl(whatsappOpenings.legalTopic.replace("{topic}", topicPhrase));
}
