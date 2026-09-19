import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { LensTile } from "@/containers/gallery/copy/lens";
import { fillImageSx, photoMutedSx, photoScrimSx } from "@/containers/gallery/styles";
import type { AssetRef } from "@/schemas/content/assetRef";
import { radiusTokens } from "@/theme/tokens";

/**
 * One guest frame on the #EminPashaMoments wall: a square photograph with the
 * moment and a placeholder handle on a bottom scrim. Not interactive — the
 * wall is social proof, and the share card beside it carries the action.
 */
export function LensTileCard({ tile, asset }: { tile: LensTile; asset: AssetRef | undefined }) {
  return (
    <Box
      component="figure"
      sx={{
        ...fillImageSx,
        m: 0,
        position: "relative",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        borderRadius: `${radiusTokens.md}px`,
        bgcolor: "action.hover",
      }}
    >
      {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 50vw, 18vw" />}
      <Box component="figcaption" sx={{ ...photoScrimSx, p: 2, pt: 5 }}>
        <Text
          variant="body2"
          component="span"
          sx={{
            color: "inherit",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Icon name="instagram" sx={{ fontSize: 16 }} />
          {tile.moment}
        </Text>
        <Text variant="caption" component="span" sx={photoMutedSx}>
          {tile.handle}
        </Text>
      </Box>
    </Box>
  );
}
