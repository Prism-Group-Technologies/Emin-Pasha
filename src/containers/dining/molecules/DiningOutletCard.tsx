import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Link } from "@/components/atoms/Link";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { OUTLET_ASSET_IDS } from "@/containers/dining/constants";
import { assets } from "@/content/assets";

export interface DiningOutletCardProps {
  id: string;
  name: string;
  description: string;
  /** "All-day restaurant & bar", "Fine dining"… — the card's type chip. */
  kicker: string;
  /** One-line cuisine framing from `copy/outlets.ts`. */
  cuisine?: string;
  /** Where the title and the "Explore" action point. */
  href: string;
  /** When set, the card shows a "Reserve" action pointing here. */
  reserveHref?: string;
}

/**
 * One outlet as a card for the Dining pages: a rounded media frame with the
 * type chip pinned over it, then the name, the approved §5 description, a
 * cuisine line, and up to two actions. Built on the shared `cardSurface()` so
 * uneven copy lengths still read as a grid.
 *
 * Separate from `dining/molecules/OutletCard` — that one is the flat,
 * imagery-optional card the Lounges & Spaces and Spa hub pages share, and
 * they must not inherit this richer layout.
 */
export function DiningOutletCard({
  id,
  name,
  description,
  kicker,
  cuisine,
  href,
  reserveHref,
}: DiningOutletCardProps) {
  const asset = assets.find((item) => item.id === OUTLET_ASSET_IDS[id]);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />
          <Chip
            label={kicker}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "background.default",
              fontFamily: "var(--font-cartographic)",
            }}
          />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text variant="h3" component="h3">
          <Link href={href} underline="hover" color="textPrimary">
            {name}
          </Link>
        </Text>
        {cuisine && (
          <Text variant="overline" component="p" color="text.secondary">
            {cuisine}
          </Text>
        )}
        <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {description}
        </Text>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: "auto", pt: 3 }}>
          {reserveHref && (
            <Button href={reserveHref} size="small">
              Reserve
            </Button>
          )}
          <Button href={href} variant="ghost" size="small">
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
