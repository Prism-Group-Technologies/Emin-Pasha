import type { IconName } from "@/components/atoms/Icon";
import { site } from "@/content/site";

/**
 * The live hero headline. `site.homepage.heroOptions` ships all three
 * approved options (02_CONTENT_SOURCE_OF_TRUTH.md §12.2) and
 * `defaultHeroId` selects one — so switching the homepage headline is a
 * one-character edit in `content/site.ts`, not a code change, exactly as the
 * source doc asks ("ship all three as switchable content constants").
 */
function resolveHero() {
  const selected =
    site.homepage.heroOptions.find((option) => option.id === site.homepage.defaultHeroId) ??
    site.homepage.heroOptions[0];
  if (!selected) {
    throw new Error("content/site.ts: homepage.heroOptions must not be empty");
  }
  return selected;
}

export const activeHero = resolveHero();

/**
 * Where each feature tile points. The tile *copy* lives in `content/site.ts`;
 * only the routing lives here, keyed by the tile ids already defined there —
 * so no label or supporting line is restated (CLAUDE.md §5.4).
 */
export const FEATURE_TILE_HREFS: Record<string, string> = {
  rooms: "/accommodation",
  dining: "/dining",
  spa: "/spa-and-wellness",
  pool: "/swimming-pool",
  events: "/meetings-and-events",
  story: "/our-story/emin-pasha",
};

/**
 * The amenity icon for each tile, keyed by `content/site.ts` tile id.
 *
 * This replaces the old span/offset map. The six tiles hold identical content
 * shapes — a one-word headline, one sentence, one CTA — so none of them earns
 * more grid area than any other, and forcing uneven spans produced cards that
 * their own content could not fill. A uniform grid is the honest pattern here;
 * hierarchy comes from the icon and the ordinal, not from area.
 */
export const FEATURE_TILE_ICONS: Record<string, IconName> = {
  rooms: "king-bed",
  dining: "restaurant",
  spa: "spa",
  pool: "pool",
  events: "celebration",
  story: "auto-stories",
};

/** Where each room category's detail page lives, keyed by `content/rooms.ts` id. */
export const ROOM_HREFS: Record<string, string> = {
  "superior-room": "/accommodation/superior-room",
  "garden-room": "/accommodation/garden-room",
  "garden-suites": "/accommodation/garden-suites",
  "superior-suites": "/accommodation/superior-suites",
};

/** Intro CTA destinations, in the order `site.homepage.introCtas` lists them. */
export const INTRO_CTA_HREFS = ["/our-story", "/accommodation"] as const;
