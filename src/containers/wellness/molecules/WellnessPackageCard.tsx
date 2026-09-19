import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { WellnessPackage } from "@/containers/wellness/copy";
import { wellnessAsset } from "@/containers/wellness/copy";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { formatUgx } from "@/utils/currency";

/**
 * One wellness package: a photo, a who-it-is-for badge, the name, a one-line
 * hook, a checked list of what is arranged, an indicative price, and the
 * WhatsApp CTA pinned to the bottom edge so uneven list lengths sit level
 * across the row. Price is flagged indicative in the section copy.
 */
export function WellnessPackageCard({ pkg }: { pkg: WellnessPackage }) {
  const asset = wellnessAsset(pkg.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text
          variant="overline"
          component="span"
          sx={{
            alignSelf: "flex-start",
            px: 3,
            py: 1,
            mb: 4,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
            fontFamily: "var(--font-cartographic)",
          }}
        >
          {pkg.forWhom}
        </Text>

        <Text variant="h3" component="h3" sx={{ mb: 2 }}>
          {pkg.title}
        </Text>
        <Text variant="body1" color="text.secondary" sx={{ mb: 4, textWrap: "pretty" }}>
          {pkg.description}
        </Text>

        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2, mb: 5 }}>
          {pkg.includes.map((item) => (
            <Box key={item} component="li" sx={{ display: "flex", gap: 2 }}>
              <Icon
                name="check-circle"
                aria-hidden
                fontSize="small"
                sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
              />
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {item}
              </Text>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", display: "grid", gap: 3 }}>
          <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
            {formatUgx(pkg.priceUgx)}{" "}
            <Text component="span" variant="body2" color="text.secondary">
              {pkg.priceUnit} · indicative
            </Text>
          </Text>
          <WhatsAppCta label="Book this package" variant="ghost" />
        </Box>
      </Box>
    </Box>
  );
}
