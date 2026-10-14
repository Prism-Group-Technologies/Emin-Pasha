/**
 * Reception — the front-desk feature module.
 *
 * Unlike every other folder in `containers/`, this one is not a page. There is
 * no `/reception` route: the desk is not a destination a guest searches for,
 * it is context that belongs beside whatever they *were* reading — the room
 * they are about to book, the transfer that drops them at the door, the story
 * of the house they are walking into. Giving it a route would have created a
 * page with no keyword cluster of its own and a thin reason to exist, which is
 * the shape of a page that gets consolidated six months later.
 *
 * So it is built as a module that other containers mount:
 *
 *   `ReceptionBand`        the homepage's arrival argument, with the stat rail
 *   `ReceptionDeskSection` the filterable sixteen-service index
 *   `ArrivalStrip`         the compact three-variant strip other funnels mount
 *
 * Copy lives in `./copy` and is **invented and unapproved** — see that folder's
 * `index.ts`. State lives in `./hooks`. Neither organism holds either.
 */
export { ArrivalStrip, type ArrivalStripVariant } from "./organisms/ArrivalStrip";
export { ReceptionBand } from "./organisms/ReceptionBand";
export { ReceptionDeskSection } from "./organisms/ReceptionDeskSection";
export { receptionAsset, receptionAssets, receptionServices } from "./copy";
