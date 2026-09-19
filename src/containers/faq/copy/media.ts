/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * Placeholder photo slots for the FAQ guide cards. Each is
 * `assetRefSchema`-validated at module load and renders through the shared
 * `AssetImage` atom as a named, dimension-labelled stand-in that doubles as a
 * shooting brief (CLAUDE.md §6.6) — the same construction as
 * `spaces/copy/media.ts`. Server-only: it imports the Zod asset schema.
 */
import { type AssetRef, assetRefSchema } from "@/schemas/content/assetRef";

const seeds: Array<Pick<AssetRef, "id" | "subject" | "altText">> = [
  {
    id: "faq-guide-arrival",
    subject: "Chauffeured car arriving at the hotel's garden entrance",
    altText: "A chauffeured car arriving at The Emin Pasha Hotel & Spa",
  },
  {
    id: "faq-guide-dining",
    subject: "Breakfast table set on the terrace overlooking the gardens",
    altText: "Breakfast served on the terrace at The Emin Pasha Hotel & Spa",
  },
  {
    id: "faq-guide-wellness",
    subject: "The garden swimming pool in soft morning light",
    altText: "The garden swimming pool at The Emin Pasha Hotel & Spa",
  },
  {
    id: "faq-guide-events",
    subject: "A wedding reception laid out in the Equatorial Gardens",
    altText: "A reception set up in the Equatorial Gardens at The Emin Pasha Hotel & Spa",
  },
];

const byId = new Map(
  seeds.map((seed) => [
    seed.id,
    assetRefSchema.parse({
      ...seed,
      page: "faq",
      kind: "image",
      width: 1200,
      height: 800,
      priority: "low",
      status: "placeholder",
    }),
  ]),
);

/** The FAQ guide-card slots, schema-checked at module load. */
export const faqAssets: AssetRef[] = [...byId.values()];

/** The placeholder slot for a guide card, by guide id (`faq-guide-<id>`). */
export function faqGuideAsset(guideId: string): AssetRef | undefined {
  return byId.get(`faq-guide-${guideId}`);
}
