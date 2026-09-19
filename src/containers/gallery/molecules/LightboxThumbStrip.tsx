"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { useThumbScroll } from "@/containers/gallery/hooks/useThumbScroll";
import type { GalleryItem } from "@/containers/gallery/types";
import { radiusTokens } from "@/theme/tokens";

export interface LightboxThumbStripProps {
  items: GalleryItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/**
 * A scrollable film strip of every photograph in the current filter. The
 * active frame is outlined, marked `aria-current` and kept centred by
 * `useThumbScroll`. Thumbnails are lazy `next/image`s at 96px.
 */
export function LightboxThumbStrip({ items, activeIndex, onSelect }: LightboxThumbStripProps) {
  const stripRef = useThumbScroll(activeIndex);

  return (
    <Box
      ref={stripRef}
      role="group"
      aria-label="All photographs"
      sx={{
        display: "flex",
        gap: 1.5,
        overflowX: "auto",
        py: 1,
        px: 0.5,
        scrollbarWidth: "thin",
      }}
    >
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <Box
            key={item.id}
            component="button"
            type="button"
            data-thumb={index}
            aria-label={`Show ${item.title}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(index)}
            sx={{
              flex: "0 0 auto",
              width: { xs: 64, md: 88 },
              p: 0,
              border: 0,
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: `${radiusTokens.sm}px`,
              outline: "2px solid",
              outlineColor: active ? "primary.main" : "transparent",
              outlineOffset: 2,
              opacity: active ? 1 : 0.6,
              transition: "opacity 160ms ease",
              "&:hover, &:focus-visible": { opacity: 1 },
              // The placeholder id label is unreadable at thumbnail size — hide it.
              "& div[aria-hidden]": { display: "none" },
            }}
          >
            <Box sx={{ aspectRatio: "4 / 3", position: "relative", "& > div": { height: "100%" } }}>
              <AssetImage asset={item.asset} sizes="96px" />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
