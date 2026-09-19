import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The Spa & Wellness hub's scroll choreography, in scroll order — the same
 * pattern as `containers/dining/motion.ts` and `containers/accommodation/motion.ts`.
 *
 * Section organisms do not choose their own reveal direction: which side a
 * band enters from is a fact about where it sits on the page, so the order
 * lives here once and the container hands each section its direction as a
 * prop. A module, not a hook — no state, just a lookup table.
 *
 * The hero is absent on purpose: it is above the fold, so a reveal keyed to
 * entering the viewport has nothing to animate and would only risk flashing
 * the largest contentful paint.
 */
const SCROLL_ORDER = [
  "pillars",
  "treatments",
  "packages",
  "journey",
  "membership",
  "enquiry",
  "voices",
  "faq",
  "closing",
  "related",
] as const;

export type WellnessSectionId = (typeof SCROLL_ORDER)[number];

export const wellnessSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<WellnessSectionId, RevealDirection>;
