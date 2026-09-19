/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export const inRoomMenu: OutletMenu = {
  label: "In-Room Dining",
  summary:
    "A Special-Select menu, every room category, around the clock. Full menu until late; a shorter overnight list from 23:00.",
  courses: [
    {
      name: "Any hour",
      items: [
        {
          name: "The Emin Pasha club",
          description: "Triple-decker, chicken, bacon, egg, fries",
          priceUgx: 42_000,
          signature: true,
          assetId: "dining-in-room-dish-club",
        },
        {
          name: "Beef burger",
          description: "Highland beef, cheddar, house pickles, fries",
          priceUgx: 48_000,
          signature: true,
          assetId: "dining-in-room-dish-burger",
        },
        {
          name: "Chicken curry & rice",
          description: "Mild coconut curry, basmati, poppadom",
          priceUgx: 46_000,
          signature: true,
          assetId: "dining-in-room-dish-curry",
        },
        {
          name: "Garden bowl",
          description: "Grains, roast vegetables, avocado, tahini",
          priceUgx: 38_000,
        },
      ],
    },
    {
      name: "Overnight (from 23:00)",
      items: [
        {
          name: "Soup of the day & bread",
          description: "Ask reception for tonight's",
          priceUgx: 24_000,
        },
        {
          name: "Toasted sandwich",
          description: "Cheese and tomato, or ham and cheese, with fries",
          priceUgx: 30_000,
        },
        {
          name: "Fruit plate",
          description: "Seasonal, cut to order",
          priceUgx: 20_000,
        },
      ],
    },
  ],
};
