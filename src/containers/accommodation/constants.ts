import { rooms } from "@/content/rooms";

/**
 * The four approved categories, in the source's own §4 order. Derived from
 * `content/rooms.ts`, which is already the "only publishable rate card" — the
 * legacy USD categories live in a non-exported constant there and cannot
 * reach this list even by accident (CLAUDE.md §0.4).
 */
export const roomSlugs = rooms.map((room) => room.id);

/**
 * The one category to flag as "Most requested" on the rooms grid and the
 * comparison. Traceable to its own strapline in `copy/rooms.ts` — "The one
 * guests ask for by name" — not an invented popularity claim.
 */
export const ROOM_POPULAR_ID = "deluxe-room";

/** Per-category hero/gallery assets, by the ids already in content/assets.ts. */
export const ROOM_ASSET_IDS: Record<string, string> = {
  "superior-room": "room-superior-room",
  "deluxe-room": "room-deluxe-room",
  "deluxe-suites": "room-deluxe-suites",
  "superior-suites": "room-superior-suites",
};

/**
 * Where a stay-package CTA points. TODO(EMIN-Q49): the enquiry form is the
 * confirmed fallback until the real booking-engine deep link is captured, so
 * every package routes to Contact — the same default as `content/ctas.ts`.
 */
export const PACKAGE_CTA_HREF = "/contact";

/** In-page anchor for the booking widget, shared by every "check availability" CTA. */
export const BOOKING_ANCHOR_ID = "book";

/** In-page anchor for the comparison table. */
export const COMPARISON_ANCHOR_ID = "compare";

/** Internal cross-sell out of Accommodation — labels resolve from `navigation`. */
export const CROSS_SELL_HREFS = ["/spa", "/dining", "/offers"];

/** In-page anchor for the room gallery, linked from the room hero. */
export const GALLERY_ANCHOR_ID = "gallery";

/**
 * Every angle delivered per category, lead shot first. The lead is the same
 * id as `ROOM_ASSET_IDS`, so the mosaic opens on the photograph the card and
 * the hero already showed. A category absent here falls back to its lead
 * alone rather than repeating a frame to pad the grid — `roomMosaic` has a
 * closing layout for a single photograph too.
 */
export const ROOM_GALLERY_IDS: Record<string, string[]> = {
  "superior-room": ["room-superior-room", "room-superior-room-2", "room-superior-room-3"],
  "deluxe-room": [
    "room-deluxe-room",
    "room-deluxe-room-2",
    "room-deluxe-room-3",
    "room-deluxe-room-4",
    "room-deluxe-room-5",
  ],
  "deluxe-suites": [
    "room-deluxe-suites",
    "room-deluxe-suites-2",
    "room-deluxe-suites-3",
    "room-deluxe-suites-4",
  ],
  "superior-suites": [
    "room-superior-suites",
    "room-superior-suites-2",
    "room-superior-suites-3",
    "room-superior-suites-4",
    "room-superior-suites-5",
    "room-superior-suites-6",
  ],
};
