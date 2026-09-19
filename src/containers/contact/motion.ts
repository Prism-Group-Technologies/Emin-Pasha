import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The Contact funnel's scroll choreography, in scroll order — the same
 * pattern as `containers/story/motion.ts`. The hero is absent on purpose: it
 * is above the fold, so a viewport-keyed reveal would only risk flashing the
 * largest contentful paint.
 */
const SCROLL_ORDER = [
  "channels",
  "enquiry",
  "gettingHere",
  "arrival",
  "team",
  "voices",
  "faq",
  "closing",
  "related",
] as const;

export type ContactSectionId = (typeof SCROLL_ORDER)[number];

export const contactSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<ContactSectionId, RevealDirection>;
