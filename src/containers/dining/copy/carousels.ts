/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import {
  type SlideSeed,
  equatoriaSlides,
  inRoomSlides,
  manuteaSlides,
  rooftopSlides,
} from "@/containers/dining/copy/carouselSlides";
import { type AssetRef, assetRefSchema } from "@/schemas/content/assetRef";

/**
 * Every outlet's carousel, schema-validated at module load.
 *
 * All twenty-two frames are declared at 1600×1067. The 2026 Equatoria and
 * Manutea deliveries are 3:2 masters, and the older terrace and in-room frames
 * are cropped to the same box by `AssetImage` — one ratio across the set is
 * what lets the carousel fix its height from the lead slide and never move
 * again, which is the whole CLS argument for stacking the frames rather than
 * sliding them.
 *
 * Server-only: it imports the Zod asset schema, which pulls in the static
 * photography registry (DECISIONS.md D25). The outlet pages resolve a list
 * here and hand the finished `AssetRef[]` to the client carousel as a prop.
 */
const toAsset = ([id, altText]: SlideSeed): AssetRef =>
  assetRefSchema.parse({
    id,
    page: "dining",
    subject: altText,
    kind: "image",
    width: 1600,
    height: 1067,
    priority: "normal",
    altText,
    status: "placeholder",
  });

const BY_OUTLET: Record<string, AssetRef[]> = {
  "equatoria-restaurant-bar": equatoriaSlides.map(toAsset),
  "rooftop-terrace": rooftopSlides.map(toAsset),
  "manutea-wine-whisky-lounge": manuteaSlides.map(toAsset),
  "in-room-dining": inRoomSlides.map(toAsset),
};

/** Every carousel slot on the dining pages — the photo-assignment inventory. */
export const diningCarouselAssets: AssetRef[] = Object.values(BY_OUTLET).flat();

/**
 * The frames for one outlet, or an empty list for an outlet with none.
 *
 * Empty rather than throwing: an outlet without a carousel is a content gap,
 * not a programming error, and the detail page falls back to its single hero
 * frame. A throw here would take the whole route down over a missing picture.
 */
export function outletCarousel(outletId: string): AssetRef[] {
  return BY_OUTLET[outletId] ?? [];
}
