/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * The pool visit planner's option set. Import-free on purpose: the pure
 * `poolQuote.ts` view-model, the `usePoolPlanner` hook and the fields
 * molecule all read this, and two of those cross into the client bundle, so
 * this must not pull the Zod-validated asset layer with it (DECISIONS.md D25).
 *
 * Every price is an invented placeholder (TODO(EMIN-Q11)) and is presented as
 * "indicative" — the planner never claims to be a checkout. `charge` decides
 * how the base rate scales; `"enquire"` means the option is quoted by hand
 * (private hire) and the planner shows a party summary instead of a total.
 */
export type PoolChargeBasis = "per-person" | "per-family" | "flat" | "enquire";

export interface PoolVisitType {
  id: string;
  label: string;
  /** One line under the choice — what the visit is. */
  hint: string;
  charge: PoolChargeBasis;
  /** Adult rate, or the flat/family rate, in UGX. `0` when `charge` is "enquire". */
  baseUgx: number;
  /** Child rate for "per-person" visits; children ride free otherwise. */
  childUgx?: number;
  /** Shown next to the running total, e.g. "per adult, per day". */
  unit: string;
}

export interface PoolAddOn {
  id: string;
  label: string;
  /** One line: what it adds. */
  hint: string;
  priceUgx: number;
  /** Multiply the price by the party size rather than charging it once. */
  perPerson?: boolean;
}

export const poolVisitTypes: PoolVisitType[] = [
  {
    id: "day-pass",
    label: "Day pass",
    hint: "Pool and gardens for the day",
    charge: "per-person",
    baseUgx: 50000,
    childUgx: 25000,
    unit: "per adult · under-12s half",
  },
  {
    id: "sunrise-lane",
    label: "Sunrise lane hire",
    hint: "A reserved lane before public opening",
    charge: "flat",
    baseUgx: 70000,
    unit: "per lane, 45 min",
  },
  {
    id: "family-garden-day",
    label: "Family garden day",
    hint: "Two adults and up to three children, one rate",
    charge: "per-family",
    baseUgx: 150000,
    unit: "the family, per day",
  },
  {
    id: "aqua-fitness",
    label: "Aqua-fitness class",
    hint: "A 45-minute instructor-led session",
    charge: "per-person",
    baseUgx: 45000,
    unit: "per place",
  },
  {
    id: "swim-lesson",
    label: "Learn-to-swim lesson",
    hint: "One-to-one, ages 4 and up",
    charge: "per-person",
    baseUgx: 90000,
    childUgx: 90000,
    unit: "per 30-min lesson",
  },
  {
    id: "private-hire",
    label: "Private poolside hire",
    hint: "The pool and gardens as a venue — quoted by hand",
    charge: "enquire",
    baseUgx: 0,
    unit: "priced on enquiry",
  },
];

export const poolAddOns: PoolAddOn[] = [
  {
    id: "reserved-loungers",
    label: "Reserved loungers in the shade",
    hint: "A set held together before you arrive",
    priceUgx: 30000,
  },
  {
    id: "cabana",
    label: "Poolside cabana for the day",
    hint: "A private shaded cabana with a server",
    priceUgx: 320000,
  },
  {
    id: "poolside-lunch",
    label: "Poolside lunch, per head",
    hint: "A two-course plate brought to your loungers",
    priceUgx: 65000,
    perPerson: true,
  },
  {
    id: "towel-service",
    label: "Towel & locker service, per head",
    hint: "Fresh towels topped up through the day",
    priceUgx: 15000,
    perPerson: true,
  },
];
