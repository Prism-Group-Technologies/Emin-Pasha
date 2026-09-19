import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";
import type { HireTier } from "@/containers/spaces/copy/privateHire";
import { SeedEnquiryButton } from "@/containers/spaces/molecules/SeedEnquiryButton";

/**
 * One private-hire tier on the dark band: name, capacity, the minimum spend,
 * duration, a one-line pitch, features, and a hand-off that seeds a
 * private-hire request for this space. `color: text.primary` stops the band's
 * fixed light text from bleeding into the light card (see the transfer
 * `FleetCard`). The featured tier gets a gold outline.
 */
export function HireTierCard({ tier }: { tier: HireTier }) {
  return (
    <Box
      component="article"
      sx={[
        cardSurface(false),
        { gap: 3, height: "100%", color: "text.primary" },
        tier.featured
          ? { outline: "2px solid", outlineColor: "primary.main", outlineOffset: -2 }
          : {},
      ]}
    >
      {tier.featured && (
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          Most requested
        </Text>
      )}
      <Text variant="h5" component="h3">
        {tier.name}
      </Text>
      <Text variant="body2" color="text.secondary">
        {tier.capacity} · {tier.duration}
      </Text>
      <PriceTag amountUsd={tier.minSpendUsd} unit="minimum spend" />
      <Text variant="body2" sx={{ textWrap: "pretty" }}>
        {tier.pitch}
      </Text>
      <CheckList items={tier.features} />
      <Box sx={{ mt: "auto", pt: 2 }}>
        <SeedEnquiryButton
          label="Request a proposal"
          variant={tier.featured ? "primary" : "ghost"}
          fullWidth
          seed={{ requestType: "private-hire", space: tier.spaceId ?? "acropole-lounge" }}
        />
      </Box>
    </Box>
  );
}
