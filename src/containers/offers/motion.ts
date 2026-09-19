import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The Offers funnel's scroll choreography, in scroll order — the same pattern
 * as `containers/contact/motion.ts`. The hero is absent on purpose: it is
 * above the fold, so a viewport-keyed reveal would only risk flashing the
 * largest contentful paint.
 */
const SCROLL_ORDER = [
  "featured",
  "grid",
  "perks",
  "calendar",
  "alerts",
  "faq",
  "closing",
  "related",
] as const;

export type OffersSectionId = (typeof SCROLL_ORDER)[number];

export const offersSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<OffersSectionId, RevealDirection>;
