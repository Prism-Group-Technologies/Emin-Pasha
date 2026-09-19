/**
 * In-page anchor ids for the Our Story funnel — deliberately **import-free**,
 * the same split `containers/dining/anchors.ts` and `containers/wellness/anchors.ts`
 * make. The story client islands (the enquiry form, the sticky CTA, the FAQ
 * accordion) need these values, and pulling in the Zod-validated content layer
 * to get them would drag it into a client bundle (DECISIONS.md D25).
 */

/** Lead-capture surface — every on-page "plan a stay" / "enquire" CTA points here. */
export const STAY_ANCHOR_ID = "stay";

/** The preserved pillar article (`StoryArticle` owns the `the-life` sub-anchor). */
export const STORY_ANCHOR_ID = "the-full-story";

/** The visual journey map — the Equatorial Line turned horizontal. */
export const JOURNEY_ANCHOR_ID = "journey";

/** The "named from this story" cross-link band. */
export const NAMED_AFTER_ANCHOR_ID = "named-from-this-story";
