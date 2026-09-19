/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export const rooftopMenu: OutletMenu = {
  label: "The Rooftop Terrace",
  summary:
    "Small plates and a long drinks list, above the trees, as the city lights come up. Walk-ins welcome; sunset tables reserve fast.",
  courses: [
    {
      name: "Small plates",
      items: [
        {
          name: "Rolex bites",
          description: "The Kampala street classic, folded small: chapati, egg, tomato, chilli",
          priceUgx: 20_000,
        },
        {
          name: "Charred corn ribs",
          description: "Chilli-lime butter, cotija, coriander",
          priceUgx: 22_000,
          signature: true,
          assetId: "dining-rooftop-terrace-dish-corn-ribs",
        },
        {
          name: "Beef suya skewers",
          description: "Yaji-spiced sirloin, red onion, lime",
          priceUgx: 34_000,
          signature: true,
          assetId: "dining-rooftop-terrace-dish-suya-skewers",
        },
        {
          name: "Crispy tofu bao",
          description: "Steamed bun, pickled cucumber, sesame, sriracha mayo",
          priceUgx: 26_000,
        },
      ],
    },
    {
      name: "From the bar",
      items: [
        {
          name: "Equator Spritz",
          description: "Passion fruit, sparkling wine, soda, mint",
          priceUgx: 32_000,
        },
        {
          name: "Nakasero Negroni",
          description: "Gin, Campari, sweet vermouth, orange oil",
          priceUgx: 36_000,
          signature: true,
          assetId: "dining-rooftop-terrace-dish-negroni",
        },
        {
          name: "Zero-proof sundowner",
          description: "Hibiscus, ginger, citrus, tonic",
          priceUgx: 24_000,
        },
      ],
    },
  ],
};
