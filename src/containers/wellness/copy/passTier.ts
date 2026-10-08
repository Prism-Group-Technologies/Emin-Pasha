/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * The shape of one repeat-visit pricing tier, shared by `spaPasses` and
 * `poolPasses` so `MembershipTierCard` renders either unchanged.
 *
 * It lives in its own module rather than beside one of the two pass lists
 * because neither owns it: a type imported by both belongs to neither, and
 * colocating it with `passes.ts` would make `poolPasses.ts` import from the
 * spa's file for a reason that has nothing to do with the spa.
 */
export interface MembershipTier {
  id: string;
  name: string;
  /** Indicative price in UGX. Invented (§0.7). */
  priceUgx: number;
  /** Billing cadence, e.g. "per month". */
  cadence: string;
  /** One line on who it suits. */
  bestFor: string;
  /** What is included, checked on the card. */
  perks: string[];
  /** Tints the card and adds the "Most popular" flag. */
  featured?: boolean;
}
