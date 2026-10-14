import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * The least a photograph has to carry to be shown in a lightbox: something to
 * key it by, the image itself, and a line of human text for the thumbnail's
 * accessible name.
 *
 * It exists so the stage and the thumbnail strip are not tied to the gallery's
 * own `GalleryItem`, which also carries a category, a bookable offer and a
 * WhatsApp href — none of which a lightbox needs in order to show a picture.
 * The gallery maps its richer item onto this shape and keeps its own caption
 * block below the stage; `PhotoRail` uses it directly.
 */
export interface LightboxPhoto {
  id: string;
  asset: AssetRef;
  /** Short, human caption — the thumbnail's accessible name. */
  caption: string;
}
