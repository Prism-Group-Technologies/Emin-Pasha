/**
 * The delivered photography library — every photograph the hotel has supplied,
 * imported statically so the bundler fingerprints each file, hands us its real
 * intrinsic dimensions, and generates the blur placeholder.
 *
 * Names describe **what is in the frame**, not the filename the camera gave
 * it: `photos.poolDusk` is reviewable at a glance in
 * `./photoAssignments.ts`, `wellness/kkp-207.webp` is not. The comment on
 * each line is the shot description, so a reader can check an assignment
 * without opening the image.
 *
 * Server-only in practice. This module is pulled in by the asset schema's
 * delivery transform, which runs at module load inside the content layer —
 * client components receive the resolved `image` on an `AssetRef` prop, and
 * must never import this file directly (DECISIONS.md D25). Importing it into
 * a client bundle would ship all ~80 metadata objects to the browser.
 *
 * Masters are kept inside their re-encode budget by `yarn optimize:images`.
 */
import type { StaticImageData } from "next/image";

import deluxeRoomOne from "@/assets/images/accommodation/deluxe-rooms/deluxe-room-1.webp";
import deluxeRoomTwo from "@/assets/images/accommodation/deluxe-rooms/deluxe-room-2.webp";
import deluxeRoomThree from "@/assets/images/accommodation/deluxe-rooms/deluxe-room-3.webp";
import deluxeRoomGardenDoors from "@/assets/images/accommodation/deluxe-rooms/deluxe-suite-room-2.webp";
import deluxeRoomBright from "@/assets/images/accommodation/deluxe-rooms/dsc_0228.webp";
import deluxeRoomWardrobe from "@/assets/images/accommodation/deluxe-rooms/dsc_0237.webp";
import deluxeSuiteOne from "@/assets/images/accommodation/deluxe-suites/deluxe-suite-11.webp";
import deluxeSuiteTwo from "@/assets/images/accommodation/deluxe-suites/deluxe-suite-12.webp";
import deluxeSuiteThree from "@/assets/images/accommodation/deluxe-suites/deluxe-suite-13.webp";
import deluxeSuiteFour from "@/assets/images/accommodation/deluxe-suites/deluxe-suite-14.webp";
import pillowDetailPeacock from "@/assets/images/accommodation/superior-rooms/dsc_0256.webp";
import suiteTerrace from "@/assets/images/accommodation/superior-rooms/dsc_0293.webp";
import pillowDetailGold from "@/assets/images/accommodation/superior-rooms/superior-5.webp";
import superiorRoomOne from "@/assets/images/accommodation/superior-rooms/superior-room-1.webp";
import superiorRoomTwo from "@/assets/images/accommodation/superior-rooms/superior-room-2.webp";
import superiorRoomThree from "@/assets/images/accommodation/superior-rooms/superior-room-4.webp";
import superiorRoomFour from "@/assets/images/accommodation/superior-rooms/superior-room-6.webp";
import suiteLivingOne from "@/assets/images/accommodation/superior-rooms/superior-room-13.webp";
import suiteLivingTwo from "@/assets/images/accommodation/superior-rooms/superior-room-14.webp";
import suiteLivingAbove from "@/assets/images/accommodation/superior-rooms/superior-room-15.webp";
import suiteCourtyard from "@/assets/images/accommodation/superior-rooms/superior-room-17.webp";
import superiorSuiteBed from "@/assets/images/accommodation/superior-suites/superior-suite2.webp";
import superiorSuiteLamp from "@/assets/images/accommodation/superior-suites/superior-suite3.webp";
import superiorSuiteArmchair from "@/assets/images/accommodation/superior-suites/superior-suite4.webp";
import superiorSuiteDoorway from "@/assets/images/accommodation/superior-suites/superior-suite5.webp";
import superiorSuitePassage from "@/assets/images/accommodation/superior-suites/superior-suite7.webp";
import superiorSuiteTeal from "@/assets/images/accommodation/superior-suites/superior-suite.webp";
import hakkiPashaDiningRoom from "@/assets/images/dining/all-day-restaurant-3.webp";
import cocktailsGarden from "@/assets/images/dining/cocktail-2.webp";
import cottageTerrace from "@/assets/images/dining/cottage1.webp";
import cottageLounge from "@/assets/images/dining/cottage.webp";
import inRoomTray from "@/assets/images/dining/cutlery1.webp";
import inRoomTrayDetail from "@/assets/images/dining/cutlery2.webp";
import sirBakerDiningRoom from "@/assets/images/dining/dsc_0296.webp";
import hakkiPashaGardenRoom from "@/assets/images/dining/dsc_0297.webp";
import hotDrinksBar from "@/assets/images/dining/dsc_0478.webp";
import coffeeCappuccino from "@/assets/images/dining/dsc_0517.webp";
import coffeeService from "@/assets/images/dining/dsc_0527.webp";
import gardensLush from "@/assets/images/dining/garden.webp";
import gardensLawn from "@/assets/images/dining/gardenview6.webp";
import manuteaLoungeRed from "@/assets/images/dining/kkp-67.webp";
import acropoleLoungeChandelier from "@/assets/images/dining/kkp-140.webp";
import terraceDiningNight from "@/assets/images/dining/kkp-213.webp";
import mehmedLounge from "@/assets/images/dining/mehmed1.webp";
import mehmedLoungeChairs from "@/assets/images/dining/mehmed2.webp";
import outdoorLounge from "@/assets/images/dining/outdoor1.webp";
import tableSetting from "@/assets/images/dining/outdoor2.webp";
import gardenVerandaDining from "@/assets/images/dining/outdoor3.webp";
import lobbyLounge from "@/assets/images/dining/restaurant-lounge.webp";
import terraceDining from "@/assets/images/dining/sir-baker-fine-dining-1.webp";
import sirBakerPrivateTable from "@/assets/images/dining/sir-baker-fine-dining-2.webp";
import sirBakerHall from "@/assets/images/dining/sir-baker-fine-dining-3.webp";
// Dining rooms, terraces and service
import cocktailsBar from "@/assets/images/dining/wine-and-whisky-1.webp";
import manuteaLoungeSeating from "@/assets/images/dining/wine-and-whisky-3.webp";
import manuteaLounge from "@/assets/images/dining/wine-and-whisky-lounge-2.webp";
// Lounges
import acropoleLounge from "@/assets/images/general/acropole.webp";
import acropoleLoungeBar from "@/assets/images/general/acropolenew2.webp";
// Estate, exterior and grounds
import estateAerial from "@/assets/images/general/arielview1.webp";
// Retail
import craftShop from "@/assets/images/general/art2.webp";
import estateGardenTerrace from "@/assets/images/general/dsc_0305.webp";
import estateVeranda from "@/assets/images/general/kkp-51.webp";
import estateFacadeGarden from "@/assets/images/general/new-building.webp";
import estateDusk from "@/assets/images/general/nightview1.webp";
import estateDuskVeranda from "@/assets/images/general/nightview2.webp";
import estateFacadeDay from "@/assets/images/general/old-building.webp";
import estateAerialDrive from "@/assets/images/general/parking1.webp";
import estateAerialGardens from "@/assets/images/general/parking2.webp";
import estateAerialPalms from "@/assets/images/general/parking-arial.webp";
import estateTerraceDusk from "@/assets/images/general/partyview1.webp";
import bathroomVanity from "@/assets/images/general/washroom2.webp";
// Rooms and suites
import bathroomTub from "@/assets/images/general/washroom.webp";
import kudaraBoardroom from "@/assets/images/meetings/kudara-conference-2.webp";
import banquetLongTable from "@/assets/images/meetings/meetingroom3.webp";
import boardroomProjector from "@/assets/images/meetings/meetingroom4.webp";
import boardroomGarden from "@/assets/images/meetings/meetingroom5.webp";
import celebrationNight from "@/assets/images/meetings/meetingroom7.webp";
// Meetings, banquets and celebrations
import banquetHall from "@/assets/images/meetings/meetingroom15.webp";
import poolDusk from "@/assets/images/wellness/kkp-207.webp";
// Pool
import poolAerial from "@/assets/images/wellness/swimming-pool-2.webp";
import poolLoungers from "@/assets/images/wellness/swimming-pool-3.webp";
import poolNight from "@/assets/images/wellness/swimming-pool-night.webp";

