/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export const hakkiPashaMenu: OutletMenu = {
  label: "Hakki Pasha Restaurant & Bar",
  summary:
    "The all-day room: a fusion of international and local plates with handcrafted cocktails, from breakfast through to a late table.",
  courses: [
    {
      name: "To begin",
      items: [
        {
          name: "Nakasero garden salad",
          description:
            "Leaves from the kitchen garden, avocado, toasted g-nut, passion-fruit dressing",
          priceUgx: 26_000,
        },
        {
          name: "Pili-pili prawns",
          description: "Coast prawns, bird's-eye butter, charred lime, sourdough toast",
          priceUgx: 44_000,
        },
        {
          name: "Ottoman mezze board",
          description:
            "Hummus, muhammara, smoked aubergine, warm flatbread — a nod to Hakki Pasha's Albania",
          priceUgx: 38_000,
          signature: true,
          assetId: "dining-hakki-pasha-dish-mezze",
        },
      ],
    },
    {
      name: "Mains",
      items: [
        {
          name: "Charcoal chicken, matoke two ways",
          description: "Marinated overnight, steamed and crushed matoke, greens, gravy",
          priceUgx: 52_000,
          signature: true,
          assetId: "dining-hakki-pasha-dish-charcoal-chicken",
        },
        {
          name: "Nile perch, coconut & lemongrass",
          description: "Line-caught perch, lemongrass broth, jasmine rice, pak choi",
          priceUgx: 61_000,
          signature: true,
          assetId: "dining-hakki-pasha-dish-nile-perch",
        },
        {
          name: "Dry-aged beef fillet",
          description: "Highland beef, triple-cooked potato, pepper sauce, watercress",
          priceUgx: 88_000,
        },
      ],
    },
    {
      name: "To finish",
      items: [
        {
          name: "Dark chocolate & chilli tart",
          description: "Single-origin ganache, sea salt, malted ice cream",
          priceUgx: 24_000,
        },
        {
          name: "Spiced pineapple carpaccio",
          description: "Cardamom syrup, coconut sorbet, toasted coconut",
          priceUgx: 22_000,
        },
      ],
    },
  ],
};
