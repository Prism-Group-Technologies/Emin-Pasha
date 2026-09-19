import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { LAYOUT_LABELS, type VenueEntry, eventsAsset } from "@/containers/events/copy";

/** The three largest layouts, biggest first — the card's capacity summary. */
function topLayouts(capacities: VenueEntry["capacities"]) {
  return Object.entries(capacities)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .slice(0, 3) as [keyof typeof LAYOUT_LABELS, number][];
}

/**
 * One venue: a photo, a standout-feature chip, the name as the link to its
 * page, a one-line hook, an indicative capacity summary, and two CTAs — into
 * the venue page and down to the enquiry form — pinned to the bottom edge so
 * uneven copy sits level across the row.
 */
export function VenueCard({ venue }: { venue: VenueEntry }) {
  const asset = eventsAsset(venue.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Chip label={venue.feature} size="small" sx={{ alignSelf: "flex-start" }} />

        <Text variant="h3" component="h3">
          {venue.href ? (
            <Link href={venue.href} underline="hover" color="textPrimary">
              {venue.name}
            </Link>
          ) : (
            venue.name
          )}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {venue.blurb}
        </Text>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
          {topLayouts(venue.capacities).map(([key, value]) => (
            <Box key={key}>
              <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                {value}
              </Text>
              <Text variant="caption" component="p" color="text.secondary">
                {LAYOUT_LABELS[key]}
              </Text>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Button href={`#${ENQUIRE_ANCHOR_ID}`} variant="ghost" size="small">
            Add to enquiry
          </Button>
          {venue.href && (
            <Button
              href={venue.href}
              variant="link"
              size="small"
              endIcon={<Icon name="arrow-forward" fontSize="small" />}
            >
              View venue
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
