import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { circleCopy } from "@/containers/spaces/copy/circle";
import { SeedEnquiryButton } from "@/containers/spaces/molecules/SeedEnquiryButton";
import { colorTokens, radiusTokens } from "@/theme/tokens";

/**
 * The membership "card" itself — a fixed-ink panel with a gold hairline, so it
 * reads like a physical member's card in either colour scheme (ink/gold pairs
 * are the contrast-verified band palette).
 */
export function CircleInviteCard() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        p: { xs: 5, md: 6 },
        borderRadius: `${radiusTokens.lg}px`,
        backgroundImage: `linear-gradient(135deg, ${colorTokens.ink[900]} 0%, ${colorTokens.ink[800]} 100%)`,
        border: "1px solid",
        borderColor: colorTokens.gold[700],
        color: colorTokens.ink.contrastCopy,
      }}
    >
      <Icon name="diamond" aria-hidden sx={{ color: colorTokens.gold[300], fontSize: 36 }} />
      <Text
        variant="overline"
        component="p"
        sx={{ color: colorTokens.gold[300], letterSpacing: "0.2em" }}
      >
        The Lounge Circle
      </Text>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          lineHeight: 1.1,
          color: "inherit",
        }}
      >
        {circleCopy.price}
      </Text>
      <Text variant="body2" sx={{ color: colorTokens.ink.contrastMuted }}>
        {circleCopy.qualifier}
      </Text>
      <SeedEnquiryButton
        label={circleCopy.ctaLabel}
        fullWidth
        seed={{ requestType: "circle", space: "any" }}
      />
      <Text variant="caption" sx={{ color: colorTokens.ink.contrastMuted }}>
        {circleCopy.footnote}
      </Text>
    </Box>
  );
}
