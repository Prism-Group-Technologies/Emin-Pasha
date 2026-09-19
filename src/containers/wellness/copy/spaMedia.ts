/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the spa-only conversion bands — the therapist
 * profiles, the Turkish-bath ritual band and the two group offers. Kept in
 * its own file, not `copy/media.ts`, so neither crosses the repo's
 * `max-lines` ceiling. Same construction: every entry is `assetRefSchema`-
 * validated at module load and renders through the shared `AssetImage` atom
 * as a named, dimension-labelled stand-in that doubles as a shooting brief
 * (CLAUDE.md §6.6).
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
    id: "spa-ritual-hammam",
    subject: "Ritual — the heated marble slab of the Turkish bath, foam and steam, low light",
    altText: "The heated marble of the Turkish bath at the Swanky Spa",
    shape: "wide",
  },
  {
    id: "spa-therapist-1",
    subject: "Portrait — the lead therapist, calm, in spa uniform against a planted wall",
    altText: "Lead therapist at the Swanky Spa & Wellness Centre",
    shape: "portrait",
  },
  {
    id: "spa-therapist-2",
    subject: "Portrait — the hammam specialist by the marble slab, towel over one shoulder",
    altText: "Hammam specialist at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "spa-therapist-3",
    subject: "Portrait — the skin therapist with serums and jade tools on a tray",
    altText: "Skin therapist at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "spa-therapist-4",
    subject: "Portrait — the massage therapist folding a warm towel in a treatment room",
    altText: "Massage and bodywork therapist at the Swanky Spa",
    shape: "portrait",
  },
  {
    id: "spa-group-bridal",
    subject: "Group — a bridal party in robes with sparkling wine in the relaxation lounge",
    altText: "A bridal-morning takeover of the Swanky Spa",
  },
  {
    id: "spa-group-corporate",
    subject: "Group — a small team in a mobility class on mats in the poolside gardens",
    altText: "An executive reset day at the Emin Pasha Spa and Gym",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => {
  const { width, height } = DIMENSIONS[seed.shape ?? "landscape"];
  return {
    id: seed.id,
    page: "spa",
    subject: seed.subject,
    kind: "image" as const,
    width,
    height,
    priority: "low" as const,
    altText: seed.altText,
    status: "placeholder" as const,
  };
});

/** The spa placeholder photo slots, schema-checked at module load. */
export const spaAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(spaAssets.map((asset) => [asset.id, asset]));

/** Resolve one spa placeholder by id, or `undefined` if unknown. */
export function spaAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
