import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { spacesAsset } from "@/containers/spaces/copy/media";
import type { Moment } from "@/containers/spaces/copy/moments";
import { colorTokens, radiusTokens } from "@/theme/tokens";

/**
 * One occasion on the bento grid: the photo fills the tile and a bottom scrim
 * carries the title. The scrim is fixed ink in both colour schemes — it sits
 * on a photograph, not on the page ground — so its light type always passes.
 */
export function MomentTile({ moment }: { moment: Moment }) {
  const asset = spacesAsset(moment.assetId);

  return (
    <Box
      component="article"
      sx={{
        position: "relative",
        height: "100%",
        minHeight: { xs: 260, md: moment.lead ? 560 : 270 },
        borderRadius: `${radiusTokens.lg}px`,
        overflow: "hidden",
        "& > div:first-of-type": {
          position: "absolute",
          inset: 0,
          aspectRatio: "auto",
          height: "100%",
        },
      }}
    >
      {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 40vw" />}
      <Box
        sx={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          p: { xs: 4, md: 5 },
          display: "grid",
          gap: 1,
          backgroundImage: `linear-gradient(180deg, transparent 0%, ${colorTokens.ink[900]}E6 70%)`,
          color: colorTokens.ink.contrastCopy,
        }}
      >
        <Text variant="overline" component="p" sx={{ color: colorTokens.gold[300] }}>
          {moment.where}
        </Text>
        <Text variant={moment.lead ? "h3" : "h5"} component="h3" sx={{ color: "inherit" }}>
          {moment.title}
        </Text>
        <Text variant="body2" sx={{ color: colorTokens.ink.contrastMuted, textWrap: "pretty" }}>
          {moment.detail}
        </Text>
      </Box>
    </Box>
  );
}
