"use client";

import Box from "@mui/material/Box";

import { CarouselControls } from "@/components/molecules/PhotoCarousel/CarouselControls";
import { CarouselFrames } from "@/components/molecules/PhotoCarousel/CarouselFrames";
import { usePhotoCarousel } from "@/hooks/usePhotoCarousel";
import { useSwipe } from "@/hooks/useSwipe";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface PhotoCarouselProps {
  /** Frames in display order. Resolved server-side and passed in as props. */
  slides: AssetRef[];
  sizes: string;
  /** Names the region for assistive tech, e.g. "Equatoria restaurant". */
  label: string;
  /** Set only where the carousel is the page's largest contentful paint. */
  priority?: boolean;
  /** `minimal` drops the arrows and the toggle to dots alone. */
  controls?: "full" | "minimal";
  onDark?: boolean;
  /** Per-slide captions, keyed by asset id. */
  captions?: Record<string, string>;
  intervalMs?: number;
  /** Pads the control bar where the frames bleed to a padded container's edge. */
  controlsInset?: { xs: number; md: number } | number;
}

/** Crossfade duration. Long enough to read as a dissolve, not a flicker. */
const FADE_MS = 900;

/**
 * A crossfading, autoplaying, infinitely looping photo carousel.
 *
 * This is the site's one carousel. It began as the homepage intro collage and
 * moved here when dining needed the same thing — a second copy would have been
 * the third place on the site to re-derive `inert`, reduced motion and the
 * CLS-safe ratio box.
 *
 * It composes rather than contains: state is `usePhotoCarousel`, the frames
 * are `CarouselFrames`, the controls are `CarouselControls`. What is left here
 * is the region wrapper, the swipe surface and the hover/focus hold — which is
 * why those handlers sit on the outer box rather than on the image: focusing a
 * dot must stop the thing the dot controls.
 *
 * `controls="minimal"` exists for the places where the carousel is small — an
 * outlet card in a grid — and a four-button bar would outweigh the photograph
 * it sits under. The play/pause toggle survives in both modes, because WCAG
 * 2.2.2 is not a density decision.
 *
 * A client island purely for the timer. It receives resolved `AssetRef`s and
 * never imports the photography registry (DECISIONS.md D25).
 */
export function PhotoCarousel({
  slides,
  sizes,
  label,
  priority = false,
  controls = "full",
  onDark = false,
  captions,
  intervalMs,
  controlsInset,
}: PhotoCarouselProps) {
  const { index, select, next, previous, playing, toggle, hold, release, reduced } =
    usePhotoCarousel(slides.length, intervalMs);
  const swipe = useSwipe({ onNext: next, onPrevious: previous });

  if (slides.length === 0) return null;

  return (
    <Box
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
      sx={{ touchAction: "pan-y" }}
      {...swipe}
    >
      <CarouselFrames
        slides={slides}
        activeIndex={index}
        sizes={sizes}
        fadeMs={FADE_MS}
        priority={priority}
        captions={captions}
      />

      {slides.length > 1 && (
        <CarouselControls
          count={slides.length}
          activeIndex={index}
          onSelect={select}
          onNext={next}
          onPrevious={previous}
          playing={playing}
          onToggle={toggle}
          reduced={reduced}
          transitionMs={FADE_MS / 3}
          onDark={onDark}
          label={label}
          compact={controls === "minimal"}
          inset={controlsInset}
        />
      )}
    </Box>
  );
}
