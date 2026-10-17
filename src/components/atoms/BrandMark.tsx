import Box from "@mui/material/Box";

import lockupLight from "@/assets/images/logo-lockup-light.webp";
import lockup from "@/assets/images/logo-lockup.webp";
import { Image } from "@/components/atoms/Image";
import type { LockupWidth } from "@/config/brand";

export interface BrandMarkProps {
  /** Rendered width in px, per breakpoint; height follows the intrinsic ratio. */
  width: LockupWidth;
  sizes: string;
  /** The light lock-up sits over the hero video; the dark one over the page. */
  variant?: "light" | "dark";
  /**
   * The lock-up's accessible name, or `""` where something beside it already
   * names the same link. Required rather than defaulted: the artwork carries
   * the hotel's name in its pixels, so whether that name reaches assistive
   * tech is a decision each call site has to make, not one to inherit.
   */
  alt: string;
  transition?: string;
}

/**
 * The artwork's own ratio, as CSS rather than as a height map.
 *
 * It used to be a second responsive object — one height per declared width —
 * which meant the ratio was written down twice and a step added to one map
 * and not the other would have stretched the lock-up at exactly one window
 * size. `aspect-ratio` states it once and lets the height follow whatever
 * width the box actually resolves to, which is also what makes `maxWidth`
 * below safe: a lock-up that has to narrow on a 320px phone gets shorter in
 * proportion rather than squashed.
 */
const ASPECT_RATIO = `${lockup.width} / ${lockup.height}`;

/**
 * The delivered brand lock-up: the line-art portrait, the rule, and "The
 * Emin Pasha / Hotel & Spa" — one piece of artwork, as supplied.
 *
 * Supersedes the cropped-portrait-plus-live-text arrangement (and, before
 * that, DECISIONS.md D30). The previous artwork baked its wordmark into the
 * lower quarter of a near-square PNG, where it rendered about four pixels
 * tall at header size, so the mark was cropped out of it and the wordmark was
 * re-set as live text. The new artwork is drawn as a horizontal lock-up, so
 * its typography survives at header size and the live-text wordmark is gone —
 * keeping it would have announced and displayed the hotel's name twice.
 *
 * Two consequences follow from the wordmark being pixels again:
 *
 * 1. **The name is `alt`.** It used to be the `LogoWordmark` text, which is
 *    why this component's `alt` was hard-coded to `""`. It is now a required
 *    prop, so the header and footer name the home link and any future second
 *    lock-up on the same page can stay silent.
 * 2. **The `light` variant is a second file.** A live wordmark could be
 *    recoloured through the palette; pixels cannot. `logo-lockup-light.webp`
 *    is the same artwork composited in `sand.50`, derived from the same
 *    source buffer by `scripts/derive-logo.ts`, so the two are guaranteed to
 *    share an intrinsic ratio and one reserved box serves either.
 *
 * **Why it can never stretch.** The wrapper pins only the width; the height
 * is computed from the artwork's own intrinsic metadata at build time, so the
 * box *is* the artwork's ratio at every breakpoint rather than approximating
 * it. `objectFit: "contain"` is belt-and-braces on top of that — with a box
 * that already matches, it has nothing to letterbox. That is also what
 * reserves the space before the image decodes (CLAUDE.md §8, CLS ≤ 0.05).
 *
 * Sized by the wrapper rather than by `width`/`height` props so one element
 * can be responsive across breakpoints and animate between the header's
 * expanded and condensed states.
 *
 * `loading="eager"` but never `priority`: the lock-up is above the fold on
 * every route, so lazy-loading it would flash an empty box — but `priority`
 * emits a preload link, and the one preload that matters on this site belongs
 * to the hero poster, which is the LCP element (CLAUDE.md §8).
 */
export function BrandMark({ width, sizes, variant = "dark", alt, transition }: BrandMarkProps) {
  return (
    <Box
      sx={{
        position: "relative",
        flexShrink: 0,
        width,
        // The cap the smallest phones need. `Logo` lets its link shrink
        // below `NAV_BREAKPOINT` and refuses to above it, so this binds only
        // where the row genuinely has less than 150px to give — a 320px
        // viewport, where the lock-up used to overhang the menu button
        // instead. `aspectRatio` keeps the artwork's shape while it does.
        maxWidth: "100%",
        aspectRatio: ASPECT_RATIO,
        transition,
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Image
        src={variant === "light" ? lockupLight : lockup}
        alt={alt}
        fill
        sizes={sizes}
        loading="eager"
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
