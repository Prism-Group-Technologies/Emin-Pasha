/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface MediaSeed {
  id: string;
  subject: string;
  altText: string;
  shape?: "landscape" | "portrait" | "wide" | "square";
}

/** Three photo slots per space — a lead image and two supporting frames. */
export const spaceSeeds: MediaSeed[] = [
  {
    id: "spaces-acropole-fireside",
    subject: "Acropole Lounge at dusk — armchairs by the lit fireplace, the fountain softly lit",
    altText: "Fireside armchairs in the Acropole Lounge at The Emin Pasha Hotel & Spa",
    shape: "wide",
  },
  {
    id: "spaces-acropole-bar",
    subject: "A mixologist stirring a cocktail at the Acropole bar, bottles backlit in amber",
    altText: "A mixologist at the Acropole Lounge bar",
    shape: "square",
  },
  {
    id: "spaces-acropole-alcove",
    subject: "A secluded alcove set for two, low lamp, leather notebook and espresso cups",
    altText: "A private alcove in the Acropole Lounge",
    shape: "square",
  },
  {
    id: "spaces-mehmed-terrace",
    subject: "Mehmed Pasha Lounge terrace in morning light, tables looking onto the gardens",
    altText: "The garden terrace of the Mehmed Pasha Lounge",
    shape: "wide",
  },
  {
    id: "spaces-mehmed-reading",
    subject: "A reading armchair by the window, a guest with a book and tea, greenery outside",
    altText: "Quiet indoor seating in the Mehmed Pasha Lounge",
    shape: "square",
  },
  {
    id: "spaces-mehmed-tea",
    subject: "Afternoon tea tiers on the long table, porcelain, scones and garden flowers",
    altText: "Afternoon tea served in the Mehmed Pasha Lounge",
    shape: "square",
  },
  {
    id: "spaces-gardens-lawn",
    subject: "The Equatorial Gardens from above — lush lawn, planted borders and mature trees",
    altText: "The Equatorial Gardens at The Emin Pasha Hotel & Spa",
    shape: "wide",
  },
  {
    id: "spaces-gardens-golden-hour",
    subject: "A couple photographed on the garden path at golden hour, backlit foliage",
    altText: "A golden-hour portrait in the Equatorial Gardens",
    shape: "square",
  },
  {
    id: "spaces-gardens-reception",
    subject: "An evening reception on the lawn under festoon lights, guests with drinks",
    altText: "An evening reception in the Equatorial Gardens",
    shape: "square",
  },
];
