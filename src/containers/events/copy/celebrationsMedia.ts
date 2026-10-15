/**
 * Photo slots for the celebrations rail on the Weddings page.
 *
 * Like `./boardroomMedia.ts` and unlike the rest of this folder, these are not
 * placeholders: a 2026 delivery supplied twelve frames of one themed private
 * function, so every slot is filled by a photograph that genuinely depicts its
 * subject (see `content/photoAssignments.ts`).
 *
 * ⚠️ These are NOT wedding photographs. No couple, ceremony, aisle, cake or
 * bridal party appears in any frame, and none of it was shot in the Equatorial
 * Gardens. What they show is the courtyard restaurant and the main staircase
 * dressed to a red/white/black colour brief for a private celebration. They
 * earn their place on the Weddings page as evidence that the estate styles a
 * space to a client's scheme — which is what a couple is buying — and the
 * captions are written to say exactly that and nothing more. Captioning any of
 * them as a wedding would be inventing an event that was never photographed.
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface Seed {
  id: string;
  subject: string;
  altText: string;
  caption: string;
}

/** The delivery is 2560×1703 — a hair under 3:2, which these dimensions match. */
const DIMENSIONS = { width: 1200, height: 800 } as const;

const SEEDS: Seed[] = [
  {
    id: "celebration-stair-arch",
    subject: "The main staircase dressed with a red, white and black floral arch and drapes",
    altText: "The main staircase dressed with a floral arch for a private celebration",
    caption: "The staircase, dressed to the brief",
  },
  {
    id: "celebration-arch-doorway",
    subject: "The floral arch over the doorway at the head of the stairs, seen from below",
    altText: "A floral arch over the doorway at the head of the stairs",
    caption: "An arch built in place, not hired in",
  },
  {
    id: "celebration-stair-drums",
    subject: "The stair installation from below — carved drums as plinths for the arrangements",
    altText: "Carved drums used as plinths for floral arrangements on the stairs",
    caption: "Carved drums as plinths",
  },
  {
    id: "celebration-courtyard-wide",
    subject: "The courtyard restaurant laid in white linen under red wash lighting",
    altText: "The courtyard restaurant laid for a private celebration",
    caption: "The courtyard, laid for the evening",
  },
  {
    id: "celebration-courtyard-dusk",
    subject: "The courtyard at dusk, red light washing the colonnade behind the tables",
    altText: "The courtyard at dusk under red lighting",
    caption: "Lighting washed to the colour scheme",
  },
  {
    id: "celebration-courtyard-tree",
    subject: "The courtyard from the far side, the flame tree through the centre of the room",
    altText: "The courtyard restaurant with its tree at the centre",
    caption: "The tree the room is built around",
  },
  {
    id: "celebration-courtyard-lit",
    subject: "The courtyard fully lit with guests gathering in the colonnade beyond",
    altText: "Guests gathering in the colonnade beside the laid courtyard",
    caption: "Doors open, guests arriving",
  },
  {
    id: "celebration-courtyard-service",
    subject: "A server laying the last covers before guests are seated",
    altText: "A member of staff laying the last covers in the courtyard",
    caption: "The last covers, before the doors",
  },
  {
    id: "celebration-courtyard-table",
    subject: "A courtyard table laid under the tree with the garden behind it",
    altText: "A table laid under the tree in the courtyard",
    caption: "Every table under the canopy",
  },
  {
    id: "celebration-table-number",
    subject: "Close on one laid cover — red napkins, candle, flowers and a printed table number",
    altText: "A laid table with red napkins, a candle and a printed table number",
    caption: "Printed numbers, folded linen",
  },
  {
    id: "celebration-garden-long-table",
    subject: "A long table laid on the terrace, orange seats, planting beyond",
    altText: "A long table laid on the terrace beside the garden",
    caption: "One long table on the terrace",
  },
  {
    id: "celebration-terrace-two-top",
    subject: "A two-top on the terrace laid with red napkins and a rose",
    altText: "A table for two on the terrace laid with red napkins",
    caption: "Or a table for two",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => ({
  id: seed.id,
  page: "weddings",
  subject: seed.subject,
  kind: "image" as const,
  width: DIMENSIONS.width,
  height: DIMENSIONS.height,
  priority: "low" as const,
  altText: seed.altText,
  status: "placeholder" as const,
}));

/** The celebration slots, schema-checked at module load. */
export const celebrationAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(celebrationAssets.map((asset) => [asset.id, asset]));

/** Resolve one celebration slot by id, or `undefined` if unknown. */
export function celebrationAsset(id: string): AssetRef | undefined {
  return byId.get(id);
}

/** Rail order, and the caption under each frame. */
export const celebrationCaptions: { id: string; caption: string }[] = SEEDS.map((seed) => ({
  id: seed.id,
  caption: seed.caption,
}));
