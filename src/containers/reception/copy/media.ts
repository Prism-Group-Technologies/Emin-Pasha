/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { type AssetRef, assetRefSchema } from "@/schemas/content/assetRef";

/**
 * The reception photo slots, schema-validated at module load.
 *
 * All nine delivered frames are 3:2, so every slot is declared at 1600×1067
 * and the ratio box never crops the subject — the desk runs the full width of
 * two of them and loses its ends in a 4:3 box.
 *
 * Alt text describes the room and the people in it, never the promotional card
 * standing on the desk in `reception-desk-detail`: it belongs to a third party
 * and naming it would read as an offer the hotel has not made.
 *
 * Server-only — it imports the Zod asset schema, which pulls in the static
 * photography registry (DECISIONS.md D25).
 */
const seeds: Array<Pick<AssetRef, "id" | "subject" | "altText">> = [
  {
    id: "reception-desk-wide",
    subject: "The reception desk full length, two receptionists at work",
    altText:
      "Two receptionists at the full-length timber reception desk beneath the world-clock wall",
  },
  {
    id: "reception-desk-staff",
    subject: "The desk front-on, the painted world map behind it",
    altText:
      "The reception desk at The Emin Pasha Hotel & Spa, two receptionists before a painted world map",
  },
  {
    id: "reception-desk-detail",
    subject: "Along the desk top, a receptionist either side, shallow focus",
    altText: "The polished timber reception desk, a receptionist at either end",
  },
  {
    id: "reception-lobby-sofa",
    subject: "Lobby sofa in the foreground, the desk and staff beyond",
    altText: "A lobby sofa with the reception desk and its staff in the background",
  },
  {
    id: "reception-lobby-seating",
    subject: "Lobby seating: blue sofa, tan leather armchairs, canvas above",
    altText: "Lobby seating with a blue sofa, tan leather armchairs and a painted canvas",
  },
  {
    id: "reception-lounge-armchairs",
    subject: "Lobby lounge: orange armchairs against dark stone",
    altText: "Orange velvet armchairs against a dark stone wall in the hotel lobby",
  },
  {
    id: "reception-waiting-window",
    subject: "Waiting corner under the Emin Pasha portrait, window open to the garden",
    altText: "A waiting corner beneath the Emin Pasha portrait, its window open onto the garden",
  },
  {
    id: "reception-waiting-chairs",
    subject: "The two waiting chairs squared on, lounge doorway beyond",
    altText: "Two patterned waiting chairs beside the doorway through to the lounge",
  },
];

const byId = new Map(
  seeds.map((seed) => [
    seed.id,
    assetRefSchema.parse({
      ...seed,
      page: "reception",
      kind: "image",
      width: 1600,
      height: 1067,
      priority: "normal",
      status: "placeholder",
    }),
  ]),
);

/** Every reception slot, in declaration order. */
export const receptionAssets: AssetRef[] = [...byId.values()];

/** One reception slot by id. Throws on an unknown id — a typo is a build bug. */
export function receptionAsset(id: string): AssetRef {
  const asset = byId.get(id);
  if (!asset) {
    throw new Error(`Unknown reception asset: ${id}`);
  }
  return asset;
}
