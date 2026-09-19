/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export const sirSamuelBakerMenu: OutletMenu = {
  label: "Sir Samuel Baker Fine Dining",
  summary:
    "A tasting-led room: the finest ingredients, meticulous plating, an evening to sit over. Wine pairing on request.",
  courses: [
    {
      name: "Set menu · five courses",
      items: [
        {
          name: "Amuse — smoked catfish, horseradish",
          description: "Lake catfish, crème fraîche, dill oil, rye crisp",
          priceUgx: 0,
        },
        {
          name: "Course one — heritage tomato & burrata",
          description: "Kabale tomatoes, burrata, basil, aged balsamic",
          priceUgx: 0,
        },
        {
          name: "Course two — seared scallop",
          description: "Diver scallop, brown butter, cauliflower, capers",
          priceUgx: 0,
          signature: true,
          assetId: "dining-sir-samuel-baker-dish-scallop",
        },
        {
          name: "Course three — braised short rib",
          description: "72-hour short rib, celeriac, bone-marrow crumb, jus",
          priceUgx: 0,
          signature: true,
          assetId: "dining-sir-samuel-baker-dish-short-rib",
        },
        {
          name: "Course four — dark chocolate, coffee, cardamom",
          description: "Ugandan cocoa, espresso cream, cardamom tuile",
          priceUgx: 0,
          signature: true,
          assetId: "dining-sir-samuel-baker-dish-chocolate",
        },
      ],
    },
    {
      name: "The table",
      items: [
        {
          name: "Five-course tasting menu",
          description:
            "Per guest. The whole table dines together; dietary versions on 24 hours' notice",
          priceUgx: 195_000,
        },
        {
          name: "Wine pairing",
          description: "A glass matched to each course, poured through the evening",
          priceUgx: 145_000,
        },
      ],
    },
  ],
};
