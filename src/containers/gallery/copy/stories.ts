/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface Story {
  id: string;
  /** Cartographic time-stamp, e.g. "06:10". */
  time: string;
  title: string;
  body: string;
  details: string[];
  assetId: string;
  ctaLabel: string;
}

/** Three editorial chapters, alternating image and text down the page. */
export const stories: Story[] = [
  {
    id: "first-light",
    time: "06:10",
    title: "First light on the house",
    body: "Before Nakasero's traffic starts, the estate belongs to the birds and the gardeners. Early risers take coffee on the terrace, swim the first lengths of the day, and watch the façade warm from grey to gold.",
    details: ["Pool opens at 06:00", "Terrace coffee from 06:30", "Guided garden walk on request"],
    assetId: "gallery-estate-dawn-facade",
    ctaLabel: "Book an early-morning stay",
  },
  {
    id: "golden-hour",
    time: "17:40",
    title: "Golden hour in the gardens",
    body: "The hour photographers ask for by name. Light slants through the trees onto the garden path, couples walk it for portraits, and the lawn is set for whatever the evening holds — a wedding, a sundowner or simply a long drink.",
    details: [
      "Garden portraits by arrangement",
      "Sundowners on the lawn",
      "The best light, June to August",
    ],
    assetId: "gallery-estate-garden-path",
    ctaLabel: "Reserve golden hour",
  },
  {
    id: "lantern-light",
    time: "21:15",
    title: "Lantern light and last orders",
    body: "Lanterns line the drive, the fire is lit in the Acropole Lounge and the kitchen sends out the last tasting course. It is the house at its most intimate — and the reason so many guests extend by a night.",
    details: [
      "Fireside nightcaps until late",
      "Tasting menu, last seating 21:00",
      "Live music on Fridays",
    ],
    assetId: "gallery-estate-lantern-night",
    ctaLabel: "Plan an evening here",
  },
];
