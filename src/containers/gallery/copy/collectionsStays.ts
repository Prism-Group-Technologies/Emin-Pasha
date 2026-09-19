/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { CollectionCopy } from "./collections";

export const stayCollections: CollectionCopy[] = [
  {
    slug: "romance-and-honeymoons",
    title: "Romance & Honeymoons",
    mood: "Candlelit, unhurried, just the two of you",
    summary: "A Deluxe Suite, a table for two and a couples' ritual in the Turkish bath.",
    story:
      "Arrive to petals on the bed and chilled bubbles in the suite. Spend the afternoon in the couples' treatment room, watch the garden turn gold from your balcony, then dine by candlelight at Sir Samuel Baker. Breakfast arrives whenever you decide the day has started.",
    highlights: [
      "Deluxe Suite with petal turndown",
      "60-minute couples' massage",
      "Candlelit dinner for two",
      "Late checkout until 14:00",
    ],
    bestFor: "Honeymoons, anniversaries and proposals",
    priceUsd: 420,
    priceUnit: "per night for two",
    assetIds: [
      "gallery-suite-petal-turndown",
      "room-deluxe-suites",
      "gallery-dining-candlelit-two",
      "gallery-spa-couples-suite",
      "gallery-suite-bath-candles",
      "gallery-estate-garden-path",
      "dining-rooftop-terrace",
      "gallery-room-garden-balcony",
    ],
    metaDescription:
      "Honeymoon and romance at The Emin Pasha, Kampala — Deluxe Suites, candlelit dinners and couples' spa rituals, pictured.",
  },
  {
    slug: "business-in-nakasero",
    title: "Business in Nakasero",
    mood: "Quiet, connected, minutes from everything",
    summary: "A calm room to work from, alcoves for meetings and a gym before the city wakes.",
    story:
      "Stay in the diplomatic quarter without the noise of it. Take the first call from a desk facing the gardens, meet a client in a discreet lounge alcove, and borrow a private meeting room for the afternoon. The pool and gym are open early, and the car to Entebbe is one message away.",
    highlights: [
      "Superior Room with work desk and fast Wi-Fi",
      "Two hours in a private meeting room",
      "Breakfast served from 06:30",
      "Same-day pressing and laundry",
    ],
    bestFor: "Executives, delegations and long stays",
    priceUsd: 210,
    priceUnit: "per night",
    assetIds: [
      "gallery-room-desk-morning",
      "room-superior-room",
      "meetings-business-centre",
      "gallery-lounge-alcove-meeting",
      "meetings-private-rooms",
      "gallery-meeting-boardroom-break",
      "gallery-gym-sunrise",
      "gallery-dining-breakfast-terrace",
    ],
    metaDescription:
      "Business travel at The Emin Pasha, Nakasero — quiet rooms, meeting spaces and early gym and pool, pictured for planners.",
  },
  {
    slug: "spa-weekend",
    title: "The Spa Weekend",
    mood: "Steam, stillness and nowhere to be",
    summary: "Two nights built around the Turkish bath, the pool and long, slow breakfasts.",
    story:
      "Begin in the hammam, where the heat does most of the work. A full-body treatment follows, then tea in the relaxation room and a swim under the trees. The second day is yours — the only schedule is a table booked for dinner and a Superior Suite to return to.",
    highlights: [
      "Turkish bath ritual with scrub",
      "90-minute signature treatment",
      "Unlimited pool and gym access",
      "Superior Suite with breakfast",
    ],
    bestFor: "Solo resets, friends and couples",
    priceUsd: 290,
    priceUnit: "per person, per night",
    assetIds: [
      "gallery-spa-hammam-steam",
      "spa-treatment-room",
      "gallery-spa-relaxation-tea",
      "gallery-pool-morning-laps",
      "spa-pool",
      "gallery-spa-couples-suite",
      "room-superior-suites",
      "spa-gym",
    ],
    metaDescription:
      "A spa weekend at The Emin Pasha, Kampala — Turkish bath rituals, poolside afternoons and suites, pictured before you book.",
  },
];
