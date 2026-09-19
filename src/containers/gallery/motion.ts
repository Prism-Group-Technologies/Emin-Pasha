import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The Gallery funnel's scroll choreography, in scroll order — the same
 * pattern as `containers/spaces/motion.ts`. The hero is absent on purpose: it
 * is above the fold, so a viewport-keyed reveal would only risk flashing the
 * largest contentful paint.
 */
const SCROLL_ORDER = [
  "collections",
  "stories",
  "photos",
  "film",
  "stats",
  "lens",
  "faq",
  "closing",
  "related",
] as const;

export type GallerySectionId = (typeof SCROLL_ORDER)[number];

export const gallerySectionMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<GallerySectionId, RevealDirection>;

/** The collection detail route's order — intro, photos, siblings, faq, closing. */
const DETAIL_ORDER = ["intro", "photos", "others", "closing"] as const;

export const collectionSectionMotion = Object.fromEntries(
  DETAIL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<(typeof DETAIL_ORDER)[number], RevealDirection>;
