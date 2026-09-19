import { diningOutlets } from "@/content/dining";
import { spaces } from "@/content/spaces";

export {
  MENUS_ANCHOR_ID,
  OUTLETS_ANCHOR_ID,
  OUTLET_ID,
  OUTLET_ORDER,
  type OutletId,
  RESERVE_ANCHOR_ID,
} from "@/containers/dining/anchors";

export const outletSlugs = diningOutlets.map((outlet) => outlet.id);

/** Internal cross-sell out of Dining — labels resolve from `navigation`. */
export const DINING_RELATED_HREFS = [
  "/accommodation",
  "/meetings-and-events",
  "/offers",
  "/lounges-and-spaces",
];

/** Per-outlet and per-space imagery, by the ids already in content/assets.ts. */
export const OUTLET_ASSET_IDS: Record<string, string> = {
  "hakki-pasha-restaurant-bar": "dining-hakki-pasha",
  "sir-samuel-baker-fine-dining": "dining-sir-samuel-baker",
  "rooftop-terrace": "dining-rooftop-terrace",
  "manutea-wine-whisky-lounge": "dining-manutea",
  "in-room-dining": "dining-in-room",
  "acropole-lounge": "lounge-acropole",
  "mehmed-pasha-lounge": "lounge-mehmed-pasha",
  "equatorial-gardens": "lounge-equatorial-gardens",
};

export const spaceSlugs = spaces.map((space) => space.id);

/**
 * Where each name comes from. Three outlets and one lounge are named for
 * people in the Emin Pasha story, and `namedForNote` on the content object
 * already carries the approved sentence — this only supplies the deep link
 * to the pillar page, which is where CLAUDE.md §9 wants that authority to
 * accumulate.
 */
export const NAMESAKE_HREF = "/our-story/emin-pasha";
