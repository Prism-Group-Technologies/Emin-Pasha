import { type Outlet, outletSchema } from "@/schemas/content/outlet";

/**
 * ⚠️ AMENDED 2026-10-13, NOT YET RE-APPROVED.
 *
 * The source document's wording — "Three uniquely distinct restaurants and two
 * bars" — described an estate with Sir Samuel Baker in it. The general manager
 * has since confirmed two restaurants, Equatoria and The Rooftop Terrace, with
 * Manutea as the wine and whisky lounge; Sir Samuel Baker is no longer sold as
 * an outlet. The counts here are therefore rewritten to match what the hotel
 * actually operates, and need signing off against §12 of the source document.
 *
 * The rest of each sentence — the dumbwaiter, the Asian/European/African
 * influences, the colonial-era settings — is unchanged approved copy.
 */
const diningOverview =
  "Savour exceptional cuisine inspired by Uganda's rich flavours, served in elegant settings steeped in colonial-era history. Two distinct restaurants and a wine and whisky lounge, celebrated for their cuisine, service offering and organic ambience. The dining rooms feature a modern dumbwaiter, allowing guests to enjoy the sights and sounds of the culinary artistry on display. The menu showcases Asian, European and African influences, with classic favourites and creative dishes to sample.";

const raw: Outlet[] = [
  {
    id: "equatoria-restaurant-bar",
    name: "Equatoria",
    type: "restaurant",
    description:
      "A contemporary dining room inspired by Uganda's place at the heart of Equatoria, where regional flavours meet an international table. Enjoy thoughtfully prepared local and global dishes alongside handcrafted cocktails in a warm, lively setting.",
    namedForNote:
      "Named for Equatoria, the historic province where Emin Pasha served as chief medical officer and later governor. The territory encompassed parts of present-day northern Uganda and South Sudan.",
  },
  {
    // Reclassified from `bar` to `restaurant` on the general manager's
    // instruction (2026-10-13): the terrace serves a full menu and is the
    // second of the hotel's two restaurants, not a drinks-only space. The
    // description is extended accordingly — the approved sentence sold a view
    // and a beverage, which is no longer what is on offer up there.
    id: "rooftop-terrace",
    name: "The Rooftop Terrace",
    type: "restaurant",
    description:
      "Breathtaking panoramic views of the city, with a full menu served above the treeline: a serene atmosphere, scenic beauty and a kitchen that makes the climb worth it.",
  },
  {
    id: "manutea-wine-whisky-lounge",
    name: "Manutea Wine & Whisky Lounge",
    type: "bar",
    description:
      "A sophisticated ambience with a carefully curated selection of fine wines and whiskies from around the world.",
  },
  {
    id: "in-room-dining",
    name: "In-Room Dining",
    type: "in-room",
    description: "24/7 across every room category, with a Special-Select In-Room Dining Menu.",
  },
];

export const diningOutlets: Outlet[] = raw.map((outlet) => outletSchema.parse(outlet));

/** ⚠️ Counts amended with `diningOverview` above — see that note. */
export const diningPageIntro =
  "Savour exceptional cuisine inspired by Uganda's rich flavours, served in elegant settings steeped in history. Two distinct restaurants and a wine and whisky lounge, celebrated for their cuisine, their service and their organic ambience. Our dining rooms feature a modern dumbwaiter, so that the culinary artistry on display becomes part of the experience. The menu draws on Asian, European and African influences — classic favourites alongside creative dishes worth travelling for.";
