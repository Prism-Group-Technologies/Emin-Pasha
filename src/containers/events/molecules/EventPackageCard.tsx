import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { type EventPackage, eventsAsset } from "@/containers/events/copy";
import { formatUgx } from "@/utils/currency";

/**
 * One delegate package: a photo, a who-it-is-for badge, the name, a one-line
 * hook, a checked list of what is bundled, an indicative price, and the CTA
 * pinned to the bottom edge so uneven list lengths sit level across a row.
 * Price is flagged indicative here and in the section copy.
 */
export function EventPackageCard({ pkg }: { pkg: EventPackage }) {
  const asset = eventsAsset(`events-package-${pkg.id}`);

  return (
    <Box
      component="article"
      sx={[
        cardSurface(),
        { p: 0, overflow: "hidden" },
        pkg.featured ? { borderColor: "primary.main" } : false,
      ]}
    >
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", p: { xs: 4, md: 5 }, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Chip label={pkg.forWhom} size="small" />
          {pkg.featured && <Chip label="Most booked" size="small" color="primary" />}
        </Box>

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
              {pkg.unit} · indicative
            </Text>
          </Text>
          <Button href={pkg.ctaHref} sx={{ alignSelf: "flex-start" }}>
            {pkg.ctaLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
