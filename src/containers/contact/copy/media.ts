/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the Contact page's team band and map fallback.
 * Every entry is `assetRefSchema`-validated at module load and renders
 * through the shared `AssetImage` atom as a named, dimension-labelled
 * stand-in that doubles as a shooting brief (CLAUDE.md §6.6) — the same
 * construction as `containers/wellness/copy/spaMedia.ts`.
 */
import { type AssetRef, assetRefSchema } from "@/schemas/content/assetRef";

interface MediaSeed {
  id: string;
  subject: string;
  altText: string;
  shape: "landscape" | "portrait";
}

const DIMENSIONS = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 1200, height: 1500 },
} as const;

const SEEDS: MediaSeed[] = [
  {
    id: "contact-team-1",
    subject: "Portrait — the front office manager at the reception desk, warm light",
    altText: "Front office manager at The Emin Pasha Hotel & Spa",
    shape: "portrait",
  },
  {
    id: "contact-team-2",
    subject: "Portrait — the reservations lead with a headset, garden behind",
    altText: "Reservations lead at The Emin Pasha Hotel & Spa",
    shape: "portrait",
  },
  {
    id: "contact-team-3",
    subject: "Portrait — the events coordinator in Kudara Hall, tables being laid",
    altText: "Events coordinator at The Emin Pasha Hotel & Spa",
    shape: "portrait",
  },
  {
    id: "contact-team-4",
    subject: "Portrait — the concierge at the entrance steps, holding a map",
    altText: "Concierge at The Emin Pasha Hotel & Spa",
    shape: "portrait",
  },
];

export const contactMedia: AssetRef[] = SEEDS.map((seed) =>
  assetRefSchema.parse({
    id: seed.id,
    page: "contact",
    subject: seed.subject,
    kind: "image",
    ...DIMENSIONS[seed.shape],
    priority: "normal",
    altText: seed.altText,
    status: "placeholder",
  }),
);

const BY_ID = new Map(contactMedia.map((asset) => [asset.id, asset]));

export const contactAsset = (id: string): AssetRef | undefined => BY_ID.get(id);
