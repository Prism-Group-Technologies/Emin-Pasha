import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { MembershipTier } from "@/containers/wellness/copy";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { colorTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

/**
 * One gym membership tier: name, an indicative price with its cadence, a
 * one-line "best for", a checked list of perks, and the WhatsApp CTA on the
 * bottom edge. The featured tier gets a warm tint and a "Most popular" flag —
 * theme-aware `rgba` on gold, the same treatment the accommodation
 * comparison row uses.
 */
export function MembershipTierCard({ tier }: { tier: MembershipTier }) {
  return (
    <Box
      component="article"
      sx={[
        cardSurface(),
        tier.featured
          ? { bgcolor: "rgba(196,168,50,0.10)", borderTopColor: colorTokens.gold[700] }
          : {},
      ]}
    >
      <Box
        sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2 }}
      >
        <Text variant="h4" component="h3">
          {tier.name}
        </Text>
        {tier.featured && (
          <Text variant="overline" component="span" sx={{ color: "primary.main" }}>
            Most popular
          </Text>
        )}
      </Box>

      <Text component="p" sx={{ mt: 2, fontFamily: "var(--font-display)", fontSize: "1.75rem" }}>
        {formatUgx(tier.priceUgx)}{" "}
        <Text component="span" variant="body2" color="text.secondary">
          {tier.cadence}
        </Text>
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        {tier.bestFor}
      </Text>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2, mb: 5 }}>
        {tier.perks.map((perk) => (
          <Box key={perk} component="li" sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {perk}
            </Text>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <WhatsAppCta
          label="Join or ask about this tier"
          variant={tier.featured ? "primary" : "ghost"}
          fullWidth
        />
      </Box>
    </Box>
  );
}
