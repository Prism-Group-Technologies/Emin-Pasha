/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { MembershipTier } from "@/containers/wellness/copy/membership";

/**
 * Repeat-visit pricing for the pool, in the same `MembershipTier` shape the
 * gym uses so `MembershipTierCard` renders it unchanged — the card, the
 * "Most popular" flag and the WhatsApp CTA all come for free. Rates are
 * invented placeholders (TODO(EMIN-Q11)); the section copy says the wellness
 * desk confirms. Each tier only bundles approved §6 access — the pool, the
 * poolside gardens and accompanied children.
 */
export const poolPasses: MembershipTier[] = [
  {
    id: "splash-ten",
    name: "Ten-Swim Card",
    priceUgx: 400000,
    cadence: "10 visits",
    bestFor: "An occasional swim through the dry season",
    perks: [
      "Ten adult day passes, no expiry within the year",
      "Shareable with family and guests",
      "A lounger and locker each visit",
      "Skip the desk — scan and swim",
    ],
  },
  {
    id: "swim-season",
    name: "Swim Season",
    priceUgx: 350000,
    cadence: "per month",
    bestFor: "Swimming most weeks, on your own schedule",
    perks: [
      "Unlimited swimming, opening to close",
      "One aqua-fitness class a week",
      "Two guest passes each month",
      "10% off cabanas and private hire",
      "No joining fee, cancel any month",
    ],
    featured: true,
  },
  {
    id: "family-year",
    name: "Family Year",
    priceUgx: 4200000,
    cadence: "per year",
    bestFor: "A household that lives at the pool all season",
    perks: [
      "Unlimited swimming for two adults and three children",
      "Two learn-to-swim blocks included",
      "Priority loungers and a held cabana on request",
      "Six guest passes a year",
      "15% off poolside events",
    ],
  },
];

export const poolPassesNote =
  "Indicative rates. Pass terms, freezes, corporate and school options are settled with the wellness desk — send the planner below and we will price it for you.";
