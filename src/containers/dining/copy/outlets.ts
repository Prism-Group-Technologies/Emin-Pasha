/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { HeroStatItem } from "@/components/organisms/PageHero";
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";
import { type OutletFact, outletFacts } from "@/containers/dining/copy/facts";

export interface OutletMeta {
  /** Short kicker shown on cards and in the hero eyebrow line. */
  kicker: string;
  cuisine: string;
  setting: string;
  dress: string;
  /** Hero figure rail on the outlet detail page. */
  stats: HeroStatItem[];
  /** "Good to know" grid on the outlet detail page — see `./facts.ts`. */
  facts: OutletFact[];
}

/**
 * Per-outlet framing for the detail pages. `cuisine` / `setting` / `dress`
 * are invented positioning; the fact grid is defined in `./facts.ts`.
 */
export const outletMeta = {
  [OUTLET_ID.hakkiPasha]: {
    kicker: "All-day restaurant & bar",
    cuisine: "International & local fusion",
    setting: "Dining room, bar and garden terrace",
    dress: "Smart-casual",
    stats: [
      { value: "06:30–late", label: "breakfast to nightcap" },
      { value: "À la carte", label: "and handcrafted cocktails" },
      { value: "Garden", label: "terrace seating" },
      { value: "Walk-ins", label: "welcome when there's space" },
    ],
    facts: outletFacts[OUTLET_ID.hakkiPasha],
  },
  [OUTLET_ID.sirSamuelBaker]: {
    kicker: "Fine dining",
    cuisine: "Modern tasting menu",
    setting: "Intimate evening dining room",
    dress: "Smart — collared shirt or equivalent",
    stats: [
      { value: "5 courses", label: "set tasting menu" },
      { value: "Tue–Sat", label: "dinner service" },
      { value: "20:30", label: "last seating" },
      { value: "Pairing", label: "wine flight on request" },
    ],
    facts: outletFacts[OUTLET_ID.sirSamuelBaker],
  },
  [OUTLET_ID.rooftopTerrace]: {
    kicker: "Rooftop bar",
    cuisine: "Small plates & cocktails",
    setting: "Open-air terrace above the trees",
    dress: "Relaxed",
    stats: [
      { value: "16:00–23:00", label: "daily" },
      { value: "Sundown", label: "the table everyone wants" },
      { value: "Small plates", label: "and a long drinks list" },
      { value: "City", label: "skyline views" },
    ],
    facts: outletFacts[OUTLET_ID.rooftopTerrace],
  },
  [OUTLET_ID.manutea]: {
    kicker: "Wine & whisky lounge",
    cuisine: "Wines by the glass, single malts, sharing plates",
    setting: "Low-lit lounge",
    dress: "Smart-casual",
    stats: [
      { value: "Coravin", label: "pours by the glass" },
      { value: "Single malts", label: "from four regions" },
      { value: "Tue–Sat", label: "17:00 – midnight" },
      { value: "Cheese", label: "& charcuterie board" },
    ],
    facts: outletFacts[OUTLET_ID.manutea],
  },
  [OUTLET_ID.inRoom]: {
    kicker: "In-room dining",
    cuisine: "Special-Select menu",
    setting: "Your room, any category",
    dress: "As you are",
    stats: [
      { value: "24/7", label: "every room category" },
      { value: "06:00–23:00", label: "full menu" },
      { value: "Overnight", label: "menu from 23:00" },
      { value: "~20 min", label: "typical delivery" },
    ],
    facts: outletFacts[OUTLET_ID.inRoom],
  },
} satisfies Record<OutletId, OutletMeta>;
