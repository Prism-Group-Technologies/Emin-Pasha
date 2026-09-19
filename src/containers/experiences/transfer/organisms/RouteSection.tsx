import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { transferAsset } from "@/containers/experiences/transfer/copy/media";
import { routeStops, routeTips, travelWindows } from "@/containers/experiences/transfer/copy/route";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { RouteTimeline } from "@/containers/experiences/transfer/molecules/RouteTimeline";
import { TravelWindows } from "@/containers/experiences/transfer/molecules/TravelWindows";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const { route } = transferSections;
const asset = transferAsset("transfer-route-map");

/**
 * The route band: a map slot on one side; journey time by time of day and
 * the stop-by-stop timeline on the other, then three planning tips
 * (departures, late landings, knowing your chauffeur) in a full-width row.
 */
export function RouteSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={route.eyebrow}
      heading={route.heading}
      description={route.description}
      variant={variant}
    >
      <Stack spacing={{ xs: 7, md: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 0.85fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={5}>
            {asset && (
              <Reveal direction={oppositeOf(motion)} media>
                <MediaFrame>
                  <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 55vw" />
                </MediaFrame>
              </Reveal>
            )}
          </Stack>
          <Stack spacing={3}>
            <Text variant="overline" component="p" color="text.secondary">
              How long it takes
            </Text>
            <TravelWindows windows={travelWindows} />
            <Box sx={{ pt: 4 }}>
              <RouteTimeline stops={routeStops} />
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, md: 6 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          {routeTips.map((tip) => (
            <Box
              key={tip.title}
              sx={{
                display: "flex",
                gap: 3,
                pt: 4,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <IconBadge name={tip.icon} size={44} />
              <Box sx={{ display: "grid", gap: 1 }}>
                <Text variant="subtitle2" component="h3">
                  {tip.title}
                </Text>
                <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                  {tip.detail}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>
    </SectionShell>
  );
}
