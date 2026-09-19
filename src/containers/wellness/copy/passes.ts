/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { MembershipTier } from "@/containers/wellness/copy/membership";

/**
 * Repeat-visit pricing for the spa, in the same `MembershipTier` shape the
 * gym uses so the card renders identically. Rates are **invented
 * placeholders** (TODO(EMIN-Q11)) — the source sets no spa price at all
 * (§0.7) — and the section copy says the wellness desk confirms. Each tier
 * only bundles approved §6 offerings (massage, facial, the Turkish bath, the
 * pool) plus the relaxation lounge.
 */
export const spaPasses: MembershipTier[] = [
  {
    id: "single-visit",
    name: "Single Visit",
    priceUgx: 40000,
    cadence: "day pass",
    bestFor: "A one-off treat, or trying the lounge",
    perks: [
      "Robe, slippers and towels",
      "The relaxation lounge all day",
      "Pool & poolside garden access",
      "Treatments booked on top, at menu price",
    ],
  },
  {
    id: "spa-club-monthly",
    name: "Spa Club · Monthly",
    priceUgx: 550000,
    cadence: "per month",
    bestFor: "One treatment a week, without thinking about it",
    perks: [
      "Four signature treatments a month",
      "20% off any extra treatments & add-ons",
      "Unlimited lounge & pool access",
      "A guest pass each month",
      "No joining fee, cancel any month",
    ],
    featured: true,
  },
  {
    id: "spa-club-annual",
    name: "Spa Club · Annual",
    priceUgx: 5800000,
    cadence: "per year",
    bestFor: "Committing for the year and saving on the rate",
    perks: [
      "Everything in Monthly, two months cheaper",
      "One Turkish bath ritual each quarter",
      "25% off extra treatments & retail",
      "Priority booking on limited seasonal treatments",
      "Four guest passes a year",
    ],
  },
];

export const spaPassesNote =
  "Indicative rates. Membership terms, freezes, couples and corporate options are settled with the wellness desk — send the enquiry above and we will price it for you.";
