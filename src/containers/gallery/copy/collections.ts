/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { CollectionSlug } from "@/containers/gallery/anchors";

import { occasionCollections } from "./collectionsOccasions";
import { stayCollections } from "./collectionsStays";

export interface CollectionCopy {
  slug: CollectionSlug;
  title: string;
  /** One-line mood, shown on the switcher chip and the card. */
  mood: string;
  summary: string;
  /** The longer paragraph on the detail route and the explorer panel. */
  story: string;
  highlights: string[];
  bestFor: string;
  priceUsd: number;
  priceUnit: string;
  /** Asset ids — manifest (`content/assets.ts`) or gallery placeholders. Lead first. */
  assetIds: string[];
  /** ≤ 155 chars — the detail route's meta description. */
  metaDescription: string;
}

/** The six collections, in `COLLECTION_SLUGS` order. */
export const collectionCopy: CollectionCopy[] = [...stayCollections, ...occasionCollections];
