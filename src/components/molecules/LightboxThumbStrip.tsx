"use client";

import { Box } from "@/components/atoms/Box";
import { Image } from "@/components/atoms/Image";
import { useThumbScroll } from "@/hooks/useThumbScroll";
import { radiusTokens } from "@/theme/tokens";
import type { ZoomImage } from "@/types/imageZoom";

/**
 * Below four frames a film strip weighs more than the photograph above it —
 * two thumbnails read as a mistake rather than as a way to jump. Arrows,
 * swipe and the counter still reach every frame, so nothing is unreachable.
 * Exported so the three lightboxes draw the line in the same place.
 */
export const THUMB_STRIP_MIN = 4;

export interface LightboxThumbStripProps {
  images: ZoomImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const thumbSx = {
  flex: "0 0 auto",
  width: { xs: 64, md: 88 },
  p: 0,
  border: 0,
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: `${radiusTokens.sm}px`,
  outline: "2px solid",
  outlineOffset: 2,
  transition: "opacity 160ms ease",
  "&:hover, &:focus-visible": { opacity: 1 },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
} as const;

/**
 * A scrollable film strip of every photograph in the set. The active frame is
 * outlined, marked `aria-current` and kept centred by `useThumbScroll`.
 * Thumbnails are lazy `next/image`s at 96px, cropped square-ish so a mixed
 * set of portraits and landscapes still reads as an even row.
 */
export function LightboxThumbStrip({ images, activeIndex, onSelect }: LightboxThumbStripProps) {
  const stripRef = useThumbScroll(activeIndex);

  return (
    <Box
      ref={stripRef}
      role="group"
      aria-label="All photographs"
      sx={{ display: "flex", gap: 1.5, overflowX: "auto", py: 1, px: 0.5, scrollbarWidth: "thin" }}
    >
      {images.map((image, index) => {
        const active = index === activeIndex;
        return (
          <Box
            key={image.id}
            component="button"
            type="button"
            data-thumb={index}
            aria-label={`Show ${image.caption}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(index)}
            sx={{
              ...thumbSx,
              outlineColor: active ? "primary.main" : "transparent",
              opacity: active ? 1 : 0.6,
            }}
          >
            <Box sx={{ aspectRatio: "4 / 3", position: "relative", bgcolor: "action.hover" }}>
              <Image src={image.src} alt="" fill sizes="96px" style={{ objectFit: "cover" }} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
