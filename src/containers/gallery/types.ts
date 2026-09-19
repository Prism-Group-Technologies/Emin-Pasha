import type { CollectionSlug, GalleryCategory } from "@/containers/gallery/anchors";
import type { AssetRef } from "@/schemas/content/assetRef";

/** Tile footprint on the photo wall — decided by the photograph's shape. */
export type TileShape = "landscape" | "portrait" | "wide" | "square";

/**
 * One photograph as the client islands see it: plain, serializable data built
 * on the server by `catalogue.ts`. The WhatsApp href is resolved there too, so
 * neither `content/whatsapp` nor Zod ever crosses the boundary (D25).
 */
export interface GalleryItem {
  id: string;
  asset: AssetRef;
  category: GalleryCategory;
  categoryLabel: string;
  /** Short, human caption — also the `{view}` in the WhatsApp message. */
  title: string;
  shape: TileShape;
  /** The stay / table / treatment this view can be booked as. */
  offer: { label: string; priceUsd: number; unit: string };
  whatsappHref: string;
}

/** A mood collection as the explorer island and the detail route consume it. */
export interface GalleryCollectionView {
  slug: CollectionSlug;
  title: string;
  mood: string;
  summary: string;
  story: string;
  highlights: string[];
  bestFor: string;
  priceUsd: number;
  priceUnit: string;
  items: GalleryItem[];
  whatsappHref: string;
}
