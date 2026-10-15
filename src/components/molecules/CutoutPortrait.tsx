import Box from "@mui/material/Box";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Image } from "@/components/atoms/Image";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface CutoutPortraitProps {
  asset: AssetRef;
  /** Rendered width in px, per breakpoint; height follows the artwork's ratio. */
  width: { xs: number; md: number };
  sizes: string;
}

/**
 * Where the dissolve begins, as a share of the artwork's own height.
 *
 * Tuned to the Emin Pasha engraving, whose figure sits low in its box: the
 * chin lands near 63% and the shoulders near 67%, so anything earlier than
 * ~76% eats the face. The second stop steepens the ramp so the fade reads as
 * a deliberate dissolve rather than a slow wash over the whole torso.
 */
const FADE = "linear-gradient(to bottom, #000 76%, rgba(0,0,0,0.55) 90%, transparent 100%)";

/**
 * Greyscale neutralises the colour residue a background removal leaves behind
 * (the Emin Pasha cutout carries a cream cast on the left epaulette); the
 * contrast lift puts back the bite the mask's lower stops take out of the
 * engraved line work.
 */
const ARCHIVAL = "grayscale(1) contrast(1.05)";

/**
 * A background-removed figure — artwork with a transparent ground, not a
 * photograph — rendered so that its cut edge dissolves into the page.
 *
 * **Why this exists rather than `AssetImage`.** `AssetImage` is built for
 * photographs: it crops with `objectFit: cover` and paints `action.hover`
 * behind the frame. Point it at a cutout and both of those become defects —
 * the grey plate shows through every transparent pixel, and `cover` trims the
 * figure to a ratio it was never cut to. The same reasoning already sent the
 * home page's lock-up through `BrandMark`; this is that argument generalised,
 * now that a cutout has to appear in three places.
 *
 * **Why a mask rather than a crop.** A removal tool leaves a ragged edge
 * wherever the subject met the frame of the original scan — on this engraving,
 * a torn hem just below the shoulders. Cropping it off only moves the hard
 * edge up; `mask-image` with a gradient dissolves it instead, which is the
 * established treatment for cutout figures. `clip-path` cannot do this: it
 * takes a shape, not an alpha ramp.
 *
 * **Why it can never stretch.** The wrapper pins only the width and derives
 * the height from the delivered file's own intrinsic metadata, so the box *is*
 * the artwork's ratio at every breakpoint — the declared slot ratio in
 * `@/content/assets` is the fallback, used only before a file is assigned.
 * That is what reserves the space before the image decodes (CLS ≤ 0.05).
 *
 * **Call sites must cap `width` to the source's native pixels.** A cutout is
 * usually a hand-prepared one-off, not a shot from the delivered library, so
 * there is no larger master to resample from: `next/image` will happily
 * upscale and the engraved lines go soft. Keep `width.md` at or below half the
 * file's intrinsic width so a 2× display still draws from real pixels.
 *
 * An unassigned slot falls through to `AssetImage`, which keeps the
 * dimension-labelled shooting brief (CLAUDE.md §6.6) intact — there is nothing
 * to dissolve until there is a file.
 */
export function CutoutPortrait({ asset, width, sizes }: CutoutPortraitProps) {
  const { image } = asset;

  if (!image) return <AssetImage asset={asset} sizes={sizes} />;

  const ratio = image.width / image.height;
  const height = { xs: Math.round(width.xs / ratio), md: Math.round(width.md / ratio) };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        filter: ARCHIVAL,
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    >
      <Image
        src={image.src}
        alt={asset.decorative ? "" : asset.altText}
        fill
        sizes={sizes}
        blurDataURL={image.blurDataURL}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
