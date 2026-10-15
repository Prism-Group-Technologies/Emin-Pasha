"use client";

import Box from "@mui/material/Box";

import { AssetImage } from "@/components/atoms/AssetImage";
import type { AssetRef } from "@/schemas/content/assetRef";
import { zoomGroup } from "@/utils/imageZoom";

export interface CarouselFramesProps {
  slides: AssetRef[];
  activeIndex: number;
  sizes: string;
  fadeMs: number;
  /** `priority` on the lead frame — set only where the carousel is the LCP. */
  priority?: boolean;
  /**
   * Per-slide captions, keyed by asset id. Drawn over the active frame's lower
   * edge, and carried into the image modal as that photograph's caption — so
   * a frame described as "the terrace at dusk" in the carousel is still
   * described that way when it is enlarged.
   */
  captions?: Record<string, string>;
}

/**
 * The stacked frames.
 *
 * They are layered and crossfaded rather than translated, so nothing overflows
 * and the box never moves: the first slide's declared aspect ratio fixes the
 * height up front and the rest fill it (`ratio="fill"`), which keeps the CLS
 * guarantee `AssetImage` makes everywhere else on the site.
 *
 * All frames are in the DOM from the first paint — only the lead is eager, so
 * `next/image` fetches the rest lazily — and the off-screen ones are held out
 * of the accessibility tree and out of tab order with `inert`, so nobody can
 * land inside a frame they cannot see. Only the visible frame is announced.
 *
 * The carousel is its own zoom group, so clicking a frame opens the modal on
 * every slide in the set rather than on whatever else the surrounding section
 * happens to contain. Every frame is in the DOM, `inert` or not, which is what
 * makes all of them reachable from the modal's arrows.
 */
export function CarouselFrames({
  slides,
  activeIndex,
  sizes,
  fadeMs,
  priority = false,
  captions,
}: CarouselFramesProps) {
  const [lead] = slides;
  if (!lead) return null;

  const active = slides[activeIndex];
  const caption = active ? captions?.[active.id] : undefined;

  return (
    <Box
      {...zoomGroup}
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
          inert={slideIndex !== activeIndex}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: slideIndex === activeIndex ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          <AssetImage
            asset={slide}
            sizes={sizes}
            ratio="fill"
            priority={priority && slideIndex === 0}
            zoomCaption={captions?.[slide.id]}
          />
        </Box>
      ))}

      {caption && (
        <Box
          sx={{
            position: "absolute",
            insetInline: 0,
            bottom: 0,
            px: { xs: 3, md: 4 },
            py: { xs: 2, md: 3 },
            color: "common.white",
            fontSize: "0.875rem",
            lineHeight: 1.4,
            // The caption sits over the lower sixth of the frame, which is
            // part of the button that enlarges it — without this, a tap there
            // lands on a gradient instead of opening the photograph.
            pointerEvents: "none",
            // A gradient, not a flat panel: a solid bar would cover the bottom
            // sixth of every photograph, and these frames are mostly floor.
            background: "linear-gradient(180deg, rgba(8,5,3,0) 0%, rgba(8,5,3,0.74) 100%)",
          }}
        >
          {caption}
        </Box>
      )}
    </Box>
  );
}
