import { type Outlet, outletSchema } from "@/schemas/content/outlet";

const diningOverview =
  "Savour exceptional cuisine inspired by Uganda's rich flavours, served in elegant settings steeped in colonial-era history. Three uniquely distinct restaurants and two bars, celebrated for their cuisine, service offering and organic ambience. The dining rooms feature a modern dumbwaiter, allowing guests to enjoy the sights and sounds of the culinary artistry on display. The menu showcases Asian, European and African influences, with classic favourites and creative dishes to sample.";

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
