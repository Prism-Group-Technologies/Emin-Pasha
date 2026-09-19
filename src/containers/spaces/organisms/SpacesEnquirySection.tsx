import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { RESERVE_ANCHOR_ID } from "@/containers/spaces/anchors";
import { loungeChannels } from "@/containers/spaces/channels";
import { sections } from "@/containers/spaces/copy/sections";
import { SpacesNextSteps } from "@/containers/spaces/molecules/SpacesNextSteps";
import { DeferredSpacesEnquiryForm } from "@/containers/spaces/organisms/DeferredSpacesEnquiryForm";
import { spaces } from "@/content/spaces";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const SPACE_OPTIONS = spaces.map((space) => ({ value: space.id, label: space.name }));

const panelSx = {
  p: { xs: 4, md: 6 },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.lg}px`,
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  bgcolor: "background.default",
  boxShadow: shadowTokens.sm,
} as const;

/**
 * The page's primary conversion surface (`#reserve`): the reservation form in
 * its own panel, beside "what happens next" and the three direct lines.
 */
export function SpacesEnquirySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={RESERVE_ANCHOR_ID}
      motion={motion}
      variant="raised"
      eyebrow={sections.reserve.eyebrow}
      heading={sections.reserve.heading}
      description={sections.reserve.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 0.8fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Box sx={panelSx}>
          <DeferredSpacesEnquiryForm spaceOptions={SPACE_OPTIONS} />
        </Box>
        <Stack spacing={5}>
          <SpacesNextSteps />
          <Stack spacing={3}>
            <Text variant="overline" component="p" color="text.secondary">
              Or reach a person directly
            </Text>
            {loungeChannels.map((channel) => (
              <ChannelCard key={channel.value} {...channel} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </SectionShell>
  );
}
