import { OFFER_CATEGORY, OFFER_CATEGORY_ORDER } from "@/containers/offers/anchors";
import {
  type OfferItem,
  corporateOffers,
  diningOffers,
  seasonalOffers,
  stayOffers,
  wellnessOffers,
} from "@/containers/offers/copy";
import { assets } from "@/content/assets";
import { offers } from "@/content/offers";
import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * The page's offer catalogue — a **server-only** module: it reads the
 * Zod-validated content layer, so client islands receive its output as props
 * and never import it (DECISIONS.md D25).
 *
 * The two approved offers are mapped in from `content/offers.ts` with their
 * name, description, price and schedule untouched — including Happy Hour's
 * missing day range, TODO(EMIN-Q07). Only the page chrome around them
 * (category, image slot, inclusions drawn from their own description) is added.
 */
const APPROVED_META: Record<string, Pick<OfferItem, "assetId" | "inclusions" | "priceUnit">> = {
  "friday-band-night": {
    assetId: "offers-friday-band-night",
    inclusions: ["Live music in the gardens", "Every Friday evening"],
    priceUnit: "per guest",
  },
  "equatorial-sunset-happy-hour": {
    // Its approved description already lists both prices, so no inclusions
    // are repeated beneath it.
    assetId: "lounge-equatorial-gardens",
    inclusions: [],
  },
};

const approvedOffers: OfferItem[] = offers.map((offer) => ({
  id: offer.id,
  category: OFFER_CATEGORY.dining,
  title: offer.name,
  summary: offer.description,
  priceUgx: offer.priceUgx,
  schedule: offer.schedule,
  approved: true,
  inclusions: [],
  assetId: "",
  ...APPROVED_META[offer.id],
}));

const invented = [
  ...stayOffers,
  ...diningOffers,
  ...wellnessOffers,
  ...corporateOffers,
  ...seasonalOffers,
];

/** Every grid offer, grouped in filter-chip order, approved offers leading dining. */
export const gridOffers: OfferItem[] = OFFER_CATEGORY_ORDER.flatMap((category) => [
  ...approvedOffers.filter((offer) => offer.category === category),
  ...invented.filter((offer) => offer.category === category),
]);

/** Live packages on the page: the spotlight plus the grid. */
export const liveOfferCount = gridOffers.length + 1;

const assetById = new Map(assets.map((asset) => [asset.id, asset]));

/** Resolve an offer's reused `content/assets.ts` slot, or `undefined`. */
export function offerAsset(assetId: string): AssetRef | undefined {
  return assetById.get(assetId);
}
