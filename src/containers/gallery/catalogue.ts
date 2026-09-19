import {
  GALLERY_CATEGORY_LABEL,
  GALLERY_CATEGORY_ORDER,
  type GalleryCategory,
} from "@/containers/gallery/anchors";
import { manifestCaptions } from "@/containers/gallery/copy/captions";
import { categoryOffers } from "@/containers/gallery/copy/categoryOffers";
import { collectionCopy } from "@/containers/gallery/copy/collections";
import { categoryForPage, interleaveByCategory, shapeFor } from "@/containers/gallery/galleryModel";
import { galleryPlaceholder, placeholderPhotos } from "@/containers/gallery/media";
import type { GalleryCollectionView, GalleryItem, TileShape } from "@/containers/gallery/types";
import { assets } from "@/content/assets";
import { whatsappGalleryViewUrl } from "@/lib/directions";
import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * The gallery's server-side view model. Builds plain `GalleryItem`s — asset,
 * caption, category, "book this view" price and a resolved WhatsApp href — so
 * the client islands receive serializable data and never import `content/*`
 * or Zod (DECISIONS.md D25).
 *
 * Open Graph, floor-plan and map assets are not photographs of the property,
 * and the two portraits are of people rather than places, so none of them
 * belongs on a wall whose every tile says "book this view".
 */
const EXCLUDED = new Set([
  "home-og-image",
  "meetings-kudara-floorplan",
  "contact-static-map",
  "story-emin-pasha-portrait",
  "story-gm-photo",
]);

function toItem(asset: AssetRef, category: GalleryCategory, title: string, shape: TileShape) {
  const offer = categoryOffers[category];
  const item: GalleryItem = {
    id: asset.id,
    asset,
    category,
    categoryLabel: GALLERY_CATEGORY_LABEL[category],
    title,
    shape,
    offer: { label: offer.label, priceUsd: offer.priceUsd, unit: offer.unit },
    whatsappHref: whatsappGalleryViewUrl(title),
  };
  return item;
}

const manifestItems = assets
  .filter((asset) => asset.kind === "image" && !EXCLUDED.has(asset.id))
  .flatMap((asset) => {
    const category = categoryForPage(asset.page);
    const title = manifestCaptions[asset.id] ?? asset.altText;
    return category ? [toItem(asset, category, title, shapeFor(asset.width, asset.height))] : [];
  });

const placeholderItems = placeholderPhotos.flatMap(({ seed, asset }) =>
  seed.category ? [toItem(asset, seed.category, seed.title, seed.shape)] : [],
);

/** Every photograph on the wall, dealt round-robin across categories. */
export const galleryItems: GalleryItem[] = interleaveByCategory(
  [...manifestItems, ...placeholderItems],
  GALLERY_CATEGORY_ORDER,
);

const itemById = new Map(galleryItems.map((item) => [item.id, item]));

/** One wall photograph by asset id. */
export function galleryItem(id: string): GalleryItem | undefined {
  return itemById.get(id);
}

/** Any gallery image — wall photograph or off-wall placeholder (lens, posters). */
export function galleryImage(id: string): AssetRef | undefined {
  return itemById.get(id)?.asset ?? galleryPlaceholder(id);
}

/** The six mood collections with their photographs resolved. */
export const galleryCollections: GalleryCollectionView[] = collectionCopy.map((copy) => ({
  slug: copy.slug,
  title: copy.title,
  mood: copy.mood,
  summary: copy.summary,
  story: copy.story,
  highlights: copy.highlights,
  bestFor: copy.bestFor,
  priceUsd: copy.priceUsd,
  priceUnit: copy.priceUnit,
  items: copy.assetIds.flatMap((id) => galleryItem(id) ?? []),
  whatsappHref: whatsappGalleryViewUrl(`${copy.title} collection`),
}));

export function findCollection(slug: string): GalleryCollectionView | undefined {
  return galleryCollections.find((collection) => collection.slug === slug);
}
