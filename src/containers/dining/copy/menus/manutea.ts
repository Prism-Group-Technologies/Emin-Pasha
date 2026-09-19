/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export const manuteaMenu: OutletMenu = {
  label: "Manutea Wine & Whisky Lounge",
  summary:
    "A quiet room for a serious list: wines by the glass from a coravin pour, single malts, and a short menu built to go with them.",
  courses: [
    {
      name: "By the glass",
      items: [
        {
          name: "Sparkling — Franciacorta Brut",
          description: "Lombardy, traditional method, 125ml",
          priceUgx: 42_000,
        },
        {
          name: "White — Cape Chenin Blanc",
          description: "Stellenbosch, old vine, 175ml",
          priceUgx: 34_000,
        },
        {
          name: "Red — Rhône Syrah",
          description: "Northern Rhône, peppery, 175ml",
          priceUgx: 46_000,
          signature: true,
          assetId: "dining-manutea-dish-syrah",
        },
      ],
    },
    {
      name: "The whisky shelf",
      items: [
        {
          name: "Speyside 12",
          description: "Sherry cask, dried fruit, gentle spice, 40ml",
          priceUgx: 38_000,
        },
        {
          name: "Islay single malt",
          description: "Peat, brine, citrus, 40ml",
          priceUgx: 52_000,
          signature: true,
          assetId: "dining-manutea-dish-islay-malt",
        },
        {
          name: "Japanese blend",
          description: "Honey, orchard fruit, soft oak, 40ml",
          priceUgx: 58_000,
        },
      ],
    },
    {
      name: "To go with",
      items: [
        {
          name: "Cheese & charcuterie",
          description: "Three cheeses, cured meats, honeycomb, crackers",
          priceUgx: 56_000,
          signature: true,
          assetId: "dining-manutea-dish-cheese-board",
        },
        {
          name: "Marcona almonds & olives",
          description: "Warm, rosemary, orange zest",
          priceUgx: 18_000,
        },
      ],
    },
  ],
};
