/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { WellnessPackage } from "@/containers/wellness/copy/packages";

/**
 * Group takeovers of the spa, in the same `WellnessPackage` shape the
 * packages band uses so `WellnessPackageCard` renders them unchanged. Every
 * component is an approved §6 offering (massage, facial, the Turkish bath,
 * the pool, group classes) assembled for a party. Prices are invented
 * placeholders and flagged indicative; the card CTA routes to the WhatsApp
 * wellness desk with the intent named.
 */
export const spaGroupOffers: WellnessPackage[] = [
  {
    id: "bridal-morning",
    title: "The Bridal Morning",
    forWhom: "Bridal party, 4–10",
    description:
      "The spa held for your party the morning of the wedding — treatments in rotation, hair and skin prepped, and somewhere calm to get ready.",
    includes: [
      "Express massage or facial for every guest",
      "Turkish bath for the bride the day before",
      "The relaxation lounge reserved for your group",
      "Sparkling wine, fruit and a light breakfast",
      "A dressing area with mirrors and power",
    ],
    priceUgx: 480000,
    priceUnit: "per person · indicative",
    assetId: "spa-group-bridal",
  },
  {
    id: "executive-reset",
    title: "The Executive Reset",
    forWhom: "Teams of 6–20",
    description:
      "Half a day out of the office — a mobility class, short treatments on rotation, the pool, and lunch in the gardens.",
    includes: [
      "A 45-minute mobility or breath-work class",
      "15-minute chair & express treatments on rotation",
      "Use of the pool and the poolside gardens",
      "A working lunch in the gardens",
      "A quiet room for anyone who has to dial in",
    ],
    priceUgx: 320000,
    priceUnit: "per person · indicative",
    assetId: "spa-group-corporate",
  },
];
