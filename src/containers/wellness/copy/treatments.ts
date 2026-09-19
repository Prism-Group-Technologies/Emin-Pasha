/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { FACILITY_ID, type FacilityId } from "@/containers/wellness/anchors";

export interface Treatment {
  id: string;
  facility: FacilityId;
  name: string;
  /** One line of what it is / who it is for. */
  description: string;
  /** Human duration, e.g. "60 min" or "Day pass". */
  duration: string;
  /** Indicative price in UGX. Invented — no rate is in the source (§0.7). */
  priceUgx: number;
  priceQualifier?: "from" | "per person";
  /** Placeholder image id — only the lead treatments carry one. */
  assetId?: string;
}

const { spa, gym, pool } = FACILITY_ID;

/**
 * The signature-treatment strip. Prices and durations are **invented
 * placeholders** (TODO(EMIN-Q11)) and flagged "indicative" wherever they
 * render. Each name maps onto an approved §6 offering — tailored massage,
 * facials, deep sea-salt, the Turkish bath, personal training, group
 * classes, public swimming.
 */
export const signatureTreatments: Treatment[] = [
  {
    id: "signature-massage",
    facility: spa,
    name: "Emin Pasha Signature Massage",
    description:
      "A full-body treatment read to your day — pressure, pace and oils chosen with you.",
    duration: "60 / 90 min",
    priceUgx: 260000,
    priceQualifier: "from",
    assetId: "wellness-treatment-signature-massage",
  },
  {
    id: "turkish-bath",
    facility: spa,
    name: "The Turkish Bath Ritual",
    description:
      "Steam, a black-soap cleanse, a full exfoliation on the heated marble, a foam massage.",
    duration: "75 min",
    priceUgx: 320000,
    assetId: "wellness-treatment-turkish-bath",
  },
  {
    id: "tailored-facial",
    facility: spa,
    name: "Tailored Facial",
    description: "Skin analysed first, then a cleanse, exfoliation, mask and massage built for it.",
    duration: "60 min",
    priceUgx: 240000,
    assetId: "wellness-treatment-facial",
  },
  {
    id: "sea-salt-ritual",
    facility: spa,
    name: "Deep Sea-Salt Body Ritual",
    description:
      "A mineral salt scrub, a warm wrap and a light massage — for tired legs and dry skin.",
    duration: "90 min",
    priceUgx: 300000,
    assetId: "wellness-treatment-sea-salt",
  },
  {
    id: "pt-session",
    facility: gym,
    name: "Personal Training Session",
    description:
      "One-to-one with a certified trainer — technique, a plan you keep, someone counting.",
    duration: "55 min",
    priceUgx: 120000,
    priceQualifier: "from",
    assetId: "wellness-treatment-pt",
  },
  {
    id: "fitness-assessment",
    facility: gym,
    name: "Fitness Assessment & Plan",
    description: "Movement screen, baseline numbers and a written programme to train against.",
    duration: "45 min",
    priceUgx: 150000,
  },
  {
    id: "group-class",
    facility: gym,
    name: "Group Class Drop-In",
    description:
      "Strength, conditioning, mobility or spin — pay for one class without a membership.",
    duration: "45 min",
    priceUgx: 45000,
  },
  {
    id: "pool-day-pass",
    facility: pool,
    name: "Pool Day Pass",
    description:
      "Full use of the pool and the poolside gardens for the day, non-resident swimmers.",
    duration: "Day pass",
    priceUgx: 50000,
    priceQualifier: "from",
  },
  {
    id: "lane-hire",
    facility: pool,
    name: "Early Lane Hire",
    description: "A reserved lane before the pool opens to the public, for a proper swim set.",
    duration: "45 min",
    priceUgx: 70000,
  },
  {
    id: "kids-lesson",
    facility: pool,
    name: "Children's Swim Lesson",
    description:
      "One-to-one with an instructor in the shallow end, parent poolside. Ages 4 and up.",
    duration: "30 min",
    priceUgx: 90000,
  },
];
