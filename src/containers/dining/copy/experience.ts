/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

/**
 * The culinary-story band. The dumbwaiter and the tri-continental menu are
 * the two points the brief itself calls out; the sourcing paragraph stays
 * general (kitchen garden, local markets) rather than naming a supplier the
 * source does not.
 */
export const culinaryStory = {
  paragraphs: [
    "The dining rooms were built around a modern dumbwaiter — a working piece of theatre that carries plates between the kitchen and the pass in full view of the room. It is the reason a table here feels closer to the cooking than the square footage would suggest.",
    "One brigade runs all five rooms, and the menu it writes moves across three continents in a sitting: an Ottoman mezze to start, a coconut-and-lemongrass broth for the main, a cardamom tuile to finish. Classic favourites sit beside dishes the chefs are still working out.",
    "Produce leads the menu, not the other way around. Leaves and herbs come from the kitchen garden a few steps from the pass; fish is line-caught, beef is Highland-reared, and what the markets have that morning decides the specials board.",
  ],
  highlights: [
    {
      icon: "restaurant" as IconName,
      title: "The dumbwaiter",
      description:
        "A restored lift between kitchen and pass — dinner service you can watch happen.",
    },
    {
      icon: "auto-stories" as IconName,
      title: "Three continents, one menu",
      description:
        "Asian, European and African techniques on the same card, changed with the season.",
    },
    {
      icon: "spa" as IconName,
      title: "Garden to pass",
      description: "Herbs and leaves cut metres from the kitchen; the market decides the specials.",
    },
  ],
};

export interface Ambience {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  /** Reuses an existing asset slot so the placeholder carries a real ratio. */
  assetId: string;
}

/**
 * Three settings, one kitchen. Each maps to an approved outlet and an
 * existing asset id from `content/assets.ts`.
 */
export const ambiences: Ambience[] = [
  {
    id: "rooftop",
    icon: "location",
    title: "Above the trees",
    description:
      "The Rooftop Terrace: small plates, a long drinks list and the city lights coming up over Nakasero.",
    assetId: "dining-rooftop-terrace",
  },
  {
    id: "cellar",
    icon: "auto-stories",
    title: "By the fire",
    description:
      "Manutea Wine & Whisky Lounge: low light, a coravin pour, single malts and a cheese board that lasts the evening.",
    assetId: "dining-manutea",
  },
  {
    id: "garden",
    icon: "spa",
    title: "In the garden",
    description:
      "Hakki Pasha spills onto a terrace under the trees — the all-day room for breakfast meetings and long lunches alike.",
    assetId: "dining-hakki-pasha",
  },
];
