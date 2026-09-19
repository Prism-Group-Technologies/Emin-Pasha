/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { GallerySeed } from "./seedTypes";

const lens = (slug: string, title: string, altText: string): GallerySeed => ({
  id: `gallery-lens-${slug}`,
  title,
  altText,
  shape: "square",
});

/** Frames that never appear on the photo wall: guest lens tiles and the film/tour posters. */
export const extraSeeds: GallerySeed[] = [
  lens(
    "poolside",
    "Guest photo — feet up by the pool",
    "A guest's view of the pool from a lounger",
  ),
  lens(
    "breakfast",
    "Guest photo — breakfast from above",
    "A breakfast table photographed from above",
  ),
  lens("proposal", "Guest photo — a ring in the gardens", "A ring box held out on the garden lawn"),
  lens("cocktail", "Guest photo — cocktails at the bar", "Two cocktails raised at the lounge bar"),
  lens("suite", "Guest photo — the suite at checkout", "A made bed and open curtains in a suite"),
  lens("garden", "Guest photo — a garden selfie", "Two friends smiling on the garden path"),
  lens(
    "wedding",
    "Guest photo — confetti on the lawn",
    "Confetti thrown over a couple on the lawn",
  ),
  lens("spa", "Guest photo — robe and tea at the spa", "A robe and a cup of tea on a spa lounger"),
  {
    id: "gallery-film-poster",
    title: "Estate film poster frame — the gardens from above at golden hour",
    altText: "The Emin Pasha estate and gardens seen from above at golden hour",
    shape: "wide",
  },
  {
    id: "gallery-tour-poster",
    title: "360° tour preview — the Deluxe Suite panorama",
    altText: "A panoramic preview of a Deluxe Suite for the virtual tour",
    shape: "wide",
  },
];
