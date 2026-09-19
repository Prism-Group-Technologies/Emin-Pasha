/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { SpaceId } from "@/containers/spaces/anchors";

import { type SeatingZone, seatingZones } from "./zones";

export type { SeatingZone } from "./zones";

export interface SpaceProfile {
  id: SpaceId;
  /** Display-face chapter number, "01". */
  number: string;
  tagline: string;
  bestFor: string[];
  setting: "Indoor" | "Indoor & outdoor" | "Outdoor";
  seated: number;
  standing: number;
  hours: string;
  dressCode: string;
  signature: string;
  /** Minimum spend for an exclusive evening, US$ — indicative. */
  hireFromUsd: number;
  zones: SeatingZone[];
  /** Placeholder photo slots in `./media`: one lead image, two supporting. */
  assetIds: [string, string, string];
}

/**
 * The invented, practical layer around each approved §5 space. The approved
 * description still renders verbatim beside it; nothing here contradicts it.
 * Every figure is indicative; the seating zones live in `./zones`.
 */
export const spaceProfiles: SpaceProfile[] = [
  {
    id: "acropole-lounge",
    number: "01",
    tagline: "Firelight, a mixologist's bar and a seat for every mood.",
    bestFor: ["After-work drinks", "Date night", "Discreet meetings", "Nightcaps"],
    setting: "Indoor",
    seated: 48,
    standing: 80,
    hours: "10:00 – late",
    dressCode: "Smart casual",
    signature: "The Pasha Old Fashioned, stirred at the bar",
    hireFromUsd: 2400,
    zones: seatingZones["acropole-lounge"],
    assetIds: ["spaces-acropole-fireside", "spaces-acropole-bar", "spaces-acropole-alcove"],
  },
  {
    id: "mehmed-pasha-lounge",
    number: "02",
    tagline: "A garden-view lounge for closing out the clutter.",
    bestFor: ["Quiet work", "Afternoon tea", "One-to-ones", "Reading"],
    setting: "Indoor & outdoor",
    seated: 36,
    standing: 60,
    hours: "07:00 – 22:00",
    dressCode: "Relaxed",
    signature: "The Emin Pasha Afternoon Tea, on the terrace",
    hireFromUsd: 1200,
    zones: seatingZones["mehmed-pasha-lounge"],
    assetIds: ["spaces-mehmed-terrace", "spaces-mehmed-reading", "spaces-mehmed-tea"],
  },
  {
    id: "equatorial-gardens",
    number: "03",
    tagline: "Kampala's best outdoor picture spot — and its calmest.",
    bestFor: ["Celebrations", "Receptions", "Photoshoots", "Sundowners"],
    setting: "Outdoor",
    seated: 180,
    standing: 250,
    hours: "08:00 – 23:00",
    dressCode: "Garden smart",
    signature: "The Sundowner Picnic, laid on the lawn",
    hireFromUsd: 1800,
    zones: seatingZones["equatorial-gardens"],
    assetIds: ["spaces-gardens-lawn", "spaces-gardens-golden-hour", "spaces-gardens-reception"],
  },
];

const byId = new Map(spaceProfiles.map((profile) => [profile.id, profile]));

/** Resolve one profile by id, or `undefined` if unknown. */
export function spaceProfile(id: string): SpaceProfile | undefined {
  return byId.get(id as SpaceId);
}
