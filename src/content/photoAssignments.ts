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
 * the spa treatment rooms, vehicles, and the two diagram slots
 * (Kudara floor plan, contact map).
 */
import { type PhotoKey, photos } from "@/content/photography";

/**
 * A slot marked as needing photography the hotel has not delivered. Kept as a
 * separate set rather than a comment so `check:photos` can report it and so
 * nobody has to grep for a convention.
 */
export const stretchedAssignments = new Set<string>([
  // No spa photography exists at all.
  "spa-treatment-room",
  "home-feature-spa",
  "wellness-pillar-spa",
  "wellness-treatment-signature-massage",
  "wellness-treatment-turkish-bath",
  "wellness-treatment-facial",
  "wellness-treatment-sea-salt",
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
  "gallery-lens-spa",
  // Rooms staged for an occasion — the shoot covers the rooms as sold, not
  // dressed for turndown, and no guest-room balcony was photographed.
  "gallery-suite-petal-turndown",
  "gallery-room-garden-balcony",
  // Portraits — no photograph of any member of staff or guest exists.
  //
  // The 2026 reception delivery is the first to show staff at all, and it
  // still does not clear this list: every slot below names one individual in
  // a portrait box, and the reception frames are landscape two-up shots of
  // the desk. Cropping one to 4:5 cuts a receptionist in half, and a general
  // manager, a therapist and a chauffeur are not receptionists. The delivery
  // got its own slots instead, where it depicts exactly what it shows.
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
  "dining-equatoria-dish-mezze",
  "dining-equatoria-dish-charcoal-chicken",
  "dining-equatoria-dish-nile-perch",
  "dining-rooftop-terrace-dish-corn-ribs",
  "dining-rooftop-terrace-dish-suya-skewers",
  "dining-manutea-dish-cheese-board",
  "gallery-dining-chef-plating",
  "gallery-dining-kids-menu",
  // Diagrams, not photographs.
  "meetings-kudara-floorplan",
  "contact-static-map",
  "transfer-route-map",
  // Syndicate breakouts moved from the old "private meeting rooms" copy onto
  // Kudara Hall, but no frame of a breakout in Kudara exists — the nearest is
  // an older meeting-room U-shape in a different room.
  "events-gallery-breakout",
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
  // One frame per category, then a fifth that sells the gardens.
  "home-intro-room-1": "vipSuiteBed",
  "home-intro-room-2": "deluxeRoomBed",
  "home-intro-room-3": "deluxeSuiteBed",
  "home-intro-room-4": "apartmentRoomBed",
  "home-intro-room-5": "deluxeRoomGardenDoors",

  // Rate cards. Different frames from the carousel above, same four
  // categories — see the note on `home-rate-*` in `./assets.ts`.
  "home-rate-apartment-room": "apartmentRoomLiving",
  "home-rate-deluxe-room": "deluxeRoomLamplight",
  "home-rate-deluxe-suites": "deluxeSuiteLounge",
  "home-rate-vip-suite": "vipSuiteLivingRoom",

  // Estate tiles. One per `site.homepage.featureTiles` id.
  "home-feature-rooms": "vipSuiteBedBench",
  "home-feature-dining": "equatoriaVaultedRoom",
  "home-feature-spa": "bathroomTub", // STRETCH: no spa photography exists
  "home-feature-pool": "poolLoungers",
  "home-feature-events": "celebrationNight",
  "home-feature-story": "estateFacadeDay", // STRETCH: no portrait of Emin Pasha

  // ── Accommodation ─────────────────────────────────────────────────────
  // Lead frame per category — the bed, which is what the card, the hero and
  // the first mosaic tile all open on.
  "room-apartment-room": "apartmentRoomBed",
  "room-deluxe-room": "deluxeRoomBed",
  "room-deluxe-suites": "deluxeSuiteBed",
  "room-vip-suite": "vipSuiteBed",

  // Room galleries — eight angles per category, lead first. Ordered bed →
  // living space → bathroom → detail, so the mosaic reads as a walk through
  // the room rather than a shuffled contact sheet.
  "room-apartment-room-2": "apartmentRoomWindow",
  "room-apartment-room-3": "apartmentRoomLiving",
  "room-apartment-room-4": "apartmentRoomKitchen",
  "room-apartment-room-5": "apartmentRoomDesk",
  "room-apartment-room-6": "apartmentRoomBathroom",
  "room-apartment-room-7": "apartmentRoomFlamingo",
  "room-apartment-room-8": "apartmentRoomCoffeeTray",
  "room-deluxe-room-2": "deluxeRoomLamplight",
  "room-deluxe-room-3": "deluxeRoomGardenDoors",
  "room-deluxe-room-4": "deluxeRoomGoldCushions",
  "room-deluxe-room-5": "deluxeRoomTelevision",
  "room-deluxe-room-6": "deluxeRoomSeating",
  "room-deluxe-room-7": "deluxeRoomBathroom",
  "room-deluxe-room-8": "deluxeRoomTeaTray",
  "room-deluxe-suites-2": "deluxeSuiteLounge",
  "room-deluxe-suites-3": "deluxeSuiteGardenWindow",
  "room-deluxe-suites-4": "deluxeSuiteDining",
  "room-deluxe-suites-5": "deluxeSuiteDoorway",
  "room-deluxe-suites-6": "deluxeSuiteBath",
  "room-deluxe-suites-7": "deluxeSuiteBasin",
  "room-deluxe-suites-8": "deluxeSuiteAmenities",
  "room-vip-suite-2": "vipSuiteBedBench",
  "room-vip-suite-3": "vipSuiteSecondBedroom",
  "room-vip-suite-4": "vipSuiteLivingRoom",
  "room-vip-suite-5": "vipSuiteLounge",
  "room-vip-suite-6": "vipSuiteStair",
  "room-vip-suite-7": "vipSuiteBathroom",
  "room-vip-suite-8": "vipSuiteTeaTray",

  // ── Dining outlets ────────────────────────────────────────────────────
  "dining-equatoria": "equatoriaRoomFullLength",
  "dining-rooftop-terrace": "terraceDiningNight",
  "dining-manutea": "manuteaLounge",
  "dining-in-room": "inRoomTray",

  // ── Lounges and gardens ───────────────────────────────────────────────
  "lounge-acropole": "acropoleLoungeChandelier",
  "lounge-mehmed-pasha": "mehmedLounge",
  "lounge-equatorial-gardens": "gardensLush",

  // ── Wellness (no treatment-room photography delivered) ────────────────
  "spa-treatment-room": "bathroomTub", // STRETCH: a guest bathroom, not a treatment room
  "spa-pool": "poolDusk",
  "spa-etiquette": "spaEtiquette",

  // ── Meetings and events ───────────────────────────────────────────────
  "meetings-kudara-hall": "boardroomScreenWall",
  "meetings-boardroom": "boardroomScreenWall",
  "meetings-kudara-floorplan": "banquetHall", // STRETCH: a photo where a diagram belongs
  "meetings-poolside-lawn": "poolNight",
  "weddings-equatorial-gardens": "celebrationNight",

  // ── Experiences ───────────────────────────────────────────────────────
  "experiences-airport-transfer": "estateAerialDrive", // STRETCH: the drive, no vehicle
  "experiences-cg-shop": "craftShop",
  "offers-friday-band-night": "estateTerraceDusk",

  // ── Our Story ─────────────────────────────────────────────────────────
  "story-the-hotel": "estateGardenTerrace",
  "story-emin-pasha-portrait": "eminPashaPortrait", // STRETCH: no portrait exists
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
  "gallery-suite-petal-turndown": "deluxeSuiteBed", // STRETCH: no turndown with petals exists
  "gallery-suite-bath-candles": "bathroomTub",
  "gallery-room-desk-morning": "deluxeRoomSeating",
  "gallery-suite-family-connecting": "vipSuiteSecondBedroom",
  "gallery-room-garden-balcony": "deluxeRoomGardenDoors", // STRETCH: no balcony frame exists

  // ── Gallery: dining ───────────────────────────────────────────────────
  "gallery-dining-candlelit-two": "tableSetting",
  "gallery-dining-chef-plating": "diningHallWicker", // STRETCH: no plated-dish photography
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

  // ── Gallery: occasions ────────────────────────────────────────────────
  "gallery-wedding-aisle": "gardensLawn",
  "gallery-wedding-long-table": "banquetLongTable",
  "gallery-wedding-first-dance": "celebrationNight", // STRETCH: no guests in frame
  "gallery-wedding-bridal-suite": "vipSuiteBedBench", // STRETCH: no guests in frame
  "gallery-event-band-night": "estateTerraceDusk",
  "gallery-meeting-boardroom-break": "coffeeCappuccino",

  // ── Gallery: guest lens ───────────────────────────────────────────────
  "gallery-lens-poolside": "poolLoungers",
  "gallery-lens-breakfast": "coffeeService", // STRETCH: no guests in frame
  "gallery-lens-proposal": "gardensLawn", // STRETCH: no guests in frame
  "gallery-lens-cocktail": "cocktailsGarden",
  "gallery-lens-suite": "vipSuiteStair",
  "gallery-lens-garden": "estateGardenTerrace",
  "gallery-lens-wedding": "estateTerraceDusk", // STRETCH: no guests in frame
  "gallery-lens-spa": "poolLoungers", // STRETCH: no spa photography

  // ── Gallery: film and tour posters ────────────────────────────────────
  "gallery-film-poster": "estateAerial",
  "gallery-tour-poster": "deluxeSuiteLounge",
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

  // ── Spa & Wellness hub (no spa photography delivered) ─────────────────
  "wellness-hub-hero": "poolDusk",
  "wellness-pillar-spa": "bathroomTub", // STRETCH: no spa photography
  "wellness-pillar-pool": "poolAerial",
  "wellness-treatment-signature-massage": "bathroomVanity", // STRETCH
  "wellness-treatment-turkish-bath": "bathroomTub", // STRETCH
  "wellness-treatment-facial": "deluxeSuiteTowels", // STRETCH
  "wellness-treatment-sea-salt": "deluxeSuiteAmenities", // STRETCH
  "wellness-journey": "estateGardenTerrace", // STRETCH
  "wellness-package-day-retreat": "poolLoungers", // STRETCH
  "wellness-package-couples": "poolDusk", // STRETCH
  "wellness-package-corporate": "gardensLawn", // STRETCH

  // ── Spa detail pages ──────────────────────────────────────────────────
  "spa-ritual-hammam": "bathroomTub", // STRETCH: no spa photography
  "spa-therapist-1": "lobbyLounge", // STRETCH: no staff portraits exist
  "spa-therapist-2": "bathroomVanity", // STRETCH: no staff portraits exist
  "spa-therapist-3": "deluxeSuiteBathTaps", // STRETCH: no staff portraits exist
  "spa-therapist-4": "deluxeSuiteTowels", // STRETCH: no staff portraits exist
  "spa-group-bridal": "poolDusk", // STRETCH: no guests in frame
  "spa-group-corporate": "gardensLawn", // STRETCH: no guests in frame

  // ── Pool page ─────────────────────────────────────────────────────────
  "wellness-pool-gardens": "poolLoungers",
  "wellness-pool-private-hire": "poolDusk",
  "wellness-pool-family-event": "poolAerial",
  "wellness-pool-wedding-brunch": "celebrationTableNumber",

  // ── Meetings & Events packages and gallery ────────────────────────────
  "events-package-day-delegate": "coffeeCappuccino",
  "events-package-residential": "deluxeRoomGoldCushions",
  "events-package-board-dinner": "privateTableEight",
  "events-package-wedding": "celebrationNight",
  "events-gallery-conference": "boardroomScreenWall",
  "events-gallery-banquet": "banquetHall",
  "events-gallery-boardroom": "boardroomHeadOfTable",
  "events-gallery-ceremony": "gardensLawn",
  "events-gallery-reception": "terraceDiningNight",
  "events-gallery-breakout": "boardroomGarden", // STRETCH: another room, not Kudara
  "kudara-banquet": "banquetLongTable",

  // ── The Boardroom ─────────────────────────────────────────────────────
  // The one part of the site with genuine, complete coverage: ten frames of
  // one room, so every slot below depicts exactly what it claims and none is
  // a STRETCH. The older `boardroomProjector` / `boardroomGarden` frames stay
  // registered and still serve the breakout slot, but no longer stand in for
  // this room — they show trestle tables under linen, which is not what the
  // Boardroom is.
  "boardroom-showcase": "boardroomArtWall",
  "boardroom-view-head": "boardroomHeadOfTable",
  "boardroom-view-length": "boardroomDownTheTable",
  "boardroom-view-window": "boardroomWindowEnd",
  "boardroom-view-daylight": "boardroomDaylight",
  "boardroom-view-angle": "boardroomScreenCentred",
  "boardroom-view-credenza": "boardroomCredenza",
  "boardroom-view-art": "boardroomScreenWall",
  "boardroom-detail-setting": "boardroomPlaceSetting",
  "boardroom-detail-table": "boardroomTableDetail",

  // ── A themed private celebration (Weddings page) ──────────────────────
  // Twelve delivered frames of one red/white/black private function. Each slot
  // depicts exactly what it claims, so none is a STRETCH — but none of them is
  // a wedding either, and the captions in `copy/celebrationsMedia.ts` are
  // written never to imply one.
  "celebration-stair-arch": "celebrationStairArch",
  "celebration-arch-doorway": "celebrationArchDoorway",
  "celebration-stair-drums": "celebrationStairDrums",
  "celebration-courtyard-wide": "celebrationCourtyardWide",
  "celebration-courtyard-dusk": "celebrationCourtyardDusk",
  "celebration-courtyard-tree": "celebrationCourtyardTree",
  "celebration-courtyard-lit": "celebrationCourtyardLit",
  "celebration-courtyard-service": "celebrationCourtyardService",
  "celebration-courtyard-table": "celebrationCourtyardTable",
  "celebration-table-number": "celebrationTableNumber",
  "celebration-garden-long-table": "celebrationGardenLongTable",
  "celebration-terrace-two-top": "celebrationTerraceTwoTop",

  // ── Signature dishes (no plated-dish photography delivered) ───────────
  "dining-equatoria-dish-mezze": "tableSetting", // STRETCH
  "dining-equatoria-dish-charcoal-chicken": "equatoriaGardenRoom", // STRETCH
  "dining-equatoria-dish-nile-perch": "gardenVerandaDining", // STRETCH
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

  // ── Outlet carousels ─────────────────────────────────────────────────
  // Equatoria and Manutea are filled by the 2026 delivery and carry no
  // stretches. The Rooftop and in-room lists reuse the older terrace and tray
  // frames: both outlets were covered by the first shoot and neither was
  // re-shot, so these are genuine frames of the right subject, just older.
  "dining-equatoria-slide-room": "equatoriaVaultedRoom",
  "dining-equatoria-slide-length": "equatoriaRoomFullLength",
  "dining-equatoria-slide-open-side": "equatoriaOpenSideTables",
  "dining-equatoria-slide-pergola": "equatoriaPergolaTables",
  "dining-equatoria-slide-garden-edge": "equatoriaGardenEdgeTable",
  "dining-equatoria-slide-colonnade": "equatoriaColonnadeGarden",
  "dining-equatoria-slide-rockery": "equatoriaRockerySide",
  "dining-equatoria-slide-kitchen": "equatoriaToKitchenCounter",
  "dining-equatoria-slide-corner": "equatoriaFarCorner",
  "dining-equatoria-slide-star-fruit": "equatoriaStarFruitTree",
  "dining-equatoria-slide-bar": "equatoriaBarAndStage",

  "dining-manutea-slide-bar": "manuteaBarHeadOn",
  "dining-manutea-slide-shelves": "manuteaBottleWall",
  "dining-manutea-slide-service": "manuteaBartender",
  "dining-manutea-slide-side": "manuteaBarSide",

  "dining-rooftop-slide-night": "terraceDiningNight",
  "dining-rooftop-slide-day": "terraceDining",
  "dining-rooftop-slide-veranda": "gardenVerandaDining",
  "dining-rooftop-slide-setting": "tableSetting",
  "dining-rooftop-slide-cocktails": "cocktailsGarden",

  "dining-in-room-slide-tray": "inRoomTray",
  "dining-in-room-slide-detail": "inRoomTrayDetail",

  // ── Reception, lobby and arrival ──────────────────────────────────────
  // The one part of the site where every slot is filled by a photograph that
  // actually depicts its subject: the 2026 reception delivery was shot against
  // these slots rather than the slots being retro-fitted to it. Nothing here is
  // a STRETCH, which is why no entry carries the marker.
  "reception-desk-wide": "receptionDeskWide",
  "reception-desk-staff": "receptionDeskStaff",
  "reception-desk-detail": "receptionDeskDetail",
  "reception-lobby-sofa": "receptionLobbySofa",
  "reception-lobby-seating": "receptionLobbySeating",
  "reception-lounge-armchairs": "receptionLoungeArmchairs",
  "reception-waiting-window": "receptionWaitingWindow",
  "reception-waiting-chairs": "receptionWaitingChairs",

  // Gallery frames drawn from the same delivery.
  "gallery-arrival-desk": "receptionDeskWide",
  "gallery-arrival-waiting": "receptionWaitingWindow",
  "gallery-arrival-lobby": "receptionLobbyDeskBeyond",
  "gallery-arrival-lounge": "receptionLoungeArmchairs",
};

/** The photograph assigned to an asset slot, or `undefined` if unfilled. */
export function assignedPhoto(assetId: string) {
  const key = photoAssignments[assetId];
  return key ? photos[key] : undefined;
}
