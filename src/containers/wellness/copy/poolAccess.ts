/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface PoolAccessOption {
  id: string;
  icon: IconName;
  name: string;
  /** Who the visit suits — the badge line on the card. */
  forWhom: string;
  /** One line of what it is. */
  description: string;
  /** Indicative price in UGX. Invented (§0.7). */
  priceUgx: number;
  /** e.g. "per adult, per day" / "per lane, 45 min". */
  priceUnit: string;
  /** What the rate covers, checked on the card. */
  includes: string[];
}

/**
 * The pool's day-rate menu — no membership needed. Each option recombines an
 * already-approved §6 capability (public swimming, the poolside gardens,
 * private hire, children accompanied by an adult) for a different kind of
 * day. Prices are invented placeholders (TODO(EMIN-Q11)) and flagged
 * indicative on every card and in the section copy.
 */
export const poolAccessOptions: PoolAccessOption[] = [
  {
    id: "day-pass",
    icon: "pool",
    name: "Public Day Pass",
    forWhom: "Non-resident swimmers",
    description:
      "Full use of the pool and the poolside gardens for the day, from opening to close.",
    priceUgx: 50000,
    priceUnit: "per adult, per day",
    includes: [
      "All-day pool & garden access",
      "A lounger while they last",
      "Towel and a locker",
      "Under-12s at half rate, accompanied",
    ],
  },
  {
    id: "sunrise-lane",
    icon: "verified",
    name: "Sunrise Lane Hire",
    forWhom: "Lap swimmers",
    description:
      "A reserved lane before the pool opens to the public — a proper set with clear water and no traffic.",
    priceUgx: 70000,
    priceUnit: "per lane, 45 min",
    includes: [
      "A lane to yourself, 6:00–7:30am",
      "Kickboards and pull buoys",
      "Warm showers and a locker",
      "Book single mornings or a block of ten",
    ],
  },
  {
    id: "family-garden-day",
    icon: "groups",
    name: "Family Garden Day",
    forWhom: "Two adults + up to three children",
    description:
      "One rate for the whole family, with loungers held together in the shade of the gardens.",
    priceUgx: 150000,
    priceUnit: "the family, per day",
    includes: [
      "Pool & garden access for five",
      "A shaded set of loungers, reserved",
      "Kickboards and pool toys",
      "Kitchen open for lunch poolside",
    ],
  },
  {
    id: "cabana",
    icon: "celebration",
    name: "Poolside Cabana",
    forWhom: "A group of up to six",
    description:
      "A private shaded cabana at the water's edge for the day, with a dedicated server and a drinks tab to open.",
    priceUgx: 320000,
    priceUnit: "the cabana, per day",
    includes: [
      "A reserved cabana with day beds",
      "Day-pass access for six included",
      "A dedicated poolside server",
      "A fruit platter and a jug of juice to start",
    ],
  },
  {
    id: "aqua-fitness",
    icon: "auto-awesome",
    name: "Aqua-Fitness Class",
    forWhom: "All levels, gentle on joints",
    description:
      "A 45-minute instructor-led session in the shallow end — resistance work, mobility and cardio in the water.",
    priceUgx: 45000,
    priceUnit: "per class",
    includes: [
      "45 minutes, instructor-led",
      "Pool noodles and resistance kit",
      "Garden and shower access after",
      "Weekday mornings and Saturday",
    ],
  },
  {
    id: "swim-school",
    icon: "check-circle",
    name: "Learn-to-Swim Lesson",
    forWhom: "Children aged 4 and up",
    description:
      "One-to-one with an instructor in the shallow end, parent poolside throughout. Blocks of six bring the rate down.",
    priceUgx: 90000,
    priceUnit: "per 30-min lesson",
    includes: [
      "One-to-one instruction",
      "Shallow end, parent poolside",
      "A short progress note after each lesson",
      "Six-lesson block at a reduced rate",
    ],
  },
];

/**
 * The pool safety facts, kept prominent rather than buried. The first three
 * are the approved §6 / §14 rules verbatim in substance ("no lifeguard on
 * duty", "maximum depth 1.60m", accompanied children); the rest are ordinary
 * pool-safety practice, not a new claim about the property.
 */
export const poolSafetyFacts = [
  "There is no lifeguard on duty. Everyone swims at their own risk.",
  "Maximum depth is 1.60m — shallow enough for most, deep enough to take seriously.",
  "Children may use the pool only when accompanied and actively supervised by a parent, adult or guardian.",
  "No glass at the poolside, and no diving — the pool is not depth-rated for it.",
  "Tell the desk before you swim if you have a heart condition, are pregnant, or have had alcohol.",
];
