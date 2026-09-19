import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { Vehicle } from "@/containers/experiences/transfer/copy/fleet";
import { transferAsset } from "@/containers/experiences/transfer/copy/media";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import { PreselectButton } from "@/containers/experiences/transfer/molecules/PreselectButton";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";

function Spec({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
      <Icon name={icon} fontSize="small" aria-hidden />
      <Text variant="body2" component="span" sx={{ color: "inherit" }}>
        {label}
      </Text>
    </Box>
  );
}

/**
 * One class of car: a photo slot with an optional badge, the class and model,
 * seats / cases / hourly rate as an icon spec row, three features, the
 * indicative one-way fare, and a "choose this car" button that lands on the
 * booking form with this vehicle pre-selected.
 *
 * `color: text.primary` is set on the card itself: it sits on the dark
 * `contrast` band, whose fixed light text colour would otherwise be
 * inherited by every un-coloured line inside a light card.
 */
export function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const asset = transferAsset(vehicle.assetId);

  return (
    <Box
      component="article"
      sx={[cardSurface(false), { p: 0, overflow: "hidden", color: "text.primary" }]}
    >
      <Box sx={{ position: "relative" }}>
        {asset && (
          <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
            <AssetImage
              asset={asset}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </MediaFrame>
        )}
        {vehicle.badge && (
          <Text
            component="span"
            variant="overline"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              px: 2,
              py: 0.5,
              borderRadius: 999,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {vehicle.badge}
          </Text>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Box>
          <Text variant="h5" component="h3">
            {vehicle.className}
          </Text>
          <Text variant="body2" color="text.secondary">
            {vehicle.model}
          </Text>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1 }}>
          <Spec icon="groups" label={`${vehicle.seats} seats`} />
          <Spec icon="luggage" label={`${vehicle.bags} cases`} />
          <Spec icon="schedule" label={`${formatUsd(vehicle.hourlyUsd)}/h`} />
        </Box>
        <Text variant="body2" sx={{ textWrap: "pretty" }}>
          {vehicle.tagline}
        </Text>
        <CheckList items={vehicle.features} />
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
          <PriceTag amountUsd={vehicle.transferUsd} unit="one way" />
          <PreselectButton
            label="Choose this car"
            preselect="vehicle"
            value={vehicle.id}
            variant="ghost"
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
}
