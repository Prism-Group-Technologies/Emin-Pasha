import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { WellnessPillar } from "@/containers/wellness/copy";
import { wellnessAsset } from "@/containers/wellness/copy";

/**
 * One facility as a pillar card: a photo, a tinted icon badge over the
 * kicker, the name as the link to its page, a tagline, two sentences and a
 * checked list of draws — with the CTA pinned to the bottom edge so uneven
 * copy lengths sit level across the row of three.
 */
export function PillarCard({ pillar }: { pillar: WellnessPillar }) {
  const asset = wellnessAsset(pillar.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconBadge name={pillar.icon} size={40} />
          <Text variant="overline" component="p" color="text.secondary">
            {pillar.kicker}
          </Text>
        </Box>

        <Text variant="h3" component="h3">
          <Link href={pillar.href} underline="hover" color="textPrimary">
            {pillar.name}
          </Link>
        </Text>
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          {pillar.tagline}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {pillar.blurb}
        </Text>

        <Box
          component="ul"
          sx={{ listStyle: "none", m: 0, p: 0, mt: 1, display: "grid", gap: 1.5 }}
        >
          {pillar.points.map((point) => (
            <Box key={point} component="li" sx={{ display: "flex", gap: 1.5 }}>
              <Icon
                name="check-circle"
                aria-hidden
                fontSize="small"
                sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
              />
              <Text variant="body2" color="text.secondary">
                {point}
              </Text>
            </Box>
          ))}
        </Box>

        <Button
          href={pillar.href}
          variant="ghost"
          sx={{ mt: "auto", alignSelf: "flex-start" }}
          endIcon={<Icon name="arrow-forward" fontSize="small" />}
        >
          Explore {pillar.tagline.toLowerCase()}
        </Button>
      </Box>
    </Box>
  );
}
