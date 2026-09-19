/**
 * In-page anchor ids and the offer-category union for the Offers page —
 * deliberately **import-free**, the same split `containers/wellness/anchors.ts`
 * makes. The client islands (the category filter, the sticky bar) need these
 * values, and pulling in the Zod-validated content layer to get them would drag
 * it into a client bundle (DECISIONS.md D25).
 */

/** The featured-offer spotlight directly under the hero. */
export const FEATURED_ANCHOR_ID = "featured";

/** The filterable offer grid — every "browse offers" CTA points here. */
export const OFFERS_ANCHOR_ID = "offers";

/** The seasonal calendar band. */
export const CALENDAR_ANCHOR_ID = "calendar";

/** The offer-alerts sign-up — every "notify me" CTA points here. */
export const ALERTS_ANCHOR_ID = "alerts";

/** The categories an offer can sit in, as named literals. */
export const OFFER_CATEGORY = {
  stay: "stay",
  dining: "dining",
  wellness: "wellness",
  corporate: "corporate",
  seasonal: "seasonal",
} as const;

export type OfferCategory = (typeof OFFER_CATEGORY)[keyof typeof OFFER_CATEGORY];

/** Filter-chip order and labels; the order the grid is written in too. */
export const OFFER_CATEGORY_LABEL: Record<OfferCategory, string> = {
  stay: "Stays",
  dining: "Dining",
  wellness: "Spa & wellness",
  corporate: "Corporate",
  seasonal: "Seasonal",
};

export const OFFER_CATEGORY_ORDER = Object.keys(OFFER_CATEGORY_LABEL) as OfferCategory[];
