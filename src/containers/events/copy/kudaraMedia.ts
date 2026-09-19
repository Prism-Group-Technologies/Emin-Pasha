/**
 * Placeholder photo slots for the bespoke Kudara Hall sections. Colocated with
 * the invented copy rather than in `src/content/assets.ts` for the same reason
 * as `./media.ts` — the set-ups they show are not yet in the approved content
 * layer. Each is `assetRefSchema`-validated, so it ships as a named,
 * dimension-labelled stand-in that doubles as a shooting brief.
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface Seed {
  id: string;
  subject: string;
  altText: string;
  shape?: "landscape" | "wide";
}

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  wide: { width: 1600, height: 900 },
} as const;

const SEEDS: Seed[] = [
  {
    id: "kudara-banquet",
    subject:
      "Kudara Hall flipped from conference to a gala banquet — dressed rounds, centrepieces, lit stage, dance floor",
    altText: "Kudara Hall dressed for a gala banquet",
    shape: "wide",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => {
  const { width, height } = DIMENSIONS[seed.shape ?? "landscape"];
  return {
    id: seed.id,
    page: "meetings-and-events",
    subject: seed.subject,
    kind: "image" as const,
    width,
    height,
    priority: "low" as const,
    altText: seed.altText,
    status: "placeholder" as const,
  };
});

/** The Kudara placeholder slots, schema-checked at module load. */
export const kudaraAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));
const byId = new Map(kudaraAssets.map((asset) => [asset.id, asset]));

/** Resolve one Kudara placeholder slot by id, or `undefined` if unknown. */
export function kudaraAsset(id: string): AssetRef | undefined {
  return byId.get(id);
}
