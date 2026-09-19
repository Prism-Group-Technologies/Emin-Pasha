"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { MosaicCell } from "@/containers/accommodation/roomMosaic";
import type { AssetRef } from "@/schemas/content/assetRef";
import { easingTokens, motionTokens, radiusTokens } from "@/theme/tokens";

export interface RoomGalleryTileProps {
  asset: AssetRef;
  cell: MosaicCell;
  index: number;
  onOpen: (index: number) => void;
  /** Photographs past the mosaic, shown as a "+N" veil on the closing tile. */
  remaining: number;
}

/**
 * One photograph in the mosaic, as a real `<button>`.
 *
 * A button rather than a div with a click handler: this is the only way in to
 * the lightbox, so it has to be tabbable, operable with Enter and Space, and
 * announced as something you can activate. The accessible name is the asset's
 * own `altText` plus its position, because "Superior Room" four times over
 * tells a screen-reader user nothing about which one they are on.
 *
 * `MediaFrame` is deliberately not reused here — its radius and hover zoom
 * belong to the element that receives focus, and nesting a frame inside the
 * button would put the focus ring on a rectangle that is not the photograph.
 */
export function RoomGalleryTile({ asset, cell, index, onOpen, remaining }: RoomGalleryTileProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${asset.altText} — photograph ${index + 1}. Open larger view.`}
      sx={{
        gridColumn: { xs: cell.mobileColumn, md: cell.column },
        gridRow: { md: cell.row },
        aspectRatio: { xs: "3 / 2", md: "auto" },
        position: "relative",
        overflow: "hidden",
        p: 0,
        border: 0,
        cursor: "pointer",
        borderRadius: `${radiusTokens.md}px`,
        bgcolor: "action.hover",
        "& img": { transition: `transform ${motionTokens.imageZoom}ms ${easingTokens.emin}` },
        "&:hover img, &:focus-visible img": { transform: "scale(1.045)" },
        "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
        "@media (prefers-reduced-motion: reduce)": {
          "& img": { transition: "none" },
          "&:hover img, &:focus-visible img": { transform: "none" },
        },
      }}
    >
      <AssetImage
        asset={asset}
        ratio="fill"
        priority={index === 0}
        sizes={
          index === 0
            ? "(max-width: 900px) 100vw, (max-width: 1280px) 66vw, 850px"
            : "(max-width: 900px) 50vw, 33vw"
        }
      />
      {remaining > 0 && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(11,11,10,0.55)",
          }}
        >
          <Text variant="h3" component="span" sx={{ color: "common.white" }}>
            {`+${remaining}`}
          </Text>
        </Box>
      )}
    </Box>
  );
}
