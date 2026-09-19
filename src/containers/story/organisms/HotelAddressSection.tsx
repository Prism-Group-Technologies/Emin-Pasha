import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { MapEmbed } from "@/containers/home/molecules/MapEmbed";
import { theHotelPageCopy } from "@/containers/story/copy";
import { assets } from "@/content/assets";
import { identity } from "@/content/identity";
import { shell } from "@/content/shell";
import { directionsUrl } from "@/lib/directions";
import { type RevealDirection, oppositeOf } from "@/theme/motion";
import { radiusTokens } from "@/theme/tokens";

const { location } = theHotelPageCopy;

const mapAsset = assets.find((asset) => asset.id === "contact-static-map");

/** Google's documented embed form, keyed on the approved NAP address — no
 *  coordinate pin (EMIN-Q20), the same construction the home `LocationBlock`
 *  uses. */
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(identity.address)}&output=embed`;

/**
 * The left column: the positioning prose and the crawlable NAP gathered into a
 * single bordered panel that fills the row.
 *
 * The previous version stacked a short paragraph, a two-row list and a button
 * with `alignItems: start`, so the column ran out of content at roughly half
 * the map's height and left a dead cream half. Folding the same elements into
 * one `height: 100%` surface — icon, prose, a hairline-ruled NAP block, then a
 * bottom-anchored action row — gives the column a definite edge that meets the
 * map's, with no invented copy to pad it: `location.body`,
 * `identity.address` and `identity.neighbourhood` are the exact strings the
 * old layout used.
 */
function VisitPanel() {
  return (
    <Stack
      spacing={5}
      sx={{
        height: "100%",
        p: { xs: 5, md: 6 },
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
      }}
    >
      <IconBadge name="location" tone="garden" />

      <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {location.body}
      </Text>

      <Box
        component="dl"
        sx={{
          m: 0,
          mt: "auto",
          pt: 4,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "auto 1fr" },
          columnGap: 4,
          rowGap: 1.5,
        }}
      >
        <Text component="dt" variant="overline" color="text.secondary">
          Address
        </Text>
        <Text component="dd" variant="body2" sx={{ m: 0 }}>
          {identity.address}
        </Text>
        <Text component="dt" variant="overline" color="text.secondary">
          Neighbourhood
        </Text>
        <Text component="dd" variant="body2" sx={{ m: 0 }}>
          {identity.neighbourhood}
        </Text>
      </Box>

      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", alignItems: "center", rowGap: 2 }}>
        <Button href={directionsUrl} variant="ghost">
          {shell.stickyBar.directions}
        </Button>
        <Link href="/experiences/airport-transfer" variant="body2" underline="hover">
          Private airport transfers
        </Link>
      </Stack>
    </Stack>
  );
}

/**
 * The Nakasero location band on `/our-story/the-hotel` — two columns so the
 * page reads as an argument, not a left-aligned note with an empty right
 * half: the positioning prose and the crawlable NAP on the left, a
 * click-to-load map (nothing hits Google before the visitor asks, CLAUDE.md
 * §8) on the right.
 *
 * `alignItems: stretch` + a `fill` reveal wrapper let the left panel resolve
 * `height: 100%` against the map's height, so the two columns end level
 * instead of the left one stopping short.
 *
 * `identity.address` and `identity.neighbourhood` render verbatim from
 * `content/identity.ts` — the same strings the footer and every JSON-LD
 * builder read; the framing prose is `containers/story/copy`, labelled and
 * outside the governed layer.
 */
export function HotelAddressSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={location.eyebrow}
      heading={location.heading}
      description={location.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "stretch",
        }}
      >
        <Reveal direction={motion} fill>
          <VisitPanel />
        </Reveal>

        <Reveal index={1} direction={oppositeOf(motion)}>
          <MapEmbed
            asset={mapAsset}
            mapUrl={embedUrl}
            label={identity.address}
            loadLabel={shell.stickyBar.directions}
          />
        </Reveal>
      </Box>
    </SectionShell>
  );
}