/**
 * Every delivered photograph, keyed by subject. The trailing comment on each
 * entry is the shot description — keep it accurate, it is what makes
 * `photoAssignments.ts` auditable without opening a single file.
 */
export const photos = {
  // — Estate, exterior and grounds —
  estateAerial, // Elevated view over the estate to the Kampala skyline
  estateAerialDrive, // Aerial: palm-lined drive and parking court
  estateAerialGardens, // Aerial: clipped garden parterre and forecourt
  estateAerialPalms, // Aerial: green-roofed wings framed by palms
  estateDusk, // The house at dusk, windows lit, lawn in foreground
  estateDuskVeranda, // Dusk: lit facade above clipped hedging and benches
  estateFacadeDay, // Ochre colonial facade under a blue sky, mature trees
  estateFacadeGarden, // The garden wing behind flowering shrubs, daylight
  estateGardenTerrace, // Terraced planting and a brick path beside the wing
  estateTerraceDusk, // Terrace at dusk strung with festoon lights
  estateVeranda, // Colonnaded veranda looking over the topiary gardens
  gardensLawn, // Manicured lawn and borders seen from the terrace
  gardensLush, // Deep planted garden with scattered green seating

  // — Lounges —
  acropoleLounge, // Acropole Lounge: orange armchairs, doors open to garden
  acropoleLoungeBar, // Acropole Lounge from the bar, mirror and long table
  acropoleLoungeChandelier, // Acropole Lounge under the brass chandelier
  cottageLounge, // Cottage sitting room, bay windows and cream sofas
  cottageTerrace, // Cottage terrace with timber benches
  lobbyLounge, // Lobby lounge: green sofas, artwork, coffee counter
  manuteaLounge, // Manutea: brick walls, bar and red velvet armchairs
  manuteaLoungeRed, // Manutea from the banquettes, red chairs, bay window
  manuteaLoungeSeating, // Manutea seating with pendant lamps and kilims
  mehmedLounge, // Mehmed Pasha Lounge: French doors to the garden
  mehmedLoungeChairs, // Mehmed Pasha Lounge: striped wing chairs and art

  // — Dining rooms, terraces and service —
  cocktailsBar, // Two tall cocktails on the bar, bottle wall behind
  cocktailsGarden, // Three cocktails on a timber table, garden behind
  coffeeCappuccino, // A branded cappuccino cup on dark timber
  coffeeService, // Cappuccino and sugar pot, spoon on the saucer
  gardenVerandaDining, // Garden veranda laid with white-linen tables
  hakkiPashaDiningRoom, // Hakki Pasha dining room under rattan pendants
  hakkiPashaGardenRoom, // Hakki Pasha garden room, planting along the windows
  hotDrinksBar, // Two hot drinks on a green tray at the lit bar
  inRoomTray, // In-room tray set on the desk, bed behind
  inRoomTrayDetail, // In-room tray close up: press pot, glasses, water
  outdoorLounge, // Covered terrace with orange-cushioned sofas
  sirBakerDiningRoom, // Sir Samuel Baker room, set table against the mural
  sirBakerHall, // Sir Samuel Baker hall under wicker chandeliers
  sirBakerPrivateTable, // Private table laid for eight, upholstered chairs
  tableSetting, // Close detail: white linen, red napkins, glassware
  terraceDining, // Terrace tables under the balustrade, daylight
  terraceDiningNight, // Terrace at night, parasol and lamplit table

  // — Rooms and suites —
  bathroomTub, // Bathroom with slate tiling and a deep tub
  bathroomVanity, // Portrait: twin vanity, mirror and tub beyond
  deluxeRoomBright, // Deluxe Room in daylight, armchair and writing desk
  deluxeRoomGardenDoors, // Deluxe Room with doors onto the grounds
  deluxeRoomOne, // Deluxe Room: king bed, botanical prints, lamplight
  deluxeRoomThree, // Deluxe Room from the door, armchair and television
  deluxeRoomTwo, // Deluxe Room from the foot of the bed, drapes drawn
  deluxeRoomWardrobe, // Deluxe Room with mahogany wardrobe and artwork
  pillowDetailGold, // Detail: gold bolster embroidered with the hotel name
  pillowDetailPeacock, // Detail: embroidered pillowcase and peacock cushion
  suiteCourtyard, // A suite's private courtyard, parasol and armchairs
  suiteLivingAbove, // Suite living room from above, bedroom beyond
  suiteLivingOne, // Suite living room: sofa, television, bed beyond
  suiteLivingTwo, // Suite living room from the stair, sofa and drapes
  suiteTerrace, // A suite's walled terrace with striped seating
  deluxeSuiteFour, // Deluxe Suite, gold runner, bedside lamps lit
  deluxeSuiteOne, // Deluxe Suite with gold runner and dressing mirror
  deluxeSuiteThree, // Deluxe Suite, gold runner, mirror and shutters
  deluxeSuiteTwo, // Deluxe Suite square on, gold runner and artwork
  superiorRoomFour, // Superior Room from above, patterned runner
  superiorRoomOne, // Superior Room: fretwork headboard and bench seats
  superiorRoomThree, // Superior Room from the foot, benches and runner
  superiorRoomTwo, // Superior Room with artwork and upholstered benches
  superiorSuiteArmchair, // Superior Suite: armchair, television, French doors
  superiorSuiteBed, // Superior Suite bed dressed with a teal throw
  superiorSuiteDoorway, // Superior Suite seen through the doorway, shutters
  superiorSuiteLamp, // Superior Suite by lamplight, drapes and artwork
  superiorSuitePassage, // Superior Suite with armoire and passage beyond
  superiorSuiteTeal, // Superior Suite: teal throw, artwork, sheer curtains

  // — Pool —
  poolAerial, // The pool from above in daylight, loungers along one side
  poolDusk, // The pool at dusk, loungers and the lit garden wing
  poolLoungers, // Loungers on the pool deck against dense planting
  poolNight, // The pool lit from within at night, seen from above

  // — Meetings, banquets and celebrations —
  banquetHall, // Long banquet table with a red runner in the hall
  banquetLongTable, // Timber banquet table dressed with a red runner
  boardroomGarden, // Meeting room set U-shape, garden doors open
  boardroomProjector, // Meeting room set boardroom-style facing a screen
  celebrationNight, // Evening banquet under festoon lights, gold sashes
  kudaraBoardroom, // Kudara Hall set as a long boardroom, screen at the end

  // — Retail —
  craftShop, // Craft shop interior: textiles, baskets and carvings
} as const satisfies Record<string, StaticImageData>;

/** A key of the delivered photography library. */
export type PhotoKey = keyof typeof photos;
