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

// Rooms and suites
import apartmentRoomFlamingo from "@/assets/images/accommodation/apartment-room/b1daxdxuupdxr2b06ubg.webp";
import apartmentRoomBed from "@/assets/images/accommodation/apartment-room/dd0csmttldfvqdwjhjxn.webp";
import apartmentRoomWindow from "@/assets/images/accommodation/apartment-room/moab2lnzbajlp3trtwuo.webp";
import apartmentRoomCoffeeTray from "@/assets/images/accommodation/apartment-room/q1wvyxo08xb2pdxzli51.webp";
import apartmentRoomDesk from "@/assets/images/accommodation/apartment-room/rqzd6kzzzxlw2vjn0rac.webp";
import apartmentRoomKitchen from "@/assets/images/accommodation/apartment-room/vpmucf0lldcjkvim00bp.webp";
import apartmentRoomBathroom from "@/assets/images/accommodation/apartment-room/vywypb8tynj7cmcgnthn.webp";
import apartmentRoomLiving from "@/assets/images/accommodation/apartment-room/xx4hfnrxpz8s5y0sknxw.webp";
import deluxeRoomLamplight from "@/assets/images/accommodation/deluxe-room/DSC_1173.webp";
import deluxeRoomBed from "@/assets/images/accommodation/deluxe-room/DSC_1178.webp";
import deluxeRoomGardenDoors from "@/assets/images/accommodation/deluxe-room/DSC_1202.webp";
import deluxeRoomBathroom from "@/assets/images/accommodation/deluxe-room/DSC_1213.webp";
import deluxeRoomTeaTray from "@/assets/images/accommodation/deluxe-room/DSC_1229.webp";
import deluxeRoomTelevision from "@/assets/images/accommodation/deluxe-room/DSC_1236.webp";
import deluxeRoomGoldCushions from "@/assets/images/accommodation/deluxe-room/DSC_1286.webp";
import deluxeRoomSeating from "@/assets/images/accommodation/deluxe-room/DSC_1305.webp";
import deluxeSuiteBed from "@/assets/images/accommodation/deluxe-suites/DSC_1089.webp";
import deluxeSuiteLounge from "@/assets/images/accommodation/deluxe-suites/DSC_1094.webp";
import deluxeSuiteGardenWindow from "@/assets/images/accommodation/deluxe-suites/DSC_1113.webp";
import deluxeSuiteDoorway from "@/assets/images/accommodation/deluxe-suites/DSC_1120.webp";
import deluxeSuiteDining from "@/assets/images/accommodation/deluxe-suites/DSC_1128.webp";
import deluxeSuiteBath from "@/assets/images/accommodation/deluxe-suites/DSC_1137.webp";
import deluxeSuiteBathTaps from "@/assets/images/accommodation/deluxe-suites/DSC_1148.webp";
import deluxeSuiteTowels from "@/assets/images/accommodation/deluxe-suites/DSC_1150.webp";
import deluxeSuiteBasin from "@/assets/images/accommodation/deluxe-suites/DSC_1156.webp";
import deluxeSuiteAmenities from "@/assets/images/accommodation/deluxe-suites/DSC_1163.webp";
import vipSuiteBedBench from "@/assets/images/accommodation/vip-suite/DSC_0985.webp";
import vipSuiteLounge from "@/assets/images/accommodation/vip-suite/DSC_0994.webp";
import vipSuiteBed from "@/assets/images/accommodation/vip-suite/DSC_0998.webp";
import vipSuiteBathroom from "@/assets/images/accommodation/vip-suite/DSC_1011.webp";
import vipSuiteSecondBedroom from "@/assets/images/accommodation/vip-suite/DSC_1034.webp";
import vipSuiteStair from "@/assets/images/accommodation/vip-suite/DSC_1042.webp";
import vipSuiteLivingRoom from "@/assets/images/accommodation/vip-suite/DSC_1051.webp";
import vipSuiteTeaTray from "@/assets/images/accommodation/vip-suite/DSC_1073.webp";
import equatoriaDiningRoom from "@/assets/images/dining/all-day-restaurant-3.webp";
import cocktailsGarden from "@/assets/images/dining/cocktail-2.webp";
import cottageTerrace from "@/assets/images/dining/cottage1.webp";
import cottageLounge from "@/assets/images/dining/cottage.webp";
import inRoomTray from "@/assets/images/dining/cutlery1.webp";
import inRoomTrayDetail from "@/assets/images/dining/cutlery2.webp";
import equatoriaGardenRoom from "@/assets/images/dining/dsc_0297.webp";
import hotDrinksBar from "@/assets/images/dining/dsc_0478.webp";
import coffeeCappuccino from "@/assets/images/dining/dsc_0517.webp";
import coffeeService from "@/assets/images/dining/dsc_0527.webp";
// Equatoria — the 2026 delivery
import equatoriaPergolaTables from "@/assets/images/dining/equatoria/DSC_1426.webp";
import equatoriaGardenEdgeTable from "@/assets/images/dining/equatoria/DSC_1427.webp";
import equatoriaColonnadeGarden from "@/assets/images/dining/equatoria/DSC_1432.webp";
import equatoriaOpenSideTables from "@/assets/images/dining/equatoria/DSC_1435.webp";
import equatoriaToKitchenCounter from "@/assets/images/dining/equatoria/DSC_1438.webp";
import equatoriaVaultedRoom from "@/assets/images/dining/equatoria/DSC_1441.webp";
import equatoriaRockerySide from "@/assets/images/dining/equatoria/DSC_1444.webp";
import equatoriaRoomFullLength from "@/assets/images/dining/equatoria/DSC_1450.webp";
import equatoriaFarCorner from "@/assets/images/dining/equatoria/DSC_1457.webp";
import equatoriaStarFruitTree from "@/assets/images/dining/equatoria/DSC_1472.webp";
import equatoriaBarAndStage from "@/assets/images/dining/equatoria/DSC_1474.webp";
import gardensLush from "@/assets/images/dining/garden.webp";
import gardensLawn from "@/assets/images/dining/gardenview6.webp";
import terraceDiningNight from "@/assets/images/dining/kkp-213.webp";
// Manutea — the 2026 delivery
import manuteaBarHeadOn from "@/assets/images/dining/manutea/DSC_1401.webp";
import manuteaBartender from "@/assets/images/dining/manutea/DSC_1406.webp";
import manuteaBarSide from "@/assets/images/dining/manutea/DSC_1407.webp";
import manuteaBottleWall from "@/assets/images/dining/manutea/DSC_1415.webp";
import mehmedLounge from "@/assets/images/dining/mehmed1.webp";
import mehmedLoungeChairs from "@/assets/images/dining/mehmed2.webp";
import outdoorLounge from "@/assets/images/dining/outdoor1.webp";
import tableSetting from "@/assets/images/dining/outdoor2.webp";
import gardenVerandaDining from "@/assets/images/dining/outdoor3.webp";
import lobbyLounge from "@/assets/images/dining/restaurant-lounge.webp";
import terraceDining from "@/assets/images/dining/sir-baker-fine-dining-1.webp";
import privateTableEight from "@/assets/images/dining/sir-baker-fine-dining-2.webp";
import diningHallWicker from "@/assets/images/dining/sir-baker-fine-dining-3.webp";
// Dining rooms, terraces and service
import cocktailsBar from "@/assets/images/dining/wine-and-whisky-1.webp";
import manuteaLoungeSeating from "@/assets/images/dining/wine-and-whisky-3.webp";
import manuteaLounge from "@/assets/images/dining/wine-and-whisky-lounge-2.webp";
import celebrationStairArch from "@/assets/images/events/celebrations/DSC_5510.webp";
import celebrationStairDrums from "@/assets/images/events/celebrations/DSC_5513.webp";
import celebrationArchDoorway from "@/assets/images/events/celebrations/DSC_5514.webp";
import celebrationGardenLongTable from "@/assets/images/events/celebrations/DSC_5515.webp";
import celebrationTerraceTwoTop from "@/assets/images/events/celebrations/DSC_5518.webp";
import celebrationCourtyardTable from "@/assets/images/events/celebrations/DSC_5521.webp";
import celebrationTableNumber from "@/assets/images/events/celebrations/DSC_5524.webp";
import celebrationCourtyardService from "@/assets/images/events/celebrations/DSC_5525.webp";
import celebrationCourtyardWide from "@/assets/images/events/celebrations/DSC_5531.webp";
import celebrationCourtyardDusk from "@/assets/images/events/celebrations/DSC_5532.webp";
import celebrationCourtyardTree from "@/assets/images/events/celebrations/DSC_5533.webp";
import celebrationCourtyardLit from "@/assets/images/events/celebrations/DSC_5534.webp";
import acropoleLoungeBar from "@/assets/images/general/acropolenew2.webp";
// Estate, exterior and grounds
import estateAerial from "@/assets/images/general/arielview1.webp";
// Retail
import craftShop from "@/assets/images/general/art2.webp";
import estateGardenTerrace from "@/assets/images/general/dsc_0305.webp";
import eminPashaPortrait from "@/assets/images/general/emin-pasha.png";
import estateVeranda from "@/assets/images/general/kkp-51.webp";
import estateFacadeGarden from "@/assets/images/general/new-building.webp";
import estateDusk from "@/assets/images/general/nightview1.webp";
import estateDuskVeranda from "@/assets/images/general/nightview2.webp";
import estateFacadeDay from "@/assets/images/general/old-building.webp";
import estateAerialDrive from "@/assets/images/general/parking1.webp";
import estateAerialGardens from "@/assets/images/general/parking2.webp";
import estateAerialPalms from "@/assets/images/general/parking-arial.webp";
import estateTerraceDusk from "@/assets/images/general/partyview1.webp";
import boardroomArtWall from "@/assets/images/meetings/boardroom/DSC_1798.webp";
import boardroomHeadOfTable from "@/assets/images/meetings/boardroom/DSC_1801.webp";
import boardroomScreenCentred from "@/assets/images/meetings/boardroom/DSC_1804.webp";
import boardroomWindowEnd from "@/assets/images/meetings/boardroom/DSC_1809.webp";
import boardroomDownTheTable from "@/assets/images/meetings/boardroom/DSC_1817.webp";
import boardroomDaylight from "@/assets/images/meetings/boardroom/DSC_1823.webp";
import boardroomCredenza from "@/assets/images/meetings/boardroom/DSC_1835.webp";
import boardroomScreenWall from "@/assets/images/meetings/boardroom/DSC_1839.webp";
import boardroomPlaceSetting from "@/assets/images/meetings/boardroom/DSC_1844.webp";
import boardroomTableDetail from "@/assets/images/meetings/boardroom/DSC_1853.webp";
import kudaraBoardroom from "@/assets/images/meetings/kudara-conference-2.webp";
import banquetLongTable from "@/assets/images/meetings/meetingroom3.webp";
import boardroomGarden from "@/assets/images/meetings/meetingroom5.webp";
import celebrationNight from "@/assets/images/meetings/meetingroom7.webp";
// Meetings, banquets and celebrations
import banquetHall from "@/assets/images/meetings/meetingroom15.webp";
import acropoleLoungeChandelier from "@/assets/images/new-images/lounge/DSC_1953.webp";
import manuteaLoungeRed from "@/assets/images/new-images/lounge/DSC_1976.webp";
// Lounges
import acropoleLounge from "@/assets/images/new-images/lounge/DSC_1984.webp";
// Spa
import spaEtiquette from "@/assets/images/new-images/spa/DSC_1754.webp";
import bathroomVanity from "@/assets/images/new-images/spa/DSC_1773.webp";
import bathroomTub from "@/assets/images/new-images/spa/DSC_1788.webp";
// Pool
import poolAerial from "@/assets/images/new-images/swimming-pool/DSC_1868.webp";
import poolLoungers from "@/assets/images/new-images/swimming-pool/DSC_1874.webp";
import poolDusk from "@/assets/images/new-images/swimming-pool/DSC_1888.webp";
// Reception, lobby and arrival
import receptionLoungeArmchairs from "@/assets/images/reception/DSC_1993.webp";
import receptionWaitingWindow from "@/assets/images/reception/DSC_1999.webp";
import receptionWaitingChairs from "@/assets/images/reception/DSC_2001.webp";
import receptionLobbySofa from "@/assets/images/reception/DSC_2006.webp";
import receptionLobbyDeskBeyond from "@/assets/images/reception/DSC_2007.webp";
import receptionDeskStaff from "@/assets/images/reception/DSC_2009.webp";
import receptionDeskWide from "@/assets/images/reception/DSC_2013.webp";
import receptionDeskDetail from "@/assets/images/reception/DSC_2018.webp";
import receptionLobbySeating from "@/assets/images/reception/DSC_2022.webp";
import poolNight from "@/assets/images/wellness/swimming-pool-night.webp";

