import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { OUTLET_ASSET_IDS } from "@/containers/dining/constants";
import { assets } from "@/content/assets";

export interface OutletShowcaseMediaProps {
  /** Outlet id — resolves against the governed `content/assets.ts` slots. */
  outletId: string;
  /** Cartographic caption under the frame (e.g. the outlet kicker). */
  caption: string;
  sizes?: string;
}

/**
 * The outlet's room shot in the intro section — the same governed asset slot
 * the outlet cards use, in a rounded frame with a hover zoom and a
 * cartographic caption. Renders nothing when the slot is missing, so the
 * section still lays out.
 */
export function OutletShowcaseMedia({
  outletId,
  caption,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: OutletShowcaseMediaProps) {
  const asset = assets.find((item) => item.id === OUTLET_ASSET_IDS[outletId]);
  if (!asset) {
    return null;
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <MediaFrame radius="lg" hoverZoom>
        <AssetImage asset={asset} sizes={sizes} />
      </MediaFrame>
      <Text
        variant="caption"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        {caption}
      </Text>
    </Box>
  );
}
