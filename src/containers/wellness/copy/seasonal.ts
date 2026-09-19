/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { FACILITY_ID, type FacilityId } from "@/containers/wellness/anchors";

export interface SeasonalOffer {
  id: string;
  facility: FacilityId;
  /** Short pill above the title — the "why now". */
  badge: string;
  title: string;
  description: string;
  /** Indicative price in UGX, or omit for "priced on the day". */
  priceUgx?: number;
  /** Renders beside / instead of the price. */
  priceNote: string;
  /** The urgency line — a window, never a fabricated calendar date. */
  endsNote: string;
}

/**
 * Time-boxed treatments each facility runs for a few weeks. Every offer is
 * built from an already-approved §6 capability (the Turkish bath, massage,
 * group classes, the pool) recombined for a season — no new service is
 * claimed. Prices are invented placeholders and flagged indicative; the
 * "window" lines are deliberately relative ("through the rains"), because a
 * specific date is a fact the source does not set.
 */
export const seasonalOffers: Record<FacilityId, SeasonalOffer[]> = {
  [FACILITY_ID.spa]: [
    {
      id: "warm-stone-week",
      facility: FACILITY_ID.spa,
      badge: "Through the rains",
      title: "Warm-Stone Recovery Week",
      description:
        "The signature massage extended with full hot-stone work along the back and legs — built for grey, heavy mornings.",
      priceUgx: 300000,
      priceNote: "indicative, 90 min",
      endsNote: "While the rainy-season dates last",
    },
    {
      id: "twilight-hammam",
      facility: FACILITY_ID.spa,
      badge: "Thursdays only",
      title: "Twilight Hammam",
      description:
        "The last Turkish bath slot of the day, held past closing, with tea in the lounge and no one waiting.",
      priceUgx: 360000,
      priceNote: "indicative, 75 min + lounge",
      endsNote: "One booking per Thursday evening",
    },
  ],
  [FACILITY_ID.gym]: [
    {
      id: "new-year-reset",
      facility: FACILITY_ID.gym,
      badge: "January",
      title: "The 21-Day Reset",
      description:
        "Three weeks of unlimited access, all classes, and two personal-training sessions to build the habit properly.",
      priceUgx: 320000,
      priceNote: "indicative, 21 days",
      endsNote: "New Year intake only",
    },
    {
      id: "bring-a-neighbour",
      facility: FACILITY_ID.gym,
      badge: "Members bring a guest",
      title: "Bring a Neighbour Month",
      description:
        "Every membership adds four guest passes for the month, so the people on your street can try the floor.",
      priceNote: "Included for members",
      endsNote: "Runs one calendar month",
    },
  ],
  [FACILITY_ID.pool]: [
    {
      id: "sunrise-lanes",
      facility: FACILITY_ID.pool,
      badge: "Dry season",
      title: "Sunrise Lane Season",
      description:
        "A reserved lane before public opening, five mornings a week, for a proper set before work.",
      priceUgx: 60000,
      priceNote: "indicative, per morning",
      endsNote: "While the dry-season mornings hold",
    },
    {
      id: "family-sundays",
      facility: FACILITY_ID.pool,
      badge: "Sundays",
      title: "Family Garden Sundays",
      description:
        "Two adults and up to three children on one day pass, with loungers held in the poolside gardens.",
      priceUgx: 150000,
      priceNote: "indicative, the group",
      endsNote: "Sunday day-pass season",
    },
  ],
};
