import { type Outlet, outletSchema } from "@/schemas/content/outlet";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §5. Opening hours and menus are
 * TODO(EMIN-Q12) — not in source, forbidden to invent (§0.7).
 */
export const diningOverview =
  "Savour exceptional cuisine inspired by Uganda's rich flavours, served in elegant settings steeped in colonial-era history. Three uniquely distinct restaurants and two bars, celebrated for their cuisine, service offering and organic ambience. The dining rooms feature a modern dumbwaiter, allowing guests to enjoy the sights and sounds of the culinary artistry on display. The menu showcases Asian, European and African influences, with classic favourites and creative dishes to sample.";

const raw: Outlet[] = [
  {
    id: "hakki-pasha-restaurant-bar",
    name: "Hakki Pasha Restaurant & Bar",
    type: "restaurant",
    description:
      "The premium dining establishment: a delectable fusion of international and local flavours expertly crafted by the culinary team; exquisite dishes and handcrafted cocktails in a vibrant, elegant setting.",
    namedForNote:
      "Named for Ismail Hakki Pasha, governor of northern Albania, in whose service Emin Pasha travelled the Ottoman Empire.",
  },
  {
    id: "sir-samuel-baker-fine-dining",
    name: "Sir Samuel Baker Fine Dining",
    type: "restaurant",
    description:
      "A sophisticated fine-dining restaurant; a culinary journey showcasing the finest ingredients and meticulous attention to detail.",
    namedForNote:
      "Named for the explorer whose Nile expeditions form part of the same chapter of East African history as Emin's own.",
  },
  {
    id: "rooftop-terrace",
    name: "The Rooftop Terrace",
    type: "bar",
    description:
      "Breathtaking panoramic views of the city; a serene atmosphere, refreshing beverages and scenic beauty.",
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

export const diningPageIntro =
  "Savour exceptional cuisine inspired by Uganda's rich flavours, served in elegant settings steeped in history. Three uniquely distinct restaurants and two bars, celebrated for their cuisine, their service and their organic ambience. Our dining rooms feature a modern dumbwaiter, so that the culinary artistry on display becomes part of the experience. The menu draws on Asian, European and African influences — classic favourites alongside creative dishes worth travelling for.";
