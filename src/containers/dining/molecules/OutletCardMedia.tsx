import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { PhotoCarousel } from "@/components/molecules/PhotoCarousel/PhotoCarousel";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface OutletCardMediaProps {
  /** The outlet's carousel frames; empty falls back to `fallback`. */
  slides: AssetRef[];
  /** The single showcase frame, used when the outlet has no carousel. */
  fallback?: AssetRef;
  /** The cartographic label pinned to the frame's top-left corner. */
  kicker: string;
  label: string;
}

const CARD_SIZES = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw";

/**
 * The media at the top of an outlet card.
 *
 * Split out of `DiningOutletCard` because the card now has two media modes and
 * keeping both inline pushed the component past the point where its layout was
 * readable at a glance.
 *
 * The carousel runs with `controls="minimal"`: a 33vw card cannot carry four
 * buttons under a 3:2 frame without the control bar out-weighing the
 * photograph, and swipe plus the dots still reach every frame. The play/pause
 * toggle survives the trim — WCAG 2.2.2 is not a density decision.
 *
 * `controlsInset` matches the card body's own padding, because the frames
 * bleed to the card edge while the title beneath them does not; without it the
 * dots would sit a few pixels outside the text column they belong to.
 *
 * The static fallback keeps `hoverZoom`; the carousel does not get it. A frame
 * that is already crossfading on a timer does not also need to scale under the
 * pointer, and the two transforms fight.
 */
export function OutletCardMedia({ slides, fallback, kicker, label }: OutletCardMediaProps) {
  const chip = (
    <Chip
      label={kicker}
      size="small"
      sx={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 1,
        bgcolor: "background.default",
        fontFamily: "var(--font-cartographic)",
      }}
    />
  );

  if (slides.length > 0) {
    return (
      <Box sx={{ position: "relative" }}>
        {chip}
        <PhotoCarousel
          slides={slides}
          sizes={CARD_SIZES}
          label={label}
          controls="minimal"
          controlsInset={{ xs: 4, md: 5 }}
        />
      </Box>
    );
  }

  if (!fallback) return null;

  return (
    <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
      <AssetImage asset={fallback} sizes={CARD_SIZES} />
      {chip}
    </MediaFrame>
  );
}
