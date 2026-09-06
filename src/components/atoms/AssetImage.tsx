import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Image } from "@/components/atoms/Image";
import { placeholderImageSrc } from "@/config/assets";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface AssetImageProps {
  asset: AssetRef;
  sizes: string;
  priority?: boolean;
}

/**
 * Renders a content asset. Until its master is delivered (TODO(EMIN-Q43)
 * video, TODO(EMIN-Q44) photography) the slot shows the shared placeholder
 * artwork, overlaid with this slot's own asset id and required dimensions —
 * the "named, dimension-labelled placeholder" CLAUDE.md §6.6 asks for, which
 * doubles as the shooting brief for the hotel.
 *
 * Either way the box holds the asset's exact aspect ratio, so swapping the
 * real file in later cannot move anything on the page (CLS stays at 0).
 *
 * The label is `aria-hidden`: the accessible name is the asset's real
 * `altText`, so assistive tech hears what the finished page will describe,
 * not build scaffolding. Decorative assets get no name at all.
 */
export function AssetImage({ asset, sizes, priority = false }: AssetImageProps) {
  const delivered = asset.status === "delivered" && Boolean(asset.filename);
  const src = delivered && asset.filename ? asset.filename : placeholderImageSrc;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: `${asset.width} / ${asset.height}`,
        overflow: "hidden",
        bgcolor: "action.hover",
      }}
    >
      <Image
        src={src}
        alt={asset.decorative ? "" : asset.altText}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
      {!delivered && (
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
