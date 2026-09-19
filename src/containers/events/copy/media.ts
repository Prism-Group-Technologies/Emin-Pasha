/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Meetings & Events funnel — the venue cards,
 * the delegate-package cards and the set-up gallery strip. They live here,
 * colocated with the invented copy, rather than in `src/content/assets.ts`:
 * the packages, capacities and dressed set-ups are invented (TODO(EMIN-Q12) /
 * TODO(EMIN-COPY)), so their imagery cannot sit in the Zod-governed content
 * layer that `check:content` treats as approved. Promote both together once
 * the copy is signed off — the same split `containers/wellness/copy/media.ts`
 * makes.
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
  shape?: "landscape" | "wide";
}

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  wide: { width: 1600, height: 900 },
} as const;

const SEEDS: MediaSeed[] = [
  {
    id: "meetings-kudara-hall",
    subject: "Kudara Hall dressed for a plenary conference — staging, screens, theatre seating",
    altText: "Kudara Hall set theatre-style for a conference",
    shape: "wide",
  },
  {
    id: "meetings-private-rooms",
    subject: "A private meeting room set boardroom-style with a video-conference screen",
    altText: "A private meeting room at The Emin Pasha Hotel & Spa",
  },
  {
    id: "meetings-business-centre",
    subject: "The business centre — a small meeting pod with collaboration display",
    altText: "The business centre at The Emin Pasha Hotel & Spa",
  },
  {
    id: "weddings-equatorial-gardens",
    subject: "The Equatorial Gardens set for a wedding ceremony — aisle, chairs, arch",
    altText: "The Equatorial Gardens set for a wedding ceremony",
    shape: "wide",
  },
  {
    id: "meetings-poolside-lawn",
    subject: "The poolside lawn set for an evening reception — long tables, festoon lighting",
    altText: "The poolside lawn set for an evening reception",
  },
  {
    id: "events-package-day-delegate",
    subject: "A day-delegate break station — coffee urns, pastries, water, notepads",
    altText: "A conference break station at The Emin Pasha Hotel & Spa",
  },
  {
    id: "events-package-residential",
    subject: "An en-suite room turned down beside a meeting folder — a residential offsite",
    altText: "A guest room set for a residential conference delegate",
  },
  {
    id: "events-package-board-dinner",
    subject: "A private dining room laid for a board dinner — one long table, candlelight",
    altText: "A private dining room laid for a board dinner",
  },
  {
    id: "events-package-wedding",
    subject: "Kudara Hall dressed for a wedding reception — round tables, florals, dance floor",
    altText: "Kudara Hall dressed for a wedding reception",
  },
  {
    id: "events-gallery-conference",
    subject: "Wide shot — a full conference in session in Kudara Hall",
    altText: "A conference in session in Kudara Hall",
  },
  {
    id: "events-gallery-banquet",
    subject: "Wide shot — a gala banquet in Kudara Hall, guests seated",
    altText: "A gala banquet in Kudara Hall",
  },
  {
    id: "events-gallery-cabaret",
    subject: "A meeting room in cabaret layout — curved tables facing a screen",
    altText: "A meeting room in cabaret layout",
  },
  {
    id: "events-gallery-ceremony",
    subject: "A garden wedding ceremony under way in the Equatorial Gardens",
    altText: "A garden wedding ceremony in the Equatorial Gardens",
  },
  {
    id: "events-gallery-reception",
    subject: "An evening drinks reception on the rooftop with the Kampala skyline",
    altText: "An evening drinks reception on the rooftop terrace",
  },
  {
    id: "events-gallery-breakout",
    subject: "A breakout session in a private meeting room, small group at a U-shape",
    altText: "A breakout session in a private meeting room",
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

/** The events placeholder photo slots, schema-checked at module load. */
export const eventsAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(eventsAssets.map((asset) => [asset.id, asset]));

/** Resolve one events placeholder by id, or `undefined` if unknown. */
export function eventsAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
