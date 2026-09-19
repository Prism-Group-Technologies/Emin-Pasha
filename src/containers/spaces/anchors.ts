/**
 * In-page anchor ids and the space id list for the Lounges & Spaces funnel —
 * deliberately **import-free**, the same split `containers/story/anchors.ts`
 * and `containers/wellness/anchors.ts` make. The client islands (the space
 * matcher, the reservation form, the sticky bar) need these values, and
 * pulling the Zod-validated content layer in to get them would drag it into a
 * client bundle (DECISIONS.md D25).
 */

/** The interactive "find your space" matcher. */
export const MATCHER_ANCHOR_ID = "find-your-space";

/** The three editorial space spotlights. */
export const SPACES_ANCHOR_ID = "the-spaces";

/** Priced private-hire tiers. */
export const PRIVATE_HIRE_ANCHOR_ID = "private-hire";

/** Lead capture — every "reserve" / "enquire" CTA on the page lands here. */
export const RESERVE_ANCHOR_ID = "reserve";

/**
 * The three approved §5 space ids, in page order. Mirrors `content/spaces.ts`
 * — `spaceIds.test.ts` fails the build the moment the two drift.
 */
export const SPACE_IDS = ["acropole-lounge", "mehmed-pasha-lounge", "equatorial-gardens"] as const;

export type SpaceId = (typeof SPACE_IDS)[number];
