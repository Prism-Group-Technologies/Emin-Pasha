import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { formatUgx } from "@/utils/currency";

export interface PackageCardProps {
  name: string;
  tagline: string;
  fromUgx: number;
  forGuests: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * One stay package. The starting rate and the audience lead as gold-ruled
 * facts at the top — the same pattern as the homepage `OfferCard` — then the
 * name, the one-line hook, a checked list of what is arranged, and a CTA
 * pinned to the bottom edge so uneven list lengths still sit level in a row.
 *
 * The rate is always framed `from`: the package is a starting point that
 * reservations confirm, exactly as `RateBadge` frames the rate card.
 */
export function PackageCard({
  name,
  tagline,
  fromUgx,
  forGuests,
  includes,
  ctaLabel,
  ctaHref,
}: PackageCardProps) {
  return (
    <Box component="article" sx={cardSurface()}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <Text
          variant="overline"
          component="span"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 999,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontFamily: "var(--font-cartographic)",
          }}
        >
          {`from ${formatUgx(fromUgx)}`}
        </Text>
        <Text
          variant="overline"
          component="span"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
          }}
        >
          {forGuests}
        </Text>
      </Box>

      <Text variant="h3" component="h3" sx={{ mb: 2 }}>
        {name}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ mb: 4, textWrap: "pretty" }}>
        {tagline}
      </Text>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2, mb: 5 }}>
        {includes.map((item) => (
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

      <Button href={ctaHref} variant="ghost" sx={{ mt: "auto", alignSelf: "flex-start" }}>
        {ctaLabel}
      </Button>
    </Box>
  );
}
