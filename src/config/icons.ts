import type { Metadata, MetadataRoute } from "next";

import favicon from "@/assets/images/favicon.ico";

/**
 * The app icon set, declared once.
 *
 * The favicon master lives in `src/assets/images/` beside `logo.png` and
 * `logo-mark.png` — brand artwork belongs with brand artwork, not scattered
 * into `src/app/` — and reaches the browser as a static import, so it is
 * content-hashed and served `immutable` out of `/_next/static/media/` rather
 * than as a bare, revalidated `/favicon.ico`.
 *
 * Declaring `icons` at all is what forces this module to exist. Verified
 * against next@16.2.12's `lib/metadata/resolve-metadata.js`: the `app/icon.*`
 * and `app/apple-icon.*` file conventions are only folded in
 * `if (!resolvedMetadata.icons)`, so the moment a layout sets `icons` those
 * generated `<link>` tags disappear. The three entries below are therefore
 * not decoration — drop one and its tag stops being emitted, even though the
 * file still sits in `src/app/` and its route still resolves.
 */
const svgIcon = { url: "/icon.svg", type: "image/svg+xml" } as const;
const pngIcon = { url: "/icon.png", sizes: "32x32", type: "image/png" } as const;
const appleIcon = { url: "/apple-icon.png", sizes: "180x180", type: "image/png" } as const;

export const faviconSrc = favicon.src;

/**
 * Order is the browser's preference order, and the .ico leads for the same
 * reason Next unshifts its own favicon to the front of this list: it is the
 * one format every client understands.
 *
 * `sizes: "any"` is deliberate. ICO is a container that may hold several
 * resolutions, so a single `WxH` would be a claim about the file's contents
 * that goes stale the next time the master is re-exported.
 */
export const appIcons = {
  icon: [{ url: faviconSrc, sizes: "any", type: "image/x-icon" }, svgIcon, pngIcon],
  apple: [appleIcon],
} satisfies Metadata["icons"];

/**
 * The same icons as the install prompt wants them — `MetadataRoute.Manifest`
 * takes `src`, not `url`, so the two shapes cannot simply be shared. Built
 * from the same three constants rather than re-typed, so a path can only ever
 * be changed in one place (CLAUDE.md §5.4, zero data duplication).
 *
 * The .ico is left out on purpose: a web app manifest describes the installed
 * launcher icon, and no platform installs from an ICO.
 */
export const manifestIcons = [
  { src: svgIcon.url, sizes: "any", type: svgIcon.type, purpose: "any" },
  { src: pngIcon.url, sizes: pngIcon.sizes, type: pngIcon.type },
  { src: appleIcon.url, sizes: appleIcon.sizes, type: appleIcon.type },
] satisfies MetadataRoute.Manifest["icons"];
