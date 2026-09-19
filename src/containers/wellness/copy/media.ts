/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Spa & Wellness hub — the pillar cards, the
 * signature-treatment strip, the journey band and the packages. They live
 * here, colocated with the invented copy, rather than in `src/content/assets.ts`:
 * the treatments, packages and tiers are invented (TODO(EMIN-COPY)), so their
 * imagery cannot sit in the Zod-governed content layer that `check:content`
 * treats as approved. Promote both together once the copy is signed off.
 *
 * Every entry is still `assetRefSchema`-validated and renders through the
 * same `AssetImage` atom, so each ships as a named, dimension-labelled
 * stand-in (CLAUDE.md §6.6) that doubles as a shooting brief.
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface MediaSeed {
  id: string;
  subject: string;
  altText: string;
  /** Landscape 3:2 by default; portrait 4:5 for the treatment cards. */
  shape?: "landscape" | "portrait" | "wide";
}

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 1200, height: 1500 },
  wide: { width: 1600, height: 900 },
} as const;

const SEEDS: MediaSeed[] = [
  {
    id: "wellness-hub-hero",
    subject: "Hero — the spa relaxation lounge at dusk, lamplight and greenery",
    altText: "The Swanky Spa relaxation lounge at The Emin Pasha Hotel & Spa",
    shape: "wide",
  },
  {
    id: "wellness-pillar-spa",
    subject: "The spa — a treatment room set for a massage, warm towels, low light",
    altText: "A treatment room at the Swanky Spa & Wellness Centre",
  },
  {
    id: "wellness-pillar-gym",
    subject: "The gym — the strength floor with racks and natural light",
    altText: "The strength floor at the Emin Pasha Gym",
  },
  {
    id: "wellness-pillar-pool",
    subject: "The pool — the outdoor pool framed by the poolside gardens",
    altText: "The swimming pool set within the poolside gardens",
  },
  {
    id: "wellness-treatment-signature-massage",
    subject: "Treatment — a full-body signature massage in progress, hot stones",
    altText: "The Emin Pasha signature massage",
    shape: "portrait",
  },
  {
    id: "wellness-treatment-turkish-bath",
    subject: "Treatment — the heated marble slab of the Turkish bath, steam and light",
    altText: "The Turkish bath ritual at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "wellness-treatment-facial",
    subject: "Treatment — a facial in progress, serums and jade tools laid out",
    altText: "A tailored facial at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "wellness-treatment-sea-salt",
    subject: "Treatment — a deep sea-salt body scrub and wrap, minerals on skin",
    altText: "The deep sea-salt body ritual at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "wellness-treatment-pt",
    subject: "Treatment — a personal-training session on the gym floor, trainer coaching",
    altText: "A personal-training session at the Emin Pasha Gym",
    shape: "portrait",
  },
  {
    id: "wellness-journey",
    subject: "Journey — a guest in a robe walking the garden path to the spa",
    altText: "The walk through the gardens to the Swanky Spa",
  },
  {
    id: "wellness-package-day-retreat",
    subject: "Package — a spa day laid out: robe, sandals, tea, a book by the pool",
    altText: "The day-retreat package at the Swanky Spa",
  },
  {
    id: "wellness-package-couples",
    subject: "Package — a couple with sparkling wine in the relaxation lounge",
    altText: "The couples' escape package at the Swanky Spa",
  },
  {
    id: "wellness-package-corporate",
    subject: "Package — a small group in a wellness workshop, mats and water bottles",
    altText: "The corporate wellness day at the Emin Pasha Gym and Spa",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => {
  const { width, height } = DIMENSIONS[seed.shape ?? "landscape"];
  return {
    id: seed.id,
    page: "spa-and-wellness",
    subject: seed.subject,
    kind: "image" as const,
    width,
    height,
    priority: "low" as const,
    altText: seed.altText,
    status: "placeholder" as const,
  };
});

/** The wellness placeholder photo slots, schema-checked at module load. */
export const wellnessAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(wellnessAssets.map((asset) => [asset.id, asset]));

/** Resolve one wellness placeholder by id, or `undefined` if unknown. */
export function wellnessAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
