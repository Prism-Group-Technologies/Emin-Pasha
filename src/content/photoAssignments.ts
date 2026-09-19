/**
 * Which delivered photograph fills which asset slot.
 *
 * The site declares ~165 image slots but the hotel has delivered 81
 * photographs, so photographs are reused across slots. That is a deliberate
 * decision, not an oversight: a slot with no assignment falls back to the
 * labelled placeholder, and shipping a site two-thirds covered in build
 * scaffolding reads worse than showing the same garden twice.
 *
 * `photoAssignments` is the single source of truth for "delivered" — the
 * asset schema's transform (see `@/schemas/content/assetRef`) looks every
 * parsed asset up here, so adding a line below is all it takes to fill a
 * slot anywhere on the site.
 *
 * ── Reading a line ──────────────────────────────────────────────────────
 * Lines marked `STRETCH:` are assignments where no delivered photograph
 * actually depicts the subject the slot asks for. They are filled with the
 * nearest tonal match so the page reads as finished, and they are the
 * shooting brief: every `STRETCH:` line is a frame the hotel still owes.
 * `yarn check:photos` prints them as a list.
 *
 * The categories with no genuine coverage at all are: every human portrait
 * (general manager, therapists, chauffeurs, guest faces), every plated dish,
 * the gym, the spa treatment rooms, vehicles, and the two diagram slots
 * (Kudara floor plan, contact map).
 */
import { type PhotoKey, photos } from "@/content/photography";

/**
 * A slot marked as needing photography the hotel has not delivered. Kept as a
 * separate set rather than a comment so `check:photos` can report it and so
 * nobody has to grep for a convention.
 */
export const stretchedAssignments = new Set<string>([
  // No spa or gym photography exists at all.
  "spa-treatment-room",
  "home-feature-spa",
  "spa-gym",
  "wellness-pillar-spa",
  "wellness-pillar-gym",
  "wellness-treatment-signature-massage",
  "wellness-treatment-turkish-bath",
  "wellness-treatment-facial",
  "wellness-treatment-sea-salt",
  "wellness-treatment-pt",
  "wellness-journey",
  "wellness-package-day-retreat",
  "wellness-package-couples",
  "wellness-package-corporate",
  "spa-ritual-hammam",
  "spa-group-bridal",
  "spa-group-corporate",
  "gallery-spa-hammam-steam",
  "gallery-spa-couples-suite",
  "gallery-spa-relaxation-tea",
  "gallery-gym-sunrise",
  "gallery-lens-spa",
  // Portraits — no photograph of any member of staff or guest exists.
  "story-emin-pasha-portrait",
  "home-feature-story",
  "story-gm-photo",
  "contact-team-1",
  "contact-team-2",
  "contact-team-3",
  "contact-team-4",
  "spa-therapist-1",
  "spa-therapist-2",
  "spa-therapist-3",
  "spa-therapist-4",
  "transfer-chauffeur-moses",
  "transfer-chauffeur-grace",
  "transfer-chauffeur-ibrahim",
  "transfer-arrivals-board",
  "transfer-vip-assist",
  "transfer-chauffeur-hourly",
  // Vehicles — the fleet has never been photographed.
  "experiences-airport-transfer",
  "transfer-fleet-saloon",
  "transfer-fleet-suv",
  "transfer-fleet-van",
  "transfer-fleet-coach",
  // Plated food — only room-service trays and drinks were delivered.
  "dining-hakki-pasha-dish-mezze",
  "dining-hakki-pasha-dish-charcoal-chicken",
  "dining-hakki-pasha-dish-nile-perch",
  "dining-sir-samuel-baker-dish-scallop",
  "dining-sir-samuel-baker-dish-short-rib",
  "dining-sir-samuel-baker-dish-chocolate",
  "dining-rooftop-terrace-dish-corn-ribs",
  "dining-rooftop-terrace-dish-suya-skewers",
  "dining-manutea-dish-cheese-board",
  "gallery-dining-chef-plating",
  "gallery-dining-kids-menu",
  // Diagrams, not photographs.
  "meetings-kudara-floorplan",
  "contact-static-map",
  "transfer-route-map",
  // Moments with people in frame that were never shot.
  "gallery-wedding-first-dance",
  "gallery-wedding-bridal-suite",
  "gallery-gardens-picnic",
  "gallery-pool-kids-afternoon",
  "gallery-lens-proposal",
  "gallery-lens-wedding",
  "gallery-lens-breakfast",
  "spaces-exp-masterclass",
  "spaces-exp-photoshoot",
  "spaces-moment-proposal",
  "spaces-moment-launch",
  "spaces-moment-prewedding",
]);

