import type { ReactNode } from "react";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface OfferMediaProps {
  asset?: AssetRef;
  sizes: string;
  /** The frame's CSS aspect ratio; cards share one so a row sits level. */
  ratio?: string | Record<string, string>;
  /**
   * Pills pinned along the bottom edge of the photo — the bottom, because the
   * placeholder's own asset label occupies the top until real photos land.
   */
  overlay?: ReactNode;
  /** `none` for a photo that runs flush to a card's clipped edge. */
  radius?: "none" | "md" | "lg" | "xl";
}

/**
 * An offer's photograph at a **uniform** ratio. The reused `content/assets`
 * slots each hold their own real ratio, which would give a grid of cards a
 * ragged top edge; this frame fixes the ratio and lets the image cover it,
 * overriding only the inner box's `aspect-ratio`. The frame is sized up
 * front, so swapping a real photo in later still cannot shift layout.
 */
export function OfferMedia({
  asset,
  sizes,
  ratio = "3 / 2",
  overlay,
  radius = "lg",
}: OfferMediaProps) {
  return (
    <MediaFrame
      radius={radius === "none" ? "sm" : radius}
      hoverZoom
      sx={{
        ...(radius === "none" && { borderRadius: 0 }),
        aspectRatio: ratio,
        bgcolor: "action.hover",
        "& > div:first-of-type": { aspectRatio: "auto", height: "100%" },
      }}
    >
      {asset && <AssetImage asset={asset} sizes={sizes} />}
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {overlay}
        </Box>
      )}
    </MediaFrame>
  );
}
