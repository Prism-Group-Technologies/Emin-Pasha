import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { Treatment } from "@/containers/wellness/copy";
import { wellnessAsset } from "@/containers/wellness/copy";
import { formatUgx } from "@/utils/currency";

const FACILITY_LABEL: Record<Treatment["facility"], string> = {
  spa: "Spa",
  gym: "Gym",
  pool: "Pool",
};

/**
 * One signature treatment as a card: an optional plated-style hero photo with
 * its facility pinned over it, then the name, one line of copy, and a
 * hairline-separated footer with the duration and an indicative price.
 *
 * Built on the shared `cardSurface()` so a mixed grid still reads as a grid
 * when copy lengths differ. The price carries the cartographic face and a
 * "from" / "per person" qualifier where the copy sets one.
 */
export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const asset = wellnessAsset(treatment.assetId);

  return (
    <Box
      component="article"
      sx={[cardSurface(), { p: 0, overflow: "hidden", scrollMarginTop: 120 }]}
    >
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage
            asset={asset}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
          <Chip
            label={FACILITY_LABEL[treatment.facility]}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "background.default",
              color: "text.primary",
              fontFamily: "var(--font-cartographic)",
            }}
          />
        </MediaFrame>
      )}

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: { xs: 4, md: 5 }, flex: 1 }}
      >
        {!asset && (
          <Text variant="overline" component="p" color="text.secondary">
            {FACILITY_LABEL[treatment.facility]}
          </Text>
        )}
        <Text variant="h4" component="h3">
          {treatment.name}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {treatment.description}
        </Text>

        <Box
          sx={{
            mt: "auto",
            pt: 3,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Text variant="overline" component="span" color="text.secondary">
            {treatment.duration}
          </Text>
          <Text
            component="span"
            sx={{ fontFamily: "var(--font-cartographic)", color: "text.primary" }}
          >
            {treatment.priceQualifier === "from" && "from "}
            {formatUgx(treatment.priceUgx)}
            {treatment.priceQualifier === "per person" && " pp"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
