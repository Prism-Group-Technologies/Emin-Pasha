/**
 * Kudara Hall catering — the presentational package cards, plus the option set
 * the estimator prices against. Import-free so the pure `kudaraQuote.ts` and
 * the `useKudaraEstimator` client hook can both read it without pulling the
 * Zod-validated asset layer into the client bundle.
 *
 * Every rate is an indicative placeholder for planning only and is labelled as
 * such on the card, in the estimator and in the section copy.
 */
export interface KudaraCateringPackage {
  id: string;
  label: string;
  forWhom: string;
  description: string;
  includes: string[];
  perDelegateUgx: number;
  kitchens: string;
}

export const kudaraCateringPackages: KudaraCateringPackage[] = [
  {
    id: "day-delegate",
    label: "Day-delegate catering",
    forWhom: "Per delegate · full meeting day",
    description: "The breaks and the lunch bundled, so the catering is one line on the budget.",
    includes: [
      "Arrival coffee, tea and a light bite",
      "Mid-morning and afternoon breaks with something baked",
      "Hot fork buffet or plated working lunch in a restaurant",
      "Still and sparkling water on the tables all day",
    ],
    perDelegateUgx: 95000,
    kitchens: "Rotates across the Asian, European and African kitchens",
  },
  {
    id: "gala-banquet",
    label: "Gala banquet",
    forWhom: "Per delegate · evening",
    description:
      "A three-course plated dinner with the hall dressed, staged and lit for the night.",
    includes: [
      "Canapés and a drinks reception on arrival",
      "Three plated courses with a vegetarian and a halal line",
      "Dressed rounds, linen, centrepieces and a lit stage",
      "Dance floor, cake table and a manned bar",
    ],
    perDelegateUgx: 210000,
    kitchens: "Menu built with the executive chef at a tasting on site",
  },
  {
    id: "bespoke",
    label: "Bespoke & cultural menus",
    forWhom: "Per delegate · quoted to brief",
    description:
      "Introductions, cultural functions and diaspora weddings catered to a specific brief.",
    includes: [
      "Menu designed to a religion, region or family tradition",
      "Live stations — grill, curry, rolex or dessert",
      "Full dietary matrix handled from the rooming list",
      "Service paced to your programme, not ours",
    ],
    perDelegateUgx: 175000,
    kitchens: "All three kitchens, plus specialist hires when a dish needs them",
  },
];

export const kudaraCateringNote =
  "Per-delegate rates are indicative placeholders for planning. Final menus, minimum numbers, service style and dietary loading are confirmed on your written proposal after a tasting.";

/* ---- estimator option set ---------------------------------------------- */

/** Indicative full-day hire of the hall, before catching, catering and extras. */
export const KUDARA_DAY_HIRE_UGX = 6_500_000;

export interface KudaraCateringTier {
  id: string;
  label: string;
  hint: string;
  perDelegateUgx: number;
  /** True when the charge repeats for each day of the booking (breaks, lunch). */
  perDay: boolean;
}

export const kudaraCateringTiers: KudaraCateringTier[] = [
  {
    id: "none",
    label: "Room & production only",
    hint: "No food or drink",
    perDelegateUgx: 0,
    perDay: true,
  },
  {
    id: "working-lunch",
    label: "Working lunch",
    hint: "One hot buffet service per day",
    perDelegateUgx: 55000,
    perDay: true,
  },
  {
    id: "day-delegate",
    label: "Day-delegate catering",
    hint: "Arrival coffee, two breaks and lunch, per day",
    perDelegateUgx: 95000,
    perDay: true,
  },
  {
    id: "gala",
    label: "Add a gala dinner",
    hint: "Day-delegate catering plus one plated evening",
    perDelegateUgx: 95000 + 210000,
    perDay: false,
  },
];
