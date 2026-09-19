import { z } from "zod";

/**
 * Pre-filled WhatsApp opening lines — the first message already sitting in
 * the guest's compose box when a `wa.me` link opens.
 *
 * A **closed set**, deliberately. Every string here is put in a guest's mouth
 * and sent to the property under their name, so the whole inventory has to be
 * reviewable in one screen rather than scattered across the call sites that
 * link out. Adding an intent means adding a key here and getting it signed
 * off — which is the point.
 *
 * The same rule as the rest of the content layer applies, and applies harder:
 * **no factual claim.** No rate, no availability, no reply time. A guest whose
 * own opening message says "you reply within minutes" has been handed a
 * promise the property never made.
 *
 * Status: TODO(EMIN-Q68) — chrome copy pending client sign-off, same as
 * `content/shell.ts` (DECISIONS.md D24).
 */
export const whatsappOpeningsSchema = z.object({
  /** Default. Chrome and NAP rows, where the guest's intent is unknown. */
  general: z.string().min(1),
  /** Surfaces that sit beside a booking CTA and have already named the intent. */
  booking: z.string().min(1),
  /**
   * Spa & Wellness surfaces — the hub's sticky bar and every "book a
   * treatment / a session / a swim" CTA on the wellness pages. The guest has
   * chosen that button over the enquiry form, so the intent is already named;
   * still no factual claim, per the rule above.
   */
  wellness: z.string().min(1),
  /**
   * Meetings & Events surfaces — the events funnel's sticky bar and every
   * "talk to the events team" CTA on the hub and venue pages. The organiser
   * picked that button over the RFP form, so the opening line names the
   * intent; it still promises nothing — no capacity, rate or reply time.
   */
  events: z.string().min(1),
  /**
   * Offers page chrome — the hero's secondary CTA, the sticky bar and the
   * closing band, where the guest wants an offer but has not named one.
   */
  offers: z.string().min(1),
  /**
   * Airport Transfer surfaces — the transfer page's hero, sticky bar, fleet
   * and closing CTAs. The traveller picked that button over the booking form,
   * so the opening line names the intent; it still promises nothing — no
   * fare, journey time or availability.
   */
  transfer: z.string().min(1),
  /**
   * Lounges & Spaces surfaces — the page's hero, sticky bar, spotlights and
   * closing band. The guest picked WhatsApp over the reservation form, so the
   * opening line names the intent (a lounge table, a garden, private hire);
   * it still promises nothing — no availability, minimum spend or reply time.
   */
  lounges: z.string().min(1),
  /**
   * Offers page "claim" buttons. A **template**: `{offer}` is replaced with
   * the offer's own title by `whatsappOfferClaimUrl`, and titles only ever
   * come from the page's reviewed offer catalogue — so the set of messages
   * stays closed. Still no factual claim: no price, saving or availability.
   */
  offerClaim: z.string().includes("{offer}"),
  /**
   * Gallery page chrome — the hero, sticky bar and closing band, where the
   * visitor has been looking at the estate but has not named a view.
   */
  gallery: z.string().min(1),
  /**
   * Gallery "ask about this view / collection" buttons. A **template**:
   * `{view}` is replaced by `whatsappGalleryViewUrl` with a photo caption or
   * collection title from the gallery's reviewed catalogue only — never user
   * input — so the set of messages stays closed. No price or availability.
   */
  galleryView: z.string().includes("{view}"),
  /**
   * FAQ page chrome — the hero, the "can't find your answer" card, the sticky
   * bar and the closing band, where the visitor has a question the page did
   * not answer. Names no topic and promises nothing.
   */
  faq: z.string().min(1),
  /**
   * FAQ "ask about this" links under each answer. A **template**: `{topic}`
   * is replaced by `whatsappFaqTopicUrl` with a phrase from the FAQ page's
   * fixed topic list (`containers/faq/anchors.ts`) only — never user input,
   * never the search box — so the set of messages stays closed.
   */
  faqTopic: z.string().includes("{topic}"),
  /**
   * Legal page chrome — the Privacy, Cookie, Terms, Accessibility and Cookie
   * Settings heroes, sticky bars and closing bands, where the visitor has a
   * question about a policy but has not named one. Promises nothing.
   */
  legal: z.string().min(1),
  /**
   * Legal "ask about this" and data-rights request links. A **template**:
   * `{topic}` is replaced by `whatsappLegalTopicUrl` with a phrase from the
   * fixed lists in `containers/legal/anchors.ts` only — never user input — so
   * the set of messages stays closed. No reply time or outcome is promised.
   */
  legalTopic: z.string().includes("{topic}"),
});

export type WhatsAppOpenings = z.infer<typeof whatsappOpeningsSchema>;
