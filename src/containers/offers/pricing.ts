/**
 * Pure price arithmetic for an offer card — import-free so it is testable in
 * isolation and safe on either side of the client boundary. Formatting stays
 * in `utils/currency` (which reads `content/identity`), so nothing here knows
 * the currency code.
 */

export interface OfferPricing {
  /** True only when a higher "was" price makes the saving real. */
  discounted: boolean;
  /** Whole-percent saving, rounded down so the badge never overstates it. */
  savingPercent: number;
  /** Absolute saving in the price's own unit, 0 when not discounted. */
  savingAmount: number;
}

const NONE: OfferPricing = { discounted: false, savingPercent: 0, savingAmount: 0 };

/**
 * Derives the saving between a current and a "was" price. A missing, equal or
 * lower "was" price is treated as no discount at all — a strike-through that
 * is not a real saving is worse than none.
 */
export function offerPricing(priceUgx?: number, wasPriceUgx?: number): OfferPricing {
  if (priceUgx === undefined || wasPriceUgx === undefined || wasPriceUgx <= priceUgx) {
    return NONE;
  }
  const savingAmount = wasPriceUgx - priceUgx;
  return {
    discounted: true,
    savingPercent: Math.floor((savingAmount / wasPriceUgx) * 100),
    savingAmount,
  };
}
