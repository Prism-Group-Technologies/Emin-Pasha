/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./copy/index.ts.
 *
 * Placeholder photo slots for the Gallery. Every entry is
 * `assetRefSchema`-validated at module load and renders through the shared
 * `AssetImage` atom as a named, dimension-labelled stand-in that doubles as a
 * shooting brief (CLAUDE.md §6.6) — the same construction as
 * `spaces/copy/media.ts`.
 *
 * Server-only in practice: it imports the Zod asset schema, so client
 * components must never import it (D25).
 */
import type { GallerySeed } from "@/containers/gallery/copy/seedTypes";
import { extraSeeds } from "@/containers/gallery/copy/seedsExtras";
import { leisureSeeds } from "@/containers/gallery/copy/seedsLeisure";
import { occasionSeeds } from "@/containers/gallery/copy/seedsOccasions";
import { staySeeds } from "@/containers/gallery/copy/seedsStay";
import type { TileShape } from "@/containers/gallery/types";
import { type AssetRef, assetRefSchema } from "@/schemas/content/assetRef";

const DIMENSIONS: Record<TileShape, { width: number; height: number }> = {
  landscape: { width: 1500, height: 1000 },
  portrait: { width: 1200, height: 1500 },
  wide: { width: 1600, height: 900 },
  square: { width: 1000, height: 1000 },
};

const toAsset = (seed: GallerySeed): AssetRef =>
  assetRefSchema.parse({
    id: seed.id,
    page: "gallery",
    subject: seed.title,
    kind: "image",
    ...DIMENSIONS[seed.shape],
    priority: "low",
    altText: seed.altText,
    status: "placeholder",
  });

/** Every placeholder seed paired with its validated asset. */
export const placeholderPhotos = [
  ...staySeeds,
  ...leisureSeeds,
  ...occasionSeeds,
  ...extraSeeds,
].map((seed) => ({ seed, asset: toAsset(seed) }));

const byId = new Map(placeholderPhotos.map((photo) => [photo.asset.id, photo.asset]));

/** Resolve one gallery placeholder by id, or `undefined` if unknown. */
export function galleryPlaceholder(id: string): AssetRef | undefined {
  return byId.get(id);
}
