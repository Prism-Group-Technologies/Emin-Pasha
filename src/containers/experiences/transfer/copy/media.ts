/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Airport Transfer page — the four fleet
 * cards, the arrivals moment, the two premium services, the route and three
 * chauffeur portraits. Every entry is `assetRefSchema`-validated at module
 * load and renders through the shared `AssetImage` atom as a named,
 * dimension-labelled stand-in that doubles as a shooting brief (CLAUDE.md
 * §6.6) — the same construction as `wellness/copy/poolMedia.ts`.
 *
 * Server-only in practice: it imports the Zod asset schema, so client
 * components must never import it (D25).
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
    id: "transfer-fleet-saloon",
    subject: "A black Mercedes-Benz E-Class under the hotel porte-cochère, rear door held open",
    altText: "An Executive Saloon waiting at the entrance of The Emin Pasha Hotel",
  },
  {
    id: "transfer-fleet-suv",
    subject:
      "A pearl-white Toyota Land Cruiser V8 on the palm-lined hotel drive, three-quarter view",
    altText: "A Premium SUV on the drive of The Emin Pasha Hotel",
  },
  {
    id: "transfer-fleet-van",
    subject: "A Mercedes-Benz V-Class with sliding door open, showing face-to-face leather seating",
    altText: "The face-to-face rear seating of the Business Van",
  },
  {
    id: "transfer-fleet-coach",
    subject: "A Toyota Coaster loading a delegation's luggage at dusk, host with a clipboard",
    altText: "A Group Coach collecting a delegation",
  },
  {
    id: "transfer-arrivals-board",
    subject:
      "Chauffeur in a dark suit holding an Emin Pasha name board in the Entebbe arrivals hall, soft focus crowd",
    altText: "An Emin Pasha chauffeur waiting in arrivals with a name board",
  },
  {
    id: "transfer-vip-assist",
    subject: "A protocol officer greeting a traveller at the top of an airbridge, porter behind",
    altText: "A traveller met at the aircraft door by the VIP meet & assist team",
  },
  {
    id: "transfer-chauffeur-hourly",
    subject: "Chauffeur opening a rear door outside a Kololo embassy building in morning light",
    altText: "A chauffeur waiting for a guest between meetings in Kampala",
  },
  {
    id: "transfer-route-map",
    subject:
      "Stylised map of the Entebbe–Kampala Expressway from EBB to Nakasero Hill, gold route line on sand",
    altText: "Map of the route from Entebbe International Airport to Nakasero",
    shape: "wide",
  },
  {
    id: "transfer-chauffeur-moses",
    subject: "Portrait of a senior chauffeur beside the saloon, warm smile, hotel lapel pin",
    altText: "Portrait of Moses, senior chauffeur",
    shape: "portrait",
  },
  {
    id: "transfer-chauffeur-grace",
    subject:
      "Portrait of the VIP and protocol lead in the arrivals hall, earpiece, confident stance",
    altText: "Portrait of Grace, VIP and protocol lead",
    shape: "portrait",
  },
  {
    id: "transfer-chauffeur-ibrahim",
    subject: "Portrait of the group coach driver at the wheel of the Coaster, door open",
    altText: "Portrait of Ibrahim, group and coach driver",
    shape: "portrait",
  },
];

const raw: AssetRefInput[] = SEEDS.map((seed) => {
  const { width, height } = DIMENSIONS[seed.shape ?? "landscape"];
  return {
    id: seed.id,
    page: "airport-transfer",
    subject: seed.subject,
    kind: "image" as const,
    width,
    height,
    priority: "low" as const,
    altText: seed.altText,
    status: "placeholder" as const,
  };
});

/** The transfer placeholder photo slots, schema-checked at module load. */
export const transferAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(transferAssets.map((asset) => [asset.id, asset]));

/** Resolve one transfer placeholder by id, or `undefined` if unknown. */
export function transferAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
