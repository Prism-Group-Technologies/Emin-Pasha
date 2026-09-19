/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface LensTile {
  id: string;
  assetId: string;
  /** Placeholder handle — no real account is named. */
  handle: string;
  moment: string;
}

/** Eight placeholder guest frames for the #EminPashaMoments wall. */
export const lensTiles: LensTile[] = [
  { id: "l1", assetId: "gallery-lens-poolside", handle: "@placeholder.guest", moment: "Poolside" },
  {
    id: "l2",
    assetId: "gallery-lens-breakfast",
    handle: "@placeholder.guest",
    moment: "Breakfast",
  },
  {
    id: "l3",
    assetId: "gallery-lens-proposal",
    handle: "@placeholder.guest",
    moment: "The proposal",
  },
  {
    id: "l4",
    assetId: "gallery-lens-cocktail",
    handle: "@placeholder.guest",
    moment: "Friday night",
  },
  { id: "l5", assetId: "gallery-lens-suite", handle: "@placeholder.guest", moment: "Suite life" },
  {
    id: "l6",
    assetId: "gallery-lens-garden",
    handle: "@placeholder.guest",
    moment: "In the gardens",
  },
  {
    id: "l7",
    assetId: "gallery-lens-wedding",
    handle: "@placeholder.guest",
    moment: "Our wedding",
  },
  { id: "l8", assetId: "gallery-lens-spa", handle: "@placeholder.guest", moment: "Spa day" },
];

/** Three placeholder guest notes, rendered through the shared `QuoteCard`. */
export const lensVoices = [
  {
    id: "photos-honest",
    heading: "Better than the photos",
    quote:
      "We booked from the gallery alone. The Deluxe Suite was exactly what we'd seen — and the gardens at golden hour were better.",
    author: "Placeholder guest",
    location: "London",
    date: "Honeymoon",
  },
  {
    id: "whatsapp",
    heading: "One message",
    quote:
      "I sent a screenshot of the long-table photo on WhatsApp and had a quote for forty guests the same afternoon.",
    author: "Placeholder guest",
    location: "Kampala",
    date: "Birthday dinner",
  },
  {
    id: "video-call",
    heading: "Shown round live",
    quote:
      "The team walked me through two suites on a video call before I booked for my parents. It made the decision easy.",
    author: "Placeholder guest",
    location: "Toronto",
    date: "Family stay",
  },
];

export const lensCopy = {
  shareTitle: "Share your stay",
  shareBody:
    "Tag #EminPashaMoments on Instagram. Each month we feature a guest frame here — and send a dinner for two to its photographer.",
  followLabel: "Follow on Instagram",
  tileLabel: "Guest photo",
};
