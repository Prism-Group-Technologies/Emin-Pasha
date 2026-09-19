/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import { FACILITY_ID, type FacilityId } from "@/containers/wellness/anchors";

export interface WellnessPillar {
  id: FacilityId;
  /** Route to the dedicated facility page. */
  href: string;
  icon: IconName;
  /** The facility's own name, from `content/wellness.ts`. */
  name: string;
  /** One line under the name. */
  tagline: string;
  /** Two sentences of pitch. */
  blurb: string;
  /** Three or four concrete draws, checked on the card. */
  points: string[];
  /** Placeholder image id — resolves against `copy/media.ts`. */
  assetId: string;
  /** Hours or access note, shown as the card kicker. Verified §6 facts only. */
  kicker: string;
}

/**
 * The three facilities as pillar cards on the hub. Every `kicker`, and the
 * public-access and non-resident-membership points, are approved §6 facts;
 * the treatment and equipment lines restate approved §6 offerings. Times and
 * prices are not asserted here — those live in the treatments and membership
 * bands, flagged as indicative.
 */
export const wellnessPillars: WellnessPillar[] = [
  {
    id: FACILITY_ID.spa,
    href: "/spa",
    icon: "spa",
    name: "Swanky Spa & Wellness Centre",
    tagline: "The deep reset",
    blurb:
      "Tailored massage, facials, deep sea-salt treatments and a full, rejuvenating Turkish bath, delivered by a team that does this all day. The calmest room in Nakasero.",
    points: [
      "Tailored massage & bodywork",
      "Facials for every skin",
      "Deep sea-salt rituals",
      "A full Turkish bath experience",
    ],
    assetId: "wellness-pillar-spa",
    kicker: "Daily · 7:00am – 9:00pm",
  },
  {
    id: FACILITY_ID.gym,
    href: "/gym",
    icon: "fitness-center",
    name: "Emin Pasha Gym",
    tagline: "The daily one",
    blurb:
      "Newly renovated, with cutting-edge equipment, group classes and certified trainers. Membership is open to residents of the neighbourhood, not only hotel guests.",
    points: [
      "Cutting-edge cardio & strength kit",
      "Group fitness classes",
      "Certified personal trainers",
      "Membership for non-residents",
    ],
    assetId: "wellness-pillar-gym",
    kicker: "Daily · 6:00am – 9:00pm",
  },
  {
    id: FACILITY_ID.pool,
    href: "/swimming-pool",
    icon: "pool",
    name: "Swimming Pool",
    tagline: "The easy one",
    blurb:
      "An outdoor pool with stone finishing, set within the poolside gardens — a lush tropical escape. Open to the general public as well as hotel guests, for a swim or a poolside event.",
    points: [
      "Set in the poolside gardens",
      "Open to the public, not only guests",
      "Lengths, or a lounger and a book",
      "Available for poolside parties",
    ],
    assetId: "wellness-pillar-pool",
    kicker: "Open to hotel guests & the public",
  },
];
