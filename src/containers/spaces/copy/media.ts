/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Lounges & Spaces page. Every entry is
 * `assetRefSchema`-validated at module load and renders through the shared
 * `AssetImage` atom as a named, dimension-labelled stand-in that doubles as a
 * shooting brief (CLAUDE.md §6.6) — the same construction as
 * `wellness/copy/poolMedia.ts`.
 *
 * Server-only in practice: it imports the Zod asset schema, so client
 * components must never import it (D25).
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

import { type MediaSeed, spaceSeeds } from "./mediaSeeds";
import { extraSeeds } from "./mediaSeedsExtra";

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 1200, height: 1500 },
  wide: { width: 1600, height: 900 },
  square: { width: 1000, height: 1000 },
} as const;

const toAsset = (seed: MediaSeed): AssetRefInput => ({
  id: seed.id,
  page: "lounges-and-spaces",
  subject: seed.subject,
  kind: "image",
  ...DIMENSIONS[seed.shape ?? "landscape"],
  priority: "low",
  altText: seed.altText,
  status: "placeholder",
});

/** The lounges placeholder photo slots, schema-checked at module load. */
export const spacesAssets: AssetRef[] = [...spaceSeeds, ...extraSeeds].map((seed) =>
  assetRefSchema.parse(toAsset(seed)),
);

const byId = new Map(spacesAssets.map((asset) => [asset.id, asset]));

/** Resolve one lounges placeholder by id, or `undefined` if unknown. */
export function spacesAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
