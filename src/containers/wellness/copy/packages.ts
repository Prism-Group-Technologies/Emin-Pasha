/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface WellnessPackage {
  id: string;
  title: string;
  /** Who it is for — the badge line on the card. */
  forWhom: string;
  description: string;
  /** What is arranged, checked off on the card. */
  includes: string[];
  /** Indicative total in UGX. Invented (§0.7). */
  priceUgx: number;
  /** e.g. "per person" / "for two". */
  priceUnit: string;
  assetId: string;
}

/**
 * Bundled wellness days. Every component maps onto an approved §6 offering —
 * massage, facial, Turkish bath, the pool, group classes — assembled into a
 * package. Prices are invented placeholders (TODO(EMIN-COPY)); the section
 * copy and each card flag them as indicative and confirmed on booking.
 */
export const wellnessPackages: WellnessPackage[] = [
  {
    id: "day-retreat",
    title: "The Half-Day Retreat",
    forWhom: "One guest",
    description:
      "A morning or afternoon that is entirely yours — treatment, bath, pool and a long lunch, in that order.",
    includes: [
      "60-minute signature massage",
      "The Turkish bath ritual",
      "Pool & poolside garden access",
      "Two-course spa lunch",
      "Robe, slippers and the relaxation lounge all day",
    ],
    priceUgx: 720000,
    priceUnit: "per person",
    assetId: "wellness-package-day-retreat",
  },
  {
    id: "couples-escape",
    title: "The Couples' Escape",
    forWhom: "Two guests",
    description:
      "An afternoon for two — a side-by-side treatment, something sparkling, and nowhere you need to be.",
    includes: [
      "60-minute couples' massage, side by side",
      "Private time in the relaxation lounge",
      "A bottle of sparkling wine & fruit",
      "Pool & poolside garden access",
      "A late checkout added if you are staying",
    ],
    priceUgx: 1350000,
    priceUnit: "for two",
    assetId: "wellness-package-couples",
  },
  {
    id: "corporate-reset",
    title: "The Team Reset",
    forWhom: "6–20 people",
    description:
      "Half a day out of the office — a mobility class, short treatments on rotation, and lunch in the gardens.",
    includes: [
      "A 45-minute group mobility or conditioning class",
      "15-minute chair or express treatments on rotation",
      "Use of the gym and the pool",
      "Working lunch in the poolside gardens",
      "A quiet room for anyone who needs to dial in",
    ],
    priceUgx: 280000,
    priceUnit: "per person",
    assetId: "wellness-package-corporate",
  },
];

export const packagesNote =
  "Package prices are indicative. Composition, dietary needs and group terms are confirmed with the wellness desk when you book.";
