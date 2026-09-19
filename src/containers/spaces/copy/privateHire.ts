/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { SpaceId } from "@/containers/spaces/anchors";

export interface HireTier {
  id: string;
  name: string;
  /** The space this tier books out, or `undefined` for an alcove within one. */
  spaceId?: SpaceId;
  capacity: string;
  minSpendUsd: number;
  duration: string;
  pitch: string;
  features: string[];
  featured?: boolean;
}

/**
 * Minimum spends on food and drink, not room fees — benchmarked against
 * Kampala and Nairobi garden and lounge hire. Indicative, confirmed on
 * proposal.
 */
export const hireTiers: HireTier[] = [
  {
    id: "alcove",
    name: "The Private Alcove",
    capacity: "Up to 8 guests",
    minSpendUsd: 250,
    duration: "3 hours",
    pitch: "A curtained corner of the Acropole for a client dinner or a proposal.",
    features: ["Dedicated host", "Bottle on ice on arrival", "Custom menu card"],
  },
  {
    id: "mehmed-buyout",
    name: "Mehmed Pasha Lounge",
    spaceId: "mehmed-pasha-lounge",
    capacity: "36 seated · 60 standing",
    minSpendUsd: 1200,
    duration: "4 hours",
    pitch: "The garden-view lounge and its terrace, exclusively yours.",
    features: ["Terrace included", "Board-dinner layout", "Screen & sound on request"],
  },
  {
    id: "acropole-buyout",
    name: "Acropole Lounge",
    spaceId: "acropole-lounge",
    capacity: "48 seated · 80 standing",
    minSpendUsd: 2400,
    duration: "4 hours",
    pitch: "Fireplace, fountain and a bar with its own mixologists — doors closed.",
    features: ["Signature cocktail named for you", "Live acoustic set", "Fireside lounge set-up"],
    featured: true,
  },
  {
    id: "gardens-event",
    name: "Equatorial Gardens",
    spaceId: "equatorial-gardens",
    capacity: "180 seated · 250 standing",
    minSpendUsd: 1800,
    duration: "5 hours · US$200 per extra hour",
    pitch: "The estate's outdoor event space, from sundowner receptions to weddings.",
    features: ["Festoon lighting", "Power for bands & DJs", "Wet-weather canopy plan"],
  },
];

/** What comes with every private-hire booking, whatever the tier. */
export const hireInclusions = [
  "A named event planner from first call to last guest",
  "Tables, linen, glassware and service staff",
  "Complimentary tasting for bookings over US$1,500",
  "Secure parking and a welcome at the gate",
  "Flexible set-ups: seated, standing or lounge-style",
  "A rain plan for every garden date",
];