/**
 * Every delivered photograph, keyed by subject. The trailing comment on each
 * entry is the shot description — keep it accurate, it is what makes
 * `photoAssignments.ts` auditable without opening a single file.
 */
export const photos = {
  // — Portraits —
  eminPashaPortrait, // Emin Pasha: seated, three-quarter view, looking at the camera
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
  equatoriaDiningRoom, // Equatoria dining room under rattan pendants
  equatoriaGardenRoom, // Equatoria garden room, planting along the windows
  hotDrinksBar, // Two hot drinks on a green tray at the lit bar
  inRoomTray, // In-room tray set on the desk, bed behind
  inRoomTrayDetail, // In-room tray close up: press pot, glasses, water
  outdoorLounge, // Covered terrace with orange-cushioned sofas
  diningHallWicker, // Panelled dining hall under wicker chandeliers
  privateTableEight, // Private table laid for eight, upholstered chairs
  tableSetting, // Close detail: white linen, red napkins, glassware
  terraceDining, // Terrace tables under the balustrade, daylight
  terraceDiningNight, // Terrace at night, parasol and lamplit table

  // — Rooms and suites —
  bathroomTub, // Bathroom with slate tiling and a deep tub
  bathroomVanity, // Portrait: twin vanity, mirror and tub beyond

  // Apartment Room — the only category with a kitchenette
  apartmentRoomBathroom, // Apartment Room: basin, mirror and timber shelves
  apartmentRoomBed, // Apartment Room: king bed, gold runner, black headboard
  apartmentRoomCoffeeTray, // Apartment Room detail: flask, cups and tea tray
  apartmentRoomDesk, // Apartment Room: writing desk, television, open door
  apartmentRoomFlamingo, // Apartment Room: flamingo canvas above the tea tray
  apartmentRoomKitchen, // Apartment Room kitchenette, sofa and framed artwork
  apartmentRoomLiving, // Apartment Room: kitchenette, television, bistro table
  apartmentRoomWindow, // Apartment Room: bed beside the garden window

  // Deluxe Room
  deluxeRoomBathroom, // Deluxe Room: bath and basin against slate tiling
  deluxeRoomBed, // Deluxe Room: king bed, teal runner, armchair beyond
  deluxeRoomGardenDoors, // Deluxe Room with doors onto the grounds
  deluxeRoomGoldCushions, // Deluxe Room: grey headboard and gold cushions
  deluxeRoomLamplight, // Deluxe Room: bed between lit bedside lamps, artwork
  deluxeRoomSeating, // Deluxe Room: armchairs, writing desk, drapes drawn
  deluxeRoomTeaTray, // Deluxe Room detail: kettle, glassware and tea tray
  deluxeRoomTelevision, // Deluxe Room: television cabinet, garden doors open

  // Deluxe Suites
  deluxeSuiteAmenities, // Deluxe Suite detail: bath amenities on a timber ledge
  deluxeSuiteBasin, // Deluxe Suite: pedestal basin beside the bath, slate floor
  deluxeSuiteBath, // Deluxe Suite: roll-top bath and towel rail
  deluxeSuiteBathTaps, // Deluxe Suite detail: roll-top bath and shower mixer
  deluxeSuiteBed, // Deluxe Suite: king bed, teal runner, striped sofa beyond
  deluxeSuiteDining, // Deluxe Suite: dining table and high-backed chairs
  deluxeSuiteDoorway, // Deluxe Suite bedroom seen through the French doors
  deluxeSuiteGardenWindow, // Deluxe Suite: bed facing the garden window and desk
  deluxeSuiteLounge, // Deluxe Suite: armchair and sofa on a patterned rug
  deluxeSuiteTowels, // Deluxe Suite detail: folded towels on a timber rail

  // VIP Suite — two bedrooms over two floors
  vipSuiteBathroom, // VIP Suite: twin basins on a mahogany vanity, bath beyond
  vipSuiteBed, // VIP Suite: bed against the green upholstered headboard wall
  vipSuiteBedBench, // VIP Suite: bed with bench seat, dressing room beyond
  vipSuiteLivingRoom, // VIP Suite: sofa, striped armchairs and green ottomans
  vipSuiteLounge, // VIP Suite lounge: television, teal chair and armchairs
  vipSuiteSecondBedroom, // VIP Suite second bedroom: wardrobe and writing chair
  vipSuiteStair, // VIP Suite lounge beneath the staircase to the upper floor
  vipSuiteTeaTray, // VIP Suite detail: kettle, glassware and tea selection

  // — Pool —
  poolAerial, // The pool from above in daylight, loungers along one side
  poolDusk, // The pool at dusk, loungers and the lit garden wing
  poolLoungers, // Loungers on the pool deck against dense planting
  poolNight, // The pool lit from within at night, seen from above

  // — Spa —
  spaEtiquette, // The corridor into the spa, lanterns along the floor, treatment rooms beyond

  // — The Boardroom —
  // The 2026 delivery: ten frames of the one fitted boardroom. A single fixed
  // mahogany table, black leather executive chairs, a wall-mounted interactive
  // display and in-table power/data. There is no second room and no
  // reconfiguration — copy that claims either is wrong, not merely unphotographed.
  boardroomArtWall, // The boardroom from the door: art wall, table, screen at the head
  boardroomCredenza, // Looking back over the table to the credenza and chair ends
  boardroomDaylight, // Daylight through the sheers across the full length of the table
  boardroomDownTheTable, // Low along the tabletop to the interactive display
  boardroomHeadOfTable, // The head of the table, screen centred, curtains to one side
  boardroomPlaceSetting, // Close on one place setting: pad, pen, water, cable port
  boardroomScreenCentred, // The table squared on the interactive display
  boardroomScreenWall, // The screen wall and four canvases above the seated table
  boardroomTableDetail, // Water and glasses down the table, screen soft beyond
  boardroomWindowEnd, // From the window end, chairs ranked both sides

  // — A themed private celebration —
  // One red/white/black themed private function, 2026: the courtyard restaurant
  // dressed to a colour brief with numbered tables, and a floral arch built on
  // the main staircase. No ceremony, couple or bridal party appears in any
  // frame — these are proof that the estate dresses to a brief, NOT wedding
  // photography, and must never be captioned as a wedding.
  celebrationArchDoorway, // Floral arch over the doorway at the head of the stairs
  celebrationCourtyardDusk, // The courtyard at dusk, red wash across the colonnade
  celebrationCourtyardLit, // The courtyard lit red, guests gathering beyond
  celebrationCourtyardService, // A server laying the last covers in the courtyard
  celebrationCourtyardTable, // Courtyard table laid under the tree, garden behind
  celebrationCourtyardTree, // The courtyard from the far side, tree through the middle
  celebrationCourtyardWide, // Wide courtyard: white linen, red lighting, flagstones
  celebrationGardenLongTable, // Long table on the terrace, orange seats, garden beyond
  celebrationStairArch, // The staircase dressed with floral arch and drapes
  celebrationStairDrums, // The stair installation from below, drums as plinths
  celebrationTableNumber, // Close on a laid table — red napkins, "TABLE 16"
  celebrationTerraceTwoTop, // A two-top on the terrace laid with red napkins

  // — Meetings, banquets and celebrations —
  banquetHall, // Long banquet table with a red runner in the hall
  banquetLongTable, // Timber banquet table dressed with a red runner
  // `meetings/meetingroom4.webp` sat here as `boardroomProjector` until the
  // 2026 Boardroom delivery replaced it. The file is still on disk, but a
  // registered photograph that no slot uses ships its bytes for nothing, so the
  // registration goes and the master waits to be re-registered if a slot wants it.
  boardroomGarden, // Older meeting-room frame: trestle U-shape, garden doors open
  celebrationNight, // Evening banquet under festoon lights, gold sashes
  kudaraBoardroom, // Kudara Hall set as a long boardroom, screen at the end

  // — Equatoria, 2026 —
  // The delivery that replaced the older all-day-restaurant frames. One room,
  // shot through: a vaulted inner dining room that opens along one whole side
  // onto the garden, white linen, dark-red chairs, herringbone floor. The bar
  // in `equatoriaBarAndStage` is the same counter the Manutea frames below
  // show head-on — they adjoin, and no caption should imply two buildings.
  equatoriaPergolaTables, // Tables under the pergola, garden and trees beyond
  equatoriaGardenEdgeTable, // A laid four-top at the garden edge, flagstones beyond
  equatoriaColonnadeGarden, // Through the open colonnade to the garden terrace
  equatoriaOpenSideTables, // Tables along the open side under the tree canopy
  equatoriaToKitchenCounter, // Down the vaulted room to the lit kitchen counter
  equatoriaVaultedRoom, // The vaulted room from the entrance, rattan pendants
  equatoriaRockerySide, // Across the dining room to the planted rockery
  equatoriaRoomFullLength, // The full length of the room, counter at the far end
  equatoriaFarCorner, // The room from the far corner, planting bed to one side
  equatoriaStarFruitTree, // Tables under the pergola, star-fruit tree through the opening
  equatoriaBarAndStage, // The dining room with the bar and raised stage beyond

  // — Manutea, 2026 —
  manuteaBarHeadOn, // The bar head-on: panelled front, bottle wall behind
  manuteaBartender, // A bartender at the back bar among the fridges and spirits
  manuteaBarSide, // The bar from the side, bartender reaching to the top shelf
  manuteaBottleWall, // The back bar: whisky, gin and wine under hanging glassware

  // — Reception, lobby and arrival —
  // The 2026 delivery, and the only frames in the library in which a member of
  // staff appears. Two receptionists are at the desk under the world-clock wall
  // and the painted world map; the lobby beyond it is the seating guests wait
  // in. A third-party promotional card sits on the desk in two frames — it is
  // incidental, and no slot's alt text or copy may describe it as an offering.
  receptionDeskWide, // The reception desk full length, two receptionists at work
  receptionDeskStaff, // The desk front-on, world map behind, two receptionists
  receptionDeskDetail, // Along the desk top, a receptionist either side, shallow focus
  receptionLobbySofa, // Lobby sofa in the foreground, the desk and staff beyond
  receptionLobbyDeskBeyond, // The same lobby a step back, the desk at the right
  receptionLobbySeating, // Lobby seating: blue sofa, tan leather armchairs, canvas
  receptionLoungeArmchairs, // Lobby lounge: orange armchairs against dark stone
  receptionWaitingWindow, // Waiting corner under the Emin Pasha portrait, window open
  receptionWaitingChairs, // The two waiting chairs squared on, lounge doorway beyond

  // — Retail —
  craftShop, // Craft shop interior: textiles, baskets and carvings
} as const satisfies Record<string, StaticImageData>;

/** A key of the delivered photography library. */
export type PhotoKey = keyof typeof photos;
