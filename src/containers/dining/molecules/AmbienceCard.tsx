import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { Ambience } from "@/containers/dining/copy";
import { assets } from "@/content/assets";

/**
 * One "where to sit" setting: a photo, a tinted icon badge, a title and a
 * line of copy — the same room, a different mood.
 */
export function AmbienceCard({ ambience }: { ambience: Ambience }) {
  const asset = assets.find((item) => item.id === ambience.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <IconBadge name={ambience.icon} />
        <Text variant="h4" component="h3">
          {ambience.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {ambience.description}
        </Text>
      </Box>
    </Box>
  );
}
