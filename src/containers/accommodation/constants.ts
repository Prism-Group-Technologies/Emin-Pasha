import { rooms } from "@/content/rooms";

/**
 * The four approved categories, in the source's own §4 order. Derived from
 * `content/rooms.ts`, which is already the "only publishable rate card" — the
 * legacy USD categories live in a non-exported constant there and cannot
 * reach this list even by accident (CLAUDE.md §0.4).
 */
export const roomSlugs = rooms.map((room) => room.id);

/** Per-category hero/gallery assets, by the ids already in content/assets.ts. */
export const ROOM_ASSET_IDS: Record<string, string> = {
  "superior-room": "room-superior-room",
  "garden-room": "room-garden-room",
  "garden-suites": "room-garden-suites",
  "superior-suites": "room-superior-suites",
};
