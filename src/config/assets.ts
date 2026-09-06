/**
 * Stand-in media, used by every asset slot whose master has not been
 * delivered (TODO(EMIN-Q43) video, TODO(EMIN-Q44) photography).
 *
 * One image covers all ~30 image slots: it is rendered through `fill` +
 * `object-fit: cover` inside a box that already holds the slot's real aspect
 * ratio, so a delivered photograph drops into the same box without moving
 * anything (CLS stays at 0 through the swap).
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

/**
 * An 8-second silent loop rendered from the same artwork with a slow
 * Ken-Burns drift, in both codecs CLAUDE.md §8 asks for. 317 KB / 160 KB —
 * far under the 6 MB ceiling, but the real footage will not be, so Step 8
 * still has to do the `preload="none"` + poster-first work properly.
 */
export const placeholderVideoSources = [
  { src: "/video/placeholder-hero.webm", type: "video/webm" },
  { src: "/video/placeholder-hero.mp4", type: "video/mp4" },
] as const;
