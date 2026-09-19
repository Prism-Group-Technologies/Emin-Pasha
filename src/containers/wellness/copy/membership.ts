/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

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

/**
 * Gym membership tiers. Rates are **invented placeholders** (TODO(EMIN-Q11))
 * — the source states only that membership is available to non-residents and
 * guests (§6). The section copy says the price list is confirmed by the
 * fitness desk. Each tier restates approved §6 inclusions (equipment,
 * classes, trainers) plus the pool, which is an approved facility.
 */
export const membershipTiers: MembershipTier[] = [
  {
    id: "day",
    name: "Day Pass",
    priceUgx: 60000,
    cadence: "per visit",
    bestFor: "Passing through, or trying it once",
    perks: [
      "Full gym floor for the day",
      "One group class if there is space",
      "Pool & poolside garden access",
      "Towel and locker",
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    priceUgx: 350000,
    cadence: "per month",
    bestFor: "Neighbours who want to keep it flexible",
    perks: [
      "Unlimited gym access, 6:00am – 9:00pm",
      "All group fitness classes",
      "Pool & poolside garden access",
      "One trainer induction to start",
      "No joining fee, cancel any month",
    ],
    featured: true,
  },
  {
    id: "annual",
    name: "Annual",
    priceUgx: 3200000,
    cadence: "per year",
    bestFor: "Committing for the year and saving on the rate",
    perks: [
      "Everything in Monthly, two months cheaper",
      "Two personal-training sessions included",
      "Guest passes, four a year",
      "Priority class booking",
      "15% off spa treatments",
    ],
  },
];

export const membershipNote =
  "Indicative rates. The current price list, joining terms, corporate and family options come from the fitness desk — send the enquiry below and we will price it for you.";

export interface ClassSlot {
  day: string;
  time: string;
  name: string;
  level: string;
}

/**
 * A sample weekly class timetable. Invented (TODO(EMIN-COPY)); the class
 * types restate the approved §6 "group fitness classes" line. The heading
 * flags it as a sample and says the live timetable is confirmed on the day.
 */
export const classTimetable: ClassSlot[] = [
  { day: "Mon", time: "6:30am", name: "Strength & Conditioning", level: "All levels" },
  { day: "Mon", time: "6:00pm", name: "Spin", level: "All levels" },
  { day: "Tue", time: "7:00am", name: "Mobility & Stretch", level: "Gentle" },
  { day: "Wed", time: "6:30am", name: "HIIT Circuits", level: "Intermediate" },
  { day: "Wed", time: "6:00pm", name: "Yoga Flow", level: "All levels" },
  { day: "Thu", time: "6:00pm", name: "Strength & Conditioning", level: "All levels" },
  { day: "Fri", time: "6:30am", name: "Spin", level: "All levels" },
  { day: "Sat", time: "8:00am", name: "Weekend Full-Body", level: "All levels" },
  { day: "Sat", time: "9:30am", name: "Aqua Fitness", level: "Gentle" },
];
