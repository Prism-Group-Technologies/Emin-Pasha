import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The Lounges & Spaces funnel's scroll choreography, in scroll order — the
 * same pattern as `containers/story/motion.ts`. Sections do not choose their
 * own reveal direction: which side a band enters from is a fact about where
 * it sits on the page, so the order lives here once.
 *
 * The hero is absent on purpose — it is above the fold, so a viewport-keyed
 * reveal would only risk flashing the largest contentful paint.
 */
const SCROLL_ORDER = [
  "assurance",
  "matcher",
  "spaces",
  "compare",
  "day",
  "experiences",
  "rhythm",
  "privateHire",
  "moments",
  "circle",
  "voices",
  "reserve",
  "faq",
  "closing",
  "related",
] as const;

export type SpacesSectionId = (typeof SCROLL_ORDER)[number];

export const spacesSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<SpacesSectionId, RevealDirection>;
