/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import type { SpaceId } from "@/containers/spaces/anchors";

export interface SignatureExperience {
  id: string;
  title: string;
  spaceId: SpaceId;
  icon: IconName;
  priceUsd: number;
  unit: string;
  duration: string;
  summary: string;
  includes: string[];
  badge?: string;
  assetId: string;
}

/**
 * Six reservable rituals, priced in US dollars against East African 5-star
 * benchmarks (afternoon tea, a cocktail class, a garden permit). Indicative,
 * confirmed when the reservation is.
 */
export const signatureExperiences: SignatureExperience[] = [
  {
    id: "afternoon-tea",
    title: "The Emin Pasha Afternoon Tea",
    spaceId: "mehmed-pasha-lounge",
    icon: "coffee",
    priceUsd: 48,
    unit: "for two",
    duration: "90 min · daily from 15:00",
    summary: "Three tiers on the garden terrace, with Ugandan teas poured at the table.",
    includes: ["Finger sandwiches & warm scones", "Pastry tier", "Bottomless tea or coffee"],
    badge: "Most booked",
    assetId: "spaces-exp-afternoon-tea",
  },
  {
    id: "cocktail-masterclass",
    title: "Mixologist's Masterclass",
    spaceId: "acropole-lounge",
    icon: "cocktail",
    priceUsd: 45,
    unit: "per guest",
    duration: "75 min · Thu–Sat, 18:00",
    summary: "Behind the bar with the mixologists — shake, stir and name your own drink.",
    includes: ["Three cocktails you make", "Bar snacks", "Recipe card to take home"],
    assetId: "spaces-exp-masterclass",
  },
  {
    id: "fireside-whisky",
    title: "Fireside Whisky Flight",
    spaceId: "acropole-lounge",
    icon: "fireplace",
    priceUsd: 38,
    unit: "per guest",
    duration: "60 min · nightly from 19:00",
    summary: "Four pours from single malt to world blends, served in armchairs by the fire.",
    includes: ["Four 20ml pours", "Tasting notes", "Dark chocolate pairing"],
    assetId: "spaces-exp-whisky",
  },
  {
    id: "sundowner-picnic",
    title: "Sundowner Picnic",
    spaceId: "equatorial-gardens",
    icon: "garden",
    priceUsd: 65,
    unit: "for two",
    duration: "2 hours · daily from 17:00",
    summary: "A blanket, a hamper and a bottle of sparkling wine on the lawn at golden hour.",
    includes: ["Grazing hamper for two", "Bottle of sparkling wine", "Lanterns after dark"],
    badge: "Date-night pick",
    assetId: "spaces-exp-picnic",
  },
  {
    id: "lounge-day-pass",
    title: "Work-from-the-Lounge Day Pass",
    spaceId: "mehmed-pasha-lounge",
    icon: "laptop",
    priceUsd: 29,
    unit: "per day",
    duration: "07:00 – 17:00 · weekdays",
    summary: "A garden-view desk seat for non-residents who need a calmer office.",
    includes: ["Fast Wi-Fi & power", "Unlimited coffee & tea", "US$12 lunch credit"],
    assetId: "spaces-exp-day-pass",
  },
  {
    id: "garden-photoshoot",
    title: "Garden Photoshoot Pass",
    spaceId: "equatorial-gardens",
    icon: "camera",
    priceUsd: 150,
    unit: "per 2 hours",
    duration: "Booked slots · golden hour on request",
    summary: "The city's best outdoor picture spot, reserved for your photographer.",
    includes: ["Up to 6 people on set", "Changing room access", "Soft drinks for the crew"],
    assetId: "spaces-exp-photoshoot",
  },
];
