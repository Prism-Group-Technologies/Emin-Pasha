import Box from "@mui/material/Box";

import logoMark from "@/assets/images/logo-mark.png";
import { Image } from "@/components/atoms/Image";

export interface BrandMarkProps {
  /** Rendered height in px, per breakpoint; width follows the intrinsic ratio. */
  height: { xs: number; md: number };
  sizes: string;
  transition?: string;
}

/**
 * The portrait mark from the supplied lock-up, cropped away from the baked-in
 * wordmark (docs/ASSET_MANIFEST.md records the crop). The wordmark is set as
 * live text by `LogoWordmark` instead, because at the header's 30–52px mark
 * height the baked one renders about four pixels tall.
 *
 * `alt=""` is deliberate and is not a content gap: the mark is decorative
 * *here* because the visible wordmark beside it already supplies the link's
 * accessible name. A second name on the image would make screen readers
 * announce the hotel twice.
 *
 * Sized by the wrapper rather than by `width`/`height` props so one element
 * can be responsive across breakpoints and animate between the header's
 * expanded and condensed states. The wrapper is what reserves the space, and
 * it holds the mark's exact aspect ratio at every size, so nothing moves
 * while the image decodes (CLAUDE.md §8, CLS ≤ 0.05).
 *
 * `loading="eager"` but never `priority`: the lock-up is above the fold on
 * every route, so lazy-loading it would flash an empty box — but `priority`
 * emits a preload link, and the one preload that matters on this site belongs
 * to the hero poster, which is the LCP element (CLAUDE.md §8).
 */
export function BrandMark({ height, sizes, transition }: BrandMarkProps) {
  const ratio = logoMark.width / logoMark.height;

  return (
    <Box
      sx={{
        position: "relative",
        flexShrink: 0,
        height,
        width: { xs: Math.round(height.xs * ratio), md: Math.round(height.md * ratio) },
        transition,
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Image
        src={logoMark}
        alt=""
        fill
        sizes={sizes}
        loading="eager"
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
