/**
 * In-page anchor ids for the Contact funnel — deliberately **import-free**,
 * the same split `containers/story/anchors.ts` and `containers/wellness/anchors.ts`
 * make. The client islands (the enquiry form, the sticky bar, the live map)
 * need these values, and pulling in the Zod-validated content layer to get
 * them would drag it into a client bundle (DECISIONS.md D25).
 */

/** The four channel cards directly under the hero. */
export const CHANNELS_ANCHOR_ID = "reach-us";

/** Lead-capture surface — every on-page "enquire" CTA points here. */
export const ENQUIRE_ANCHOR_ID = "enquire";

/** The live map, NAP and drive times. */
export const GETTING_HERE_ANCHOR_ID = "getting-here";
