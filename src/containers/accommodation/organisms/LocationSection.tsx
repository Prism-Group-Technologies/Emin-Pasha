import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { CROSS_SELL_HREFS } from "@/containers/accommodation/constants";
import { locationSection } from "@/containers/accommodation/copy";
import { RoomStat } from "@/containers/accommodation/molecules/RoomStat";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { identity } from "@/content/identity";
import { site } from "@/content/site";
import { directionsUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens } from "@/theme/tokens";

const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 0.85fr)" },
  gap: { xs: 6, md: 8 },
  alignItems: "start",
} as const;

/** The address, the two times guests scroll back for, and a directions hand-off. */
function VisitPanel() {
  return (
    <Box
      sx={{
        p: { xs: 5, md: 6 },
        display: "grid",
        gap: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
      }}
    >
      <IconBadge name="location" tone="garden" />
      <Text variant="h4" component="p" sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}>
        {identity.address}
      </Text>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 4,
          pt: 4,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <RoomStat value={identity.checkInTime} label="Check-in from" />
        <RoomStat value={identity.checkOutTime} label="Check-out by" />
      </Box>
      <Button href={directionsUrl} variant="ghost" sx={{ justifySelf: "start" }}>
        {locationSection.directionsHeading}
      </Button>
    </Box>
  );
}

/**
 * The address as the other half of the offer: the Nakasero positioning from
 * `content/site.ts` beside a "plan your visit" panel, then the cross-sell
 * into the spa, dining and offers.
 */
export function LocationSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={locationSection.eyebrow}
      heading={identity.neighbourhood}
      topRule
    >
      <Reveal direction={motion}>
        <Box sx={{ display: "grid", gap: { xs: 8, md: 9 } }}>
          <Box sx={gridSx}>
            <Stack spacing={5} sx={{ maxWidth: "60ch" }}>
              <Text variant="subtitle1" sx={{ textWrap: "pretty" }}>
                {locationSection.descriptionLead}
              </Text>
              <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {site.setting.whySells}
              </Text>
            </Stack>
            <VisitPanel />
          </Box>

          <Box sx={{ pt: 5, borderTop: "1px solid", borderColor: "divider" }}>
            <Text variant="overline" component="h3" sx={{ mb: 4, color: "text.secondary" }}>
              While you are here
            </Text>
            <RelatedLinks hrefs={CROSS_SELL_HREFS} />
          </Box>
        </Box>
      </Reveal>
    </SectionShell>
  );
}
