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
export const ROOM_POPULAR_ID = "garden-room";

/** Per-category hero/gallery assets, by the ids already in content/assets.ts. */
export const ROOM_ASSET_IDS: Record<string, string> = {
  "superior-room": "room-superior-room",
  "garden-room": "room-garden-room",
  "garden-suites": "room-garden-suites",
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