/** Asset id → the photograph that fills it. */
export const photoAssignments: Record<string, PhotoKey> = {
  // ── Home ──────────────────────────────────────────────────────────────
  "home-hero-poster": "estateDusk",
  "home-og-image": "estateAerial",

  // Intro carousel. Deliberately reuses the delivered accommodation frames
  // rather than duplicating masters: `src/assets/images/Home/hero/` holds
  // unoptimised copies of photographs already registered under
  // `general/`, `dining/`, `meetings/`, `wellness/` and `accommodation/`.
  "home-intro-room-1": "superiorRoomOne",
  "home-intro-room-2": "deluxeRoomOne",
  "home-intro-room-3": "superiorSuiteTeal",
  "home-intro-room-4": "deluxeSuiteOne",
  "home-intro-room-5": "deluxeRoomGardenDoors",

  // Rate cards. Different frames from the carousel above, same four
  // categories — see the note on `home-rate-*` in `./assets.ts`.
  "home-rate-superior-room": "superiorRoomTwo",
  "home-rate-deluxe-room": "deluxeRoomBright",
  "home-rate-deluxe-suites": "deluxeSuiteFour",
  "home-rate-superior-suites": "suiteLivingOne",

  // Estate tiles. One per `site.homepage.featureTiles` id.
  "home-feature-rooms": "suiteTerrace",
  "home-feature-dining": "hakkiPashaDiningRoom",
  "home-feature-spa": "bathroomTub", // STRETCH: no spa photography exists
  "home-feature-pool": "poolNight",
  "home-feature-events": "celebrationNight",
  "home-feature-story": "estateFacadeDay", // STRETCH: no portrait of Emin Pasha

  // ── Accommodation ─────────────────────────────────────────────────────
  "room-superior-room": "superiorRoomOne",
  "room-deluxe-room": "deluxeRoomOne",
  "room-deluxe-suites": "deluxeSuiteOne",
  "room-superior-suites": "superiorSuiteTeal",

  // Room galleries — the alternate angles delivered for each category.
  "room-superior-room-2": "superiorRoomThree",
  "room-superior-room-3": "superiorRoomFour",
  "room-deluxe-room-2": "deluxeRoomTwo",
  "room-deluxe-room-3": "deluxeRoomThree",
  "room-deluxe-room-4": "deluxeRoomGardenDoors",
  "room-deluxe-room-5": "deluxeRoomWardrobe",
  "room-deluxe-suites-2": "deluxeSuiteTwo",
  "room-deluxe-suites-3": "deluxeSuiteThree",
  "room-deluxe-suites-4": "deluxeSuiteFour",
  "room-superior-suites-2": "superiorSuiteBed",
  "room-superior-suites-3": "superiorSuiteArmchair",
  "room-superior-suites-4": "superiorSuiteDoorway",
  "room-superior-suites-5": "suiteLivingTwo",
  "room-superior-suites-6": "suiteCourtyard",

  // ── Dining outlets ────────────────────────────────────────────────────
  "dining-hakki-pasha": "hakkiPashaDiningRoom",
  "dining-sir-samuel-baker": "sirBakerDiningRoom",
  "dining-rooftop-terrace": "terraceDiningNight",
  "dining-manutea": "manuteaLounge",
  "dining-in-room": "inRoomTray",

  // ── Lounges and gardens ───────────────────────────────────────────────
  "lounge-acropole": "acropoleLoungeChandelier",
  "lounge-mehmed-pasha": "mehmedLounge",
  "lounge-equatorial-gardens": "gardensLush",

  // ── Wellness (no spa or gym photography delivered) ────────────────────
  "spa-treatment-room": "bathroomTub", // STRETCH: a guest bathroom, not a treatment room
  "spa-gym": "poolLoungers", // STRETCH: poolside, not the gym floor
  "spa-pool": "poolDusk",

  // ── Meetings and events ───────────────────────────────────────────────
  "meetings-kudara-hall": "kudaraBoardroom",
  "meetings-private-rooms": "boardroomProjector",
  "meetings-business-centre": "boardroomGarden",
  "meetings-kudara-floorplan": "banquetHall", // STRETCH: a photo where a diagram belongs
  "meetings-poolside-lawn": "poolNight",
  "weddings-equatorial-gardens": "celebrationNight",

  // ── Experiences ───────────────────────────────────────────────────────
  "experiences-airport-transfer": "estateAerialDrive", // STRETCH: the drive, no vehicle
  "experiences-cg-shop": "craftShop",
  "offers-friday-band-night": "estateTerraceDusk",

  // ── Our Story ─────────────────────────────────────────────────────────
  "story-the-hotel": "estateFacadeDay",
  "story-emin-pasha-portrait": "estateFacadeGarden", // STRETCH: no portrait exists
  "story-gm-photo": "lobbyLounge", // STRETCH: no portrait exists

  // ── Contact ───────────────────────────────────────────────────────────
  "contact-static-map": "estateAerialGardens", // STRETCH: an aerial, not a map
  "contact-team-1": "lobbyLounge", // STRETCH: no staff portraits exist
  "contact-team-2": "acropoleLoungeBar", // STRETCH: no staff portraits exist
  "contact-team-3": "banquetLongTable", // STRETCH: no staff portraits exist
  "contact-team-4": "estateVeranda", // STRETCH: no staff portraits exist

  // ── Legal ─────────────────────────────────────────────────────────────
  "legal-promise-garden-walk": "estateGardenTerrace",

  // ── FAQ guide cards ───────────────────────────────────────────────────
  "faq-guide-arrival": "estateAerialPalms",
  "faq-guide-dining": "gardenVerandaDining",
  "faq-guide-wellness": "poolAerial",
  "faq-guide-events": "celebrationNight",

  // ── Gallery: stay ─────────────────────────────────────────────────────
  "gallery-suite-petal-turndown": "pillowDetailGold",
  "gallery-suite-bath-candles": "bathroomTub",
  "gallery-room-desk-morning": "deluxeRoomBright",
  "gallery-suite-family-connecting": "superiorSuitePassage",
  "gallery-room-garden-balcony": "suiteTerrace",

  // ── Gallery: dining ───────────────────────────────────────────────────
  "gallery-dining-candlelit-two": "tableSetting",
  "gallery-dining-chef-plating": "sirBakerHall", // STRETCH: no plated-dish photography
  "gallery-dining-breakfast-terrace": "terraceDining",
  "gallery-dining-cocktail-pour": "cocktailsBar",
  "gallery-dining-kids-menu": "coffeeService", // STRETCH: no plated-dish photography

  // ── Gallery: lounges and gardens ──────────────────────────────────────
  "gallery-lounge-alcove-meeting": "manuteaLoungeRed",
  "gallery-lounge-fireside-night": "acropoleLounge",
  "gallery-gardens-picnic": "gardensLawn", // STRETCH: no guests in frame
  "gallery-estate-dawn-facade": "estateFacadeDay",
  "gallery-estate-garden-path": "estateGardenTerrace",
  "gallery-estate-lantern-night": "estateDusk",
  "gallery-estate-birds-canopy": "gardensLush",
  "gallery-estate-arrival-porch": "estateVeranda",

  // ── Gallery: wellness (stretched throughout) ──────────────────────────
  "gallery-spa-hammam-steam": "bathroomTub", // STRETCH: no spa photography
  "gallery-spa-couples-suite": "bathroomVanity", // STRETCH: no spa photography
  "gallery-spa-relaxation-tea": "hotDrinksBar", // STRETCH: no spa photography
  "gallery-pool-morning-laps": "poolAerial",
  "gallery-pool-kids-afternoon": "poolLoungers", // STRETCH: no guests in frame
  "gallery-gym-sunrise": "poolNight", // STRETCH: no gym photography

  // ── Gallery: occasions ────────────────────────────────────────────────
  "gallery-wedding-aisle": "gardensLawn",
  "gallery-wedding-long-table": "banquetLongTable",
  "gallery-wedding-first-dance": "celebrationNight", // STRETCH: no guests in frame
  "gallery-wedding-bridal-suite": "superiorSuiteLamp", // STRETCH: no guests in frame
  "gallery-event-band-night": "estateTerraceDusk",
  "gallery-meeting-boardroom-break": "coffeeCappuccino",

  // ── Gallery: guest lens ───────────────────────────────────────────────
  "gallery-lens-poolside": "poolLoungers",
  "gallery-lens-breakfast": "coffeeService", // STRETCH: no guests in frame
  "gallery-lens-proposal": "gardensLawn", // STRETCH: no guests in frame
  "gallery-lens-cocktail": "cocktailsGarden",
  "gallery-lens-suite": "suiteLivingAbove",
  "gallery-lens-garden": "estateGardenTerrace",
  "gallery-lens-wedding": "estateTerraceDusk", // STRETCH: no guests in frame
  "gallery-lens-spa": "poolLoungers", // STRETCH: no spa photography

  // ── Gallery: film and tour posters ────────────────────────────────────
  "gallery-film-poster": "estateAerial",
  "gallery-tour-poster": "suiteLivingOne",
  "gallery-exterior": "estateFacadeGarden",
  "gallery-pool": "poolAerial",
  "gallery-gardens": "gardensLawn",

  // ── Lounges & Spaces ──────────────────────────────────────────────────
  "spaces-acropole-fireside": "acropoleLounge",
  "spaces-acropole-bar": "acropoleLoungeBar",
  "spaces-acropole-alcove": "manuteaLoungeRed",
  "spaces-mehmed-terrace": "mehmedLounge",
  "spaces-mehmed-reading": "mehmedLoungeChairs",
  "spaces-mehmed-tea": "cottageLounge",
  "spaces-gardens-lawn": "gardensLawn",
  "spaces-gardens-golden-hour": "estateGardenTerrace",
  "spaces-gardens-reception": "estateTerraceDusk",
  "spaces-exp-afternoon-tea": "coffeeService",
  "spaces-exp-masterclass": "cocktailsBar", // STRETCH: no guests in frame
  "spaces-exp-whisky": "manuteaLoungeSeating",
  "spaces-exp-picnic": "gardensLush",
  "spaces-exp-day-pass": "cottageTerrace",
  "spaces-exp-photoshoot": "estateVeranda", // STRETCH: no guests in frame
  "spaces-moment-proposal": "acropoleLoungeChandelier", // STRETCH: no guests in frame
  "spaces-moment-launch": "lobbyLounge", // STRETCH: no guests in frame
  "spaces-moment-reception": "celebrationNight",
  "spaces-moment-birthday": "banquetHall",
  "spaces-moment-prewedding": "gardensLawn", // STRETCH: no guests in frame

  // ── Spa & Wellness hub (no spa or gym photography delivered) ──────────
  "wellness-hub-hero": "poolDusk",
  "wellness-pillar-spa": "bathroomTub", // STRETCH: no spa photography
  "wellness-pillar-gym": "poolLoungers", // STRETCH: no gym photography
  "wellness-pillar-pool": "poolAerial",
  "wellness-treatment-signature-massage": "bathroomVanity", // STRETCH
  "wellness-treatment-turkish-bath": "bathroomTub", // STRETCH
  "wellness-treatment-facial": "pillowDetailPeacock", // STRETCH
  "wellness-treatment-sea-salt": "pillowDetailGold", // STRETCH
  "wellness-treatment-pt": "poolLoungers", // STRETCH
  "wellness-journey": "estateGardenTerrace", // STRETCH
  "wellness-package-day-retreat": "poolLoungers", // STRETCH
  "wellness-package-couples": "poolDusk", // STRETCH
  "wellness-package-corporate": "gardensLawn", // STRETCH

  // ── Spa detail pages ──────────────────────────────────────────────────
  "spa-ritual-hammam": "bathroomTub", // STRETCH: no spa photography
  "spa-therapist-1": "lobbyLounge", // STRETCH: no staff portraits exist
  "spa-therapist-2": "bathroomVanity", // STRETCH: no staff portraits exist
  "spa-therapist-3": "pillowDetailPeacock", // STRETCH: no staff portraits exist
  "spa-therapist-4": "pillowDetailGold", // STRETCH: no staff portraits exist
  "spa-group-bridal": "poolDusk", // STRETCH: no guests in frame
  "spa-group-corporate": "gardensLawn", // STRETCH: no guests in frame

  // ── Pool page ─────────────────────────────────────────────────────────
  "wellness-pool-gardens": "poolLoungers",
  "wellness-pool-private-hire": "poolNight",
  "wellness-pool-family-event": "poolAerial",
  "wellness-pool-wedding-brunch": "gardenVerandaDining",

  // ── Meetings & Events packages and gallery ────────────────────────────
  "events-package-day-delegate": "coffeeCappuccino",
  "events-package-residential": "superiorRoomTwo",
  "events-package-board-dinner": "sirBakerPrivateTable",
  "events-package-wedding": "celebrationNight",
  "events-gallery-conference": "kudaraBoardroom",
  "events-gallery-banquet": "banquetHall",
  "events-gallery-cabaret": "boardroomProjector",
  "events-gallery-ceremony": "gardensLawn",
  "events-gallery-reception": "terraceDiningNight",
  "events-gallery-breakout": "boardroomGarden",
  "kudara-banquet": "banquetLongTable",

  // ── Signature dishes (no plated-dish photography delivered) ───────────
  "dining-hakki-pasha-dish-mezze": "tableSetting", // STRETCH
  "dining-hakki-pasha-dish-charcoal-chicken": "hakkiPashaGardenRoom", // STRETCH
  "dining-hakki-pasha-dish-nile-perch": "gardenVerandaDining", // STRETCH
  "dining-sir-samuel-baker-dish-scallop": "sirBakerHall", // STRETCH
  "dining-sir-samuel-baker-dish-short-rib": "sirBakerPrivateTable", // STRETCH
  "dining-sir-samuel-baker-dish-chocolate": "coffeeCappuccino", // STRETCH
  "dining-rooftop-terrace-dish-corn-ribs": "terraceDining", // STRETCH
  "dining-rooftop-terrace-dish-suya-skewers": "outdoorLounge", // STRETCH
  "dining-rooftop-terrace-dish-negroni": "cocktailsGarden",
  "dining-manutea-dish-syrah": "manuteaLoungeSeating",
  "dining-manutea-dish-islay-malt": "cocktailsBar",
  "dining-manutea-dish-cheese-board": "manuteaLoungeRed", // STRETCH
  "dining-in-room-dish-club": "inRoomTray",
  "dining-in-room-dish-burger": "inRoomTrayDetail",
  "dining-in-room-dish-curry": "coffeeService",

  // ── Airport transfer (no vehicle or staff photography delivered) ──────
  "transfer-fleet-saloon": "estateAerialDrive", // STRETCH
  "transfer-fleet-suv": "estateAerialPalms", // STRETCH
  "transfer-fleet-van": "estateAerialGardens", // STRETCH
  "transfer-fleet-coach": "estateDuskVeranda", // STRETCH
  "transfer-arrivals-board": "lobbyLounge", // STRETCH
  "transfer-vip-assist": "estateVeranda", // STRETCH
  "transfer-chauffeur-hourly": "estateFacadeDay", // STRETCH
  "transfer-route-map": "estateAerial", // STRETCH: an aerial, not a map
  "transfer-chauffeur-moses": "lobbyLounge", // STRETCH: no staff portraits
  "transfer-chauffeur-grace": "acropoleLoungeBar", // STRETCH: no staff portraits
  "transfer-chauffeur-ibrahim": "estateAerialDrive", // STRETCH: no staff portraits
};

/** The photograph assigned to an asset slot, or `undefined` if unfilled. */
export function assignedPhoto(assetId: string) {
  const key = photoAssignments[assetId];
  return key ? photos[key] : undefined;
}
