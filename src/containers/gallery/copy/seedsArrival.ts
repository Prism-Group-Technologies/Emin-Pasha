/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { GallerySeed } from "./seedTypes";

/**
 * The arrival frames, filed under `estate`.
 *
 * They do not get a category or a collection of their own. A seventh tab would
 * put four photographs beside tabs holding fifteen, and a new collection slug
 * is a new indexable route under `/gallery/[collection]` — a route with no
 * keyword cluster that nobody searches for, which `routes.ts` would then have
 * to carry forever. "The Estate" is already where the building itself lives,
 * and the lobby is part of the building.
 *
 * These are also the only tiles on the wall with staff in them, which is why
 * two of the four are the desk rather than the furniture.
 */
export const arrivalSeeds: GallerySeed[] = [
  {
    id: "gallery-arrival-desk",
    category: "estate",
    title: "The desk, under the world clocks",
    altText: "Two receptionists at the timber reception desk beneath a wall of world clocks",
    shape: "wide",
  },
  {
    id: "gallery-arrival-waiting",
    category: "estate",
    title: "The waiting corner, window open",
    altText: "Patterned chairs beneath the Emin Pasha portrait, the window open to the garden",
    shape: "landscape",
  },
  {
    id: "gallery-arrival-lobby",
    category: "estate",
    title: "The lobby, a step from the desk",
    altText: "The hotel lobby with its sofa, the reception desk beyond",
    shape: "landscape",
  },
  {
    id: "gallery-arrival-lounge",
    category: "estate",
    title: "Orange velvet against dark stone",
    altText: "Orange velvet armchairs against the lobby's dark stone wall",
    shape: "landscape",
  },
];
