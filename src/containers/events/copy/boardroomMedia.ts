/**
 * Photo slots for the bespoke Boardroom sections.
 *
 * Unlike every other media module under this folder, these are **not**
 * placeholders. The 2026 delivery supplied ten frames of this one room, so
 * each slot below is filled by a photograph that actually depicts its subject
 * — see `content/photoAssignments.ts`. The subjects are written as descriptions
 * of the delivered frame rather than as a shooting brief.
 *
 * They live here rather than in `src/content/assets.ts` for the same reason as
 * `./media.ts`: the surrounding Boardroom copy is not yet client-approved, so
 * its imagery must not sit in the Zod-governed layer `check:content` treats as
 * signed off. Promote both together at sign-off.
 */
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface Seed {
  id: string;
  subject: string;
  altText: string;
  shape?: "landscape" | "wide";
}

/** The delivery is 2560×1703 — a hair under 3:2, which `landscape` matches. */
const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  wide: { width: 1600, height: 900 },
} as const;

const SEEDS: Seed[] = [
  {
    id: "boardroom-showcase",
    subject: "The Boardroom from the door — art wall, the full table, screen at the head",
    altText: "The Boardroom at The Emin Pasha Hotel & Spa, set for a board session",
    shape: "wide",
  },
  {
    id: "boardroom-view-head",
    subject: "The head of the table with the interactive display centred behind it",
    altText: "The interactive display at the head of The Boardroom table",
  },
  {
    id: "boardroom-view-length",
    subject: "Low along the tabletop to the display — the full seated length of the room",
    altText: "The Boardroom table seen down its full length toward the display",
  },
  {
    id: "boardroom-view-window",
    subject: "From the window end, chairs ranked both sides of the fixed table",
    altText: "The Boardroom from the window end, chairs ranked along both sides",
  },
  {
    id: "boardroom-view-daylight",
    subject: "Daylight through the sheer curtains across the length of the table",
    altText: "Daylight across The Boardroom table through sheer curtains",
  },
  {
    id: "boardroom-view-angle",
    subject: "The table at an angle, the curtained window wall behind it",
    altText: "The Boardroom table with the curtained window wall behind",
  },
  {
    id: "boardroom-view-credenza",
    subject: "Looking back over the table to the credenza and the chair ends",
    altText: "The credenza wall at the far end of The Boardroom",
  },
  {
    id: "boardroom-view-art",
    subject: "The screen wall and the four canvases hung above the seated table",
    altText: "Contemporary Ugandan canvases above The Boardroom table",
  },
  {
    id: "boardroom-detail-setting",
    subject: "One place setting close up — pad, pen, still water and the in-table cable port",
    altText: "A place setting in The Boardroom with the in-table cable port",
  },
  {
    id: "boardroom-detail-table",
    subject: "Water and glasses down the table, the display soft in the background",
    altText: "Water and glasses laid down The Boardroom table",
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

/** The Boardroom slots, schema-checked at module load. */
export const boardroomAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(boardroomAssets.map((asset) => [asset.id, asset]));

/** Resolve one Boardroom slot by id, or `undefined` if unknown. */
export function boardroomAsset(id: string): AssetRef | undefined {
  return byId.get(id);
}

/** The room gallery rail — all nine room frames, in the order they read best. */
export const boardroomGalleryShots: { assetId: string; caption: string }[] = [
  { assetId: "boardroom-view-head", caption: "The head of the table · interactive display" },
  { assetId: "boardroom-view-window", caption: "From the window end · sixteen seats" },
  { assetId: "boardroom-detail-setting", caption: "Every place · pad, water, power" },
  { assetId: "boardroom-view-daylight", caption: "Daylight · curtains to taste" },
  { assetId: "boardroom-view-art", caption: "The art wall · Ugandan canvases" },
  {
    assetId: "boardroom-view-credenza",
    caption: "The credenza end · service without interruption",
  },
  { assetId: "boardroom-view-length", caption: "Down the table · visible from every chair" },
  { assetId: "boardroom-view-angle", caption: "Squared on the display · no bad seat" },
  { assetId: "boardroom-detail-table", caption: "Still water, laid before you arrive" },
];
