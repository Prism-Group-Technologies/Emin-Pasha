/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Swimming Pool page — the experience band
 * and the three private-hire packages. Kept in its own file, not
 * `copy/media.ts`, so neither crosses the repo's `max-lines` ceiling — the
 * same split `spaMedia.ts` makes. Every entry is `assetRefSchema`-validated
 * at module load and renders through the shared `AssetImage` atom as a named,
 * dimension-labelled stand-in that doubles as a shooting brief (CLAUDE.md §6.6).
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface MediaSeed {
  id: string;
  subject: string;
  altText: string;
  shape?: "landscape" | "portrait" | "wide";
}

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 1200, height: 1500 },
  wide: { width: 1600, height: 900 },
} as const;

const SEEDS: MediaSeed[] = [
  {
    id: "wellness-pool-gardens",
    subject:
      "The pool from the lawn at golden hour — stone coping, loungers under shade sails, planted gardens behind",
    altText: "The swimming pool set within the poolside gardens at The Emin Pasha Hotel & Spa",
    shape: "wide",
  },
  {
    id: "wellness-pool-private-hire",
    subject:
      "An evening poolside reception — festoon lights strung over the water, a bar set up on the lawn, guests with drinks",
    altText: "A poolside sundowner reception at The Emin Pasha Hotel & Spa",
  },
  {
    id: "wellness-pool-family-event",
    subject:
      "A daytime family party at the pool — children in the shallow end, a shaded buffet and cake table on the lawn",
    altText: "A family celebration at the Emin Pasha swimming pool",
  },
  {
    id: "wellness-pool-wedding-brunch",
    subject:
      "A relaxed wedding-weekend brunch on the pool lawn — long tables, linen, morning light through the palms",
    altText: "A wedding-weekend brunch beside the Emin Pasha swimming pool",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => {
  const { width, height } = DIMENSIONS[seed.shape ?? "landscape"];
  return {
    id: seed.id,
    page: "swimming-pool",
    subject: seed.subject,
    kind: "image" as const,
    width,
    height,
    priority: "low" as const,
    altText: seed.altText,
    status: "placeholder" as const,
  };
});

/** The pool placeholder photo slots, schema-checked at module load. */
export const poolAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(poolAssets.map((asset) => [asset.id, asset]));

/** Resolve one pool placeholder by id, or `undefined` if unknown. */
export function poolAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
