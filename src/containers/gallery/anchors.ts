/**
 * In-page anchor ids, category ids and collection slugs for the Gallery
 * funnel — deliberately **import-free**, the same split
 * `containers/spaces/anchors.ts` and `containers/offers/anchors.ts` make. The
 * client islands (filter, lightbox, collection explorer, sticky bar) need
 * these values, and pulling the Zod-validated content layer in to get them
 * would drag it into a client bundle (DECISIONS.md D25).
 */

/** The interactive mood-collection explorer. */
export const COLLECTIONS_ANCHOR_ID = "collections";

/** The full, filterable photo wall. */
export const PHOTOS_ANCHOR_ID = "all-photos";

/** The film reel + virtual tour band. */
export const FILM_ANCHOR_ID = "film";

/** Gallery filter categories, in chip order. */
export const GALLERY_CATEGORY_ORDER = [
  "rooms",
  "dining",
  "spaces",
  "wellness",
  "events",
  "estate",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORY_ORDER)[number];

export const GALLERY_CATEGORY_LABEL: Record<GalleryCategory, string> = {
  rooms: "Rooms & Suites",
  dining: "Dining",
  spaces: "Lounges & Gardens",
  wellness: "Spa, Gym & Pool",
  events: "Events & Weddings",
  estate: "The Estate",
};

/**
 * The six mood collections, in page order. Each is also a static route at
 * `/gallery/<slug>` — `collectionSlugs.test.ts` fails the build if this list,
 * the copy layer and `content/routes.ts` drift apart.
 */
export const COLLECTION_SLUGS = [
  "romance-and-honeymoons",
  "business-in-nakasero",
  "spa-weekend",
  "garden-weddings",
  "family-escapes",
  "after-dark",
] as const;

export type CollectionSlug = (typeof COLLECTION_SLUGS)[number];
