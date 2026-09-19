"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { useImageCarousel } from "@/containers/home/hooks/useImageCarousel";
import { CarouselDots } from "@/containers/home/molecules/CarouselDots";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface ImageCarouselProps {
  /** Frames in display order. Resolved server-side and passed in as props. */
  slides: AssetRef[];
  sizes: string;
  /** Names the region for assistive tech, e.g. "Rooms and suites". */
  label: string;
}

/** Crossfade duration. Long enough to read as a dissolve, not a flicker. */
const FADE_MS = 900;

/**
 * A crossfading, autoplaying, infinitely looping carousel.
 *
 * The frames are stacked rather than translated, so nothing overflows and the
 * box never moves: the first slide's declared aspect ratio fixes the height up
 * front and the rest fill it (`ratio="fill"`), which keeps the CLS guarantee
 * `AssetImage` makes everywhere else on the site.
 *
 * All frames are in the DOM from the first paint — only the lead frame is
 * `priority`, so `next/image` fetches the rest lazily — and the off-screen ones
 * are held out of the accessibility tree and out of tab order with `inert`, so
 * nobody can land inside a frame they cannot see. Only the visible frame is
 * announced.
 *
 * Hover and focus pause the autoplay (see `useImageCarousel`), which is why
 * those handlers sit on the outer wrapper rather than on the image: focusing a
 * dot must stop the thing the dot controls.
 *
 * The dots are the only control. No arrows: the intro section is type-led and
 * quiet, and a pair of chevrons over a photograph would be the loudest thing
 * on the page.
 *
 * This is a client island purely for the timer. It receives resolved
 * `AssetRef`s and never imports the photography registry (DECISIONS.md D25).
 */
export function ImageCarousel({ slides, sizes, label }: ImageCarouselProps) {
  const { index, select, pause, resume } = useImageCarousel(slides.length);
  const [lead] = slides;

  if (!lead) return null;

  return (
    <Box
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: `${lead.width} / ${lead.height}`,
          overflow: "hidden",
          bgcolor: "action.hover",
        }}
      >
        {slides.map((slide, slideIndex) => (
          <Box
            key={slide.id}
            inert={slideIndex !== index}
            sx={{
              position: "absolute",
              inset: 0,
              opacity: slideIndex === index ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          >
            <AssetImage asset={slide} sizes={sizes} ratio="fill" priority={slideIndex === 0} />
          </Box>
        ))}
      </Box>

      <CarouselDots
        count={slides.length}
        activeIndex={index}
        onSelect={select}
        transitionMs={FADE_MS / 3}
      />
    </Box>
  );
}
