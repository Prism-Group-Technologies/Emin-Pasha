import type { Metadata, MetadataRoute } from "next";

import androidChrome192 from "@/assets/images/favicon/android-chrome-192x192.png";
import androidChrome512 from "@/assets/images/favicon/android-chrome-512x512.png";
import appleTouchIcon from "@/assets/images/favicon/apple-touch-icon.png";
import favicon16 from "@/assets/images/favicon/favicon-16x16.png";
import favicon32 from "@/assets/images/favicon/favicon-32x32.png";
import favicon from "@/assets/images/favicon/favicon.ico";

/**
 * The app icon set, declared once.
 *
 * The masters live in `src/assets/images/favicon/` beside the brand lock-ups
 * (`logo.webp` and the two files derived from it) — brand artwork belongs
 * with brand artwork, not scattered into `src/app/` — and reach the browser
 * as static imports, so they are
 * content-hashed and served `immutable` out of `/_next/static/media/` rather
 * than as bare, revalidated `/favicon-32x32.png` paths. That is the one
 * difference from the stock generator snippet, whose root-relative URLs would
 * be re-validated on every visit.
 *
 * Declaring `icons` at all is what forces this module to exist. Verified
 * against next@16.2.12's `lib/metadata/resolve-metadata.js`: the `app/icon.*`
 * and `app/apple-icon.*` file conventions are only folded in
 * `if (!resolvedMetadata.icons)`, so the moment a layout sets `icons` those
 * generated `<link>` tags disappear. Nothing is left in `src/app/` to fall
 * back on — the placeholder `icon.svg`/`icon.png`/`apple-icon.png` were
 * deleted with this set — so every tag a browser gets is emitted from here.
 *
 * There is deliberately no SVG entry: the brand export is raster only, and a
 * hand-traced approximation of the line-art portrait would be a second,
 * subtly different mark that browsers preferring SVG would show instead of
 * the real one.
 */
const png = (image: { src: string; width: number }) =>
  ({ url: image.src, sizes: `${image.width}x${image.width}`, type: "image/png" }) as const;

const icon32 = png(favicon32);
const icon16 = png(favicon16);
const appleIcon = png(appleTouchIcon);
const android192 = png(androidChrome192);
const android512 = png(androidChrome512);

export const faviconSrc = favicon.src;

/**
 * Order is the browser's preference order, and the .ico leads for the same
 * reason Next unshifts its own favicon to the front of this list: it is the
 * one format every client understands.
 *
 * `sizes: "any"` on the .ico is deliberate. ICO is a container that may hold
 * several resolutions, so a single `WxH` would be a claim about the file's
 * contents that goes stale the next time the master is re-exported.
 *
 * 32 precedes 16 because a browser picking from this list should land on the
 * sharper of the two on a HiDPI tab strip.
 */
export const appIcons = {
  icon: [{ url: faviconSrc, sizes: "any", type: "image/x-icon" }, icon32, icon16],
  apple: [appleIcon],
} satisfies Metadata["icons"];

/**
 * The same icons as the install prompt wants them — `MetadataRoute.Manifest`
 * takes `src`, not `url`, so the two shapes cannot simply be shared. Built
 * from the same constants rather than re-typed, so a path can only ever be
 * changed in one place (CLAUDE.md §5.4, zero data duplication).
 *
 * The .ico is left out on purpose: a web app manifest describes the installed
 * launcher icon, and no platform installs from an ICO.
 *
 * 192 and 512 are the two sizes Chrome's install criteria actually check for,
 * and 512 additionally seeds the Android splash screen. `purpose: "any"` is
 * declared rather than assumed — the mark is drawn with its own margin and is
 * not safe to mask, so no `maskable` entry is offered.
 */
export const manifestIcons = [
  { src: android192.url, sizes: android192.sizes, type: android192.type, purpose: "any" },
  { src: android512.url, sizes: android512.sizes, type: android512.type, purpose: "any" },
  { src: appleIcon.url, sizes: appleIcon.sizes, type: appleIcon.type },
  { src: icon32.url, sizes: icon32.sizes, type: icon32.type },
] satisfies MetadataRoute.Manifest["icons"];
