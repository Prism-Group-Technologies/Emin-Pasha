import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The homepage's scroll choreography, in scroll order.
 *
 * Section organisms do not choose their own reveal direction. Which side a
 * band should enter from is a fact about where it sits on the page, not about
 * what it contains — hard-coding `left` into `StorySection` would break the
 * alternation the moment the funnel was reordered, and would be simply wrong
 * on any other page that reused it. The order lives here, once, and the
 * container hands each section its direction as a prop.
 *
 * **This is a module, not a hook, on purpose.** Every section on this page is
 * a Server Component; a `useHomeMotion()` would either force the container
 * into a client boundary or be a hook in name only. There is no state, no
 * effect and no event here — it is a lookup table, so it is written as one.
 * `usePlanYourVisit` is a hook because it owns real selection state; this is
 * not that.
 *
 * The hero is absent deliberately: it is above the fold, so a reveal keyed to
 * entering the viewport has nothing to animate and would only risk flashing
 * the page's largest contentful paint.
 */
const SCROLL_ORDER = [
  "trustBar",
  "intro",
  "planYourVisit",
  "featureTiles",
  "roomsRates",
  "story",
  "pillars",
  "offers",
  "socialProof",
  "whyBookDirect",
  "location",
  "closingCta",
] as const;

export type HomeSectionId = (typeof SCROLL_ORDER)[number];

/**
 * Alternating left/right down the page, so each band is handed across the
 * viewport rather than pulled straight down twelve times in a row.
 *
 * Built from the order array rather than written out by hand: a literal map
 * would be one rename away from two neighbouring sections silently sharing a
 * direction, which reads as a missed beat rather than as a pattern.
 */
export const homeSectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<HomeSectionId, RevealDirection>;
