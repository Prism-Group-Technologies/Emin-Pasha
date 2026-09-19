import type { GalleryCategory } from "@/containers/gallery/anchors";
import type { TileShape } from "@/containers/gallery/types";

/**
 * Pure rules behind the photo wall — kept import-light and free of the content
 * layer so they are unit-tested in isolation (`galleryModel.test.ts`).
 */

const PAGE_PREFIXES: [GalleryCategory, string[]][] = [
  ["rooms", ["accommodation"]],
  ["dining", ["dining"]],
  ["spaces", ["lounges"]],
  ["wellness", ["spa"]],
  ["events", ["meetings", "weddings"]],
  ["estate", ["gallery", "home", "our-story", "story", "experiences"]],
];

/**
 * Maps a manifest asset's `page` onto a wall category. Derived from the
 * manifest's own field rather than hand-listed, so every photograph the
 * manifest gains lands on the wall without drifting from ASSET_MANIFEST.md.
 */
export function categoryForPage(page: string): GalleryCategory | undefined {
  return PAGE_PREFIXES.find(([, prefixes]) =>
    prefixes.some((prefix) => page.startsWith(prefix)),
  )?.[0];
}

/** A photograph's tile footprint from its intrinsic ratio. */
export function shapeFor(width: number, height: number): TileShape {
  const ratio = width / height;
  if (ratio >= 1.7) {
    return "wide";
  }
  if (ratio <= 0.9) {
    return "portrait";
  }
  return ratio <= 1.1 ? "square" : "landscape";
}

/**
 * Deals items round-robin across categories, so the unfiltered wall reads as
 * one mixed estate rather than six stacked blocks. Stable: order within a
 * category is preserved, and filtering a category returns it untouched.
 */
export function interleaveByCategory<T extends { category: GalleryCategory }>(
  items: T[],
  order: readonly GalleryCategory[],
): T[] {
  const queues = order.map((category) => items.filter((item) => item.category === category));
  const longest = Math.max(0, ...queues.map((queue) => queue.length));
  return Array.from({ length: longest }, (_, round) =>
    queues.flatMap((queue) => queue.slice(round, round + 1)),
  ).flat();
}
