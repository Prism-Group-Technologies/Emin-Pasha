import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The FAQ funnel's scroll choreography, in scroll order — the same pattern as
 * `containers/offers/motion.ts`. The hero is absent on purpose: it is above
 * the fold, so a viewport-keyed reveal would only risk flashing the LCP.
 */
const SCROLL_ORDER = ["quick", "questions", "guides", "voices", "closing", "related"] as const;

export type FaqSectionId = (typeof SCROLL_ORDER)[number];

export const faqSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<FaqSectionId, RevealDirection>;
