/**
 * The full-bleed photograph behind each page's `PageHero`.
 *
 * This is the LCP element on every route except Home, so it is worth choosing
 * deliberately rather than letting each container reach for whatever is
 * nearest: the whole set is visible here, which is what stops three
 * consecutive pages opening on the same garden.
 *
 * Detail routes key on the entity's own id (`hakki-pasha-restaurant-bar`,
 * `superior-suites`), so a new room or outlet gets the fallback rather than a
 * missing image, and shows up as a one-line fix.
 *
 * Server-only, like the rest of the photography layer — `PageHero` receives a
 * resolved value as a prop and never imports this (DECISIONS.md D25).
 */
import { type PhotoKey, photos } from "@/content/photography";

/** Used when a route has no entry — the estate at dusk reads well anywhere. */
const FALLBACK: PhotoKey = "estateDusk";

const HEROES: Record<string, PhotoKey> = {
  // Accommodation
  accommodation: "deluxeRoomBright",
  "superior-room": "superiorRoomTwo",
  "deluxe-room": "deluxeRoomThree",
  "deluxe-suites": "deluxeSuiteThree",
  "superior-suites": "suiteLivingOne",

  // Dining
  dining: "hakkiPashaGardenRoom",
  "hakki-pasha-restaurant-bar": "hakkiPashaDiningRoom",
  "sir-samuel-baker-fine-dining": "sirBakerHall",
  "rooftop-terrace": "terraceDiningNight",
  "manutea-wine-whisky-lounge": "manuteaLoungeSeating",
  "in-room-dining": "inRoomTrayDetail",

  // Meetings, events and weddings
  events: "kudaraBoardroom",
  "kudara-hall": "banquetHall",
  "meeting-rooms": "boardroomGarden",
  "business-centre": "boardroomProjector",
  weddings: "celebrationNight",

  // Wellness
  wellness: "poolDusk",
  spa: "bathroomTub",
  gym: "poolLoungers",
  pool: "poolNight",
  "spa-etiquette": "poolAerial",

  // Experiences
  "airport-transfer": "estateAerialPalms",
  "cg-shop": "craftShop",

  // Our Story
  story: "estateFacadeDay",
  "story-gm": "lobbyLounge",
  "story-namesake": "estateDuskVeranda",
  "story-the-hotel": "estateFacadeGarden",

  // Everything else
  contact: "estateVeranda",
  faq: "estateFacadeGarden",
  gallery: "estateAerial",
  "gallery-collection": "gardensLawn",
  offers: "estateTerraceDusk",
  spaces: "acropoleLoungeChandelier",
  legal: "estateGardenTerrace",
};

/**
 * The hero photograph for a route key, falling back rather than throwing — a
 * missing hero should be a dull page, never a broken build.
 */
export function pageHeroImage(key: string) {
  return photos[HEROES[key] ?? FALLBACK];
}
