"use client";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { useCarousel } from "@/hooks/useCarousel";

export interface CarouselProps {
  items: { id: string; content: ReactNode }[];
  "aria-label": string;
}

/**
 * An accessible, swipeable carousel — CSS `scroll-snap` (native touch swipe,
 * no library), Prev/Next buttons, and Left/Right arrow-key support via
 * `useCarousel`. No MUI equivalent exists, so this is fully custom.
 */
export function Carousel({ items, "aria-label": ariaLabel }: CarouselProps) {
  const { containerRef, scrollBy, handleKeyDown } = useCarousel(items.length);

  return (
    <Box role="region" aria-label={ariaLabel} sx={{ position: "relative" }}>
      <Box
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: 2,
          "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main" },
        }}
      >
        {items.map((item) => (
          <Box key={item.id} sx={{ scrollSnapAlign: "start", flexShrink: 0 }}>
            {item.content}
          </Box>
        ))}
      </Box>
      <IconButton
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
        sx={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
      >
        <Icon name="chevron-left" />
      </IconButton>
      <IconButton
        aria-label="Next"
        onClick={() => scrollBy(1)}
        sx={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
      >
        <Icon name="chevron-right" />
      </IconButton>
    </Box>
  );
}
