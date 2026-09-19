/**
 * The stand-in used by any asset slot that has no photograph assigned to it
 * in `@/content/photoAssignments`.
 *
 * Nearly every slot on the site now resolves to a delivered photograph, so
 * this is a safety net rather than the default: it catches a slot added
 * without an assignment, which `src/content/photoAssignments.test.ts` also
 * fails the build over. It is rendered through `fill` + `object-fit: cover`
 * inside a box that already holds the slot's real aspect ratio, so a
 * photograph drops into the same box without moving anything (CLS stays at 0
 * through the swap).
 *
 * The artwork is deliberately **not** a neutral grey box and deliberately
 * **not** a stock photograph: it is brand-coloured, carries the Equatorial
 * Line motif, and states "Placeholder — awaiting delivered photography"
 * across the foot. `AssetImage` labels each instance with its own asset id
 * and required dimensions on top of that, so a stand-in can never be mistaken
 * for real photography of the property (CLAUDE.md §3, §6.6).
 *
 * No imports on purpose — this module is reachable from the always-loaded
 * client bundle, and must not pull the Zod-validated content layer in with it
 * (DECISIONS.md D25).
 */
export const placeholderImageSrc = "/images/placeholder.jpg";

export const placeholderImageSize = { width: 1920, height: 1080 } as const;
