/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { GalleryCategory } from "@/containers/gallery/anchors";
import type { TileShape } from "@/containers/gallery/types";

/**
 * One placeholder photograph slot. `category` is omitted for frames that
 * never appear on the photo wall (guest lens tiles, film and tour posters).
 */
export interface GallerySeed {
  id: string;
  category?: GalleryCategory;
  /** The display caption — doubles as the shooting brief. */
  title: string;
  altText: string;
  shape: TileShape;
}
