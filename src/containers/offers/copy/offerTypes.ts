/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { OfferCategory } from "@/containers/offers/anchors";

/**
 * One offer as the page renders it — the shared shape for the invented
 * packages here and the two approved offers `catalogue.ts` maps in from
 * `content/offers.ts`. Import-free apart from a type, so it is client-safe.
 */
export interface OfferItem {
  id: string;
  category: OfferCategory;
  title: string;
  summary: string;
  /** Three or four short "what's included" lines. */
  inclusions: string[];
  /** Current price in UGX; omit for "priced on enquiry". */
  priceUgx?: number;
  /** Pre-offer price; only a higher value renders as a strike-through saving. */
  wasPriceUgx?: number;
  /** What the price buys, e.g. "per night" or "for two". */
  priceUnit?: string;
  /** Time window for a standing offer, e.g. "3:00pm – 8:00pm". */
  schedule?: string;
  /** The soft-urgency validity line, e.g. "Book by 30 Nov 2026". */
  bookBy?: string;
  /** The soft-scarcity pill, e.g. "Only 6 suites a month". */
  urgency?: string;
  /** An existing `content/assets.ts` id — real slots, reused as placeholders. */
  assetId: string;
  /** True for the offers transcribed from the approved content layer. */
  approved?: boolean;
}

/** The spotlight offer adds a longer pitch and a fuller inclusions list. */
export interface FeaturedOffer extends OfferItem {
  eyebrow: string;
  pitch: string;
}
