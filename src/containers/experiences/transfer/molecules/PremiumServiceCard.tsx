import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { PremiumService } from "@/containers/experiences/transfer/copy/inclusions";
import { transferAsset } from "@/containers/experiences/transfer/copy/media";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import { PreselectButton } from "@/containers/experiences/transfer/molecules/PreselectButton";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";

/**
 * One upgrade — VIP meet & assist or chauffeur by the hour — as a wide card:
 * photo on top, an eyebrow, the pitch, four
 * inclusions, the indicative price and a button that pre-selects the matching
 * service in the booking form.
 */
export function PremiumServiceCard({ item }: { item: PremiumService }) {
  const asset = transferAsset(item.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 1200px) 100vw, 50vw" />
        </MediaFrame>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          {item.eyebrow}
        </Text>
        <Text variant="h4" component="h3">
          {item.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {item.description}
        </Text>
        <CheckList items={item.includes} />
        <Box
          sx={{
            mt: "auto",
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "grid",
            gap: 3,
          }}
        >
          <PriceTag amountUsd={item.priceFrom} unit={item.priceUnit} />
          <Box sx={{ justifySelf: "start" }}>
            <PreselectButton label={item.ctaLabel} preselect="service" value={item.service} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
