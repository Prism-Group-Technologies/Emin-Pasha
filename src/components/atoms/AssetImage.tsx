import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Image } from "@/components/atoms/Image";
import { placeholderImageSrc } from "@/config/assets";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface AssetImageProps {
  asset: AssetRef;
  sizes: string;
  priority?: boolean;
  /**
   * `fill` drops the asset's own ratio box and stretches to the nearest
   * positioned ancestor instead — for a mosaic cell whose geometry the grid
   * decides rather than the photograph.
   *
   * The CLS guarantee moves with it: the ancestor must reserve a
   * deterministic height of its own (`roomMosaic` does this by fixing the
   * whole block's aspect ratio up front). Default stays `asset`, so every
   * existing call site is unchanged.
   */
  ratio?: "asset" | "fill";
}

/**
 * Renders a content asset.
 *
 * A slot with a photograph assigned in `@/content/photoAssignments` renders
 * it through `next/image`, which resizes and re-encodes per request and uses
 * the bundler's blur placeholder while the bytes arrive. A slot without one
 * still shows the shared stand-in overlaid with its own asset id and required
 * dimensions — the "named, dimension-labelled placeholder" CLAUDE.md §6.6
 * asks for, which doubles as the shooting brief for the hotel.
 *
 * Either way the box holds the asset's declared aspect ratio, not the
 * photograph's, so a reshoot at a different crop cannot move anything on the
 * page (CLS stays at 0).
 *
 * The label is `aria-hidden`: the accessible name is the asset's real
 * `altText`, so assistive tech hears what the finished page will describe,
 * not build scaffolding. Decorative assets get no name at all.
 */
const FRAME = {
  asset: { position: "relative", width: "100%" },
  fill: { position: "absolute", inset: 0 },
} as const;

export function AssetImage({ asset, sizes, priority = false, ratio = "asset" }: AssetImageProps) {
  const { image } = asset;

  return (
    <Box
      sx={{
        ...FRAME[ratio],
        ...(ratio === "asset" && { aspectRatio: `${asset.width} / ${asset.height}` }),
        overflow: "hidden",
        bgcolor: "action.hover",
      }}
    >
      <Image
        src={image?.src ?? placeholderImageSrc}
        alt={asset.decorative ? "" : asset.altText}
        fill
        sizes={sizes}
        priority={priority}
        blurDataURL={image?.blurDataURL}
        style={{ objectFit: "cover" }}
      />
      {!image && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            px: 3,
            py: 2,
            bgcolor: "rgba(11,11,10,0.72)",
            borderBottom: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-cartographic)",
              fontSize: "0.6875rem",
              lineHeight: 1.3,
              color: "#D4BC5E",
              wordBreak: "break-word",
            }}
          >
            {`§ ${asset.id.toUpperCase()} — ${asset.width}×${asset.height}`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
