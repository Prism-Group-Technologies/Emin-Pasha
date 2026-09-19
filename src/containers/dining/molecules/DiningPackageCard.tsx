import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { DiningPackage } from "@/containers/dining/copy";

/**
 * One private-dining offering: a party-size badge, the name, a one-line hook,
 * a checked list of what is arranged, and a CTA pinned to the bottom edge so
 * uneven list lengths sit level across a row.
 *
 * No price — group menus and minimum spends are confirmed with the desk (see
 * `copy/packages.ts`), so asserting a rate here would be an invented fact.
 */
export function DiningPackageCard({ pkg }: { pkg: DiningPackage }) {
  return (
    <Box component="article" sx={cardSurface()}>
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

      <Button href={pkg.ctaHref} variant="ghost" sx={{ mt: "auto", alignSelf: "flex-start" }}>
        {pkg.ctaLabel}
      </Button>
    </Box>
  );
}
