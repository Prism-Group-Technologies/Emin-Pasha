/**
 * The full-bleed photograph behind each page's `PageHero`.
 *
 * This is the LCP element on every route except Home, so it is worth choosing
 * deliberately rather than letting each container reach for whatever is
 * nearest: the whole set is visible here, which is what stops three
 * consecutive pages opening on the same garden.
 *
 * Detail routes key on the entity's own id (`equatoria-restaurant-bar`,
 * `vip-suite`), so a new room or outlet gets the fallback rather than a
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
  accommodation: "deluxeRoomGardenDoors",
  "apartment-room": "apartmentRoomLiving",
  "deluxe-room": "deluxeRoomLamplight",
  "deluxe-suites": "deluxeSuiteGardenWindow",
  "vip-suite": "vipSuiteLivingRoom",

  // Dining
  dining: "equatoriaGardenRoom",
  "equatoria-restaurant-bar": "equatoriaDiningRoom",
  "rooftop-terrace": "terraceDiningNight",
  "manutea-wine-whisky-lounge": "manuteaLoungeSeating",
  "in-room-dining": "inRoomTrayDetail",

  // Meetings, events and weddings
  events: "kudaraBoardroom",
  "kudara-hall": "banquetHall",
  "meeting-rooms": "boardroomArtWall",
  weddings: "celebrationNight",

  // Wellness
  wellness: "poolDusk",
  spa: "bathroomTub",
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

/**
 * Route keys that are *not* simply the href's last path segment.
 *
 * Almost every route already keys on its own slug — `/kudara-hall`,
 * `/accommodation/vip-suite`, `/experiences/airport-transfer` — so the
 * last segment resolves them for free. Only the handful whose key was chosen
 * for brevity, or which share one hero across a group, need stating.
 */
const KEY_BY_SEGMENT: Record<string, string> = {
  "lounges-and-spaces": "spaces",
  "meetings-and-events": "events",
  "spa-and-wellness": "wellness",
  "swimming-pool": "pool",
  "our-story": "story",
  "emin-pasha": "story-namesake",
  "the-hotel": "story-the-hotel",
  "message-from-the-general-manager": "story-gm",
  "privacy-policy": "legal",
  "cookie-policy": "legal",
  "cookie-settings": "legal",
  terms: "legal",
  accessibility: "legal",
};

/**
 * The photograph a route opens on, addressed by href rather than by route key.
 *
 * It exists for cross-links: a tile pointing at Dining shows the photograph
 * Dining itself opens on, so the destination is already familiar on arrival,
 * and no second asset has to be commissioned or kept in sync. Deriving the key
 * from the href rather than keeping a parallel href→photo table is what stops
 * the two drifting when a route is renamed.
 *
 * Falls back exactly as `pageHeroImage` does, so an unmapped href is a dull
 * tile rather than a crash.
 */
export function routePhoto(href: string) {
  const [path = ""] = href.split(/[#?]/);
  const last = path.split("/").filter(Boolean).at(-1) ?? "";
  return pageHeroImage(KEY_BY_SEGMENT[last] ?? last);
}
