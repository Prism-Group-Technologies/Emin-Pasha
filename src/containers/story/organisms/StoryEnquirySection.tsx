import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { STAY_ANCHOR_ID } from "@/containers/story/anchors";
import { sections } from "@/containers/story/copy";
import { StoryNextSteps } from "@/containers/story/molecules/StoryNextSteps";
import { DeferredStoryEnquiryForm } from "@/containers/story/organisms/DeferredStoryEnquiryForm";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappBookingUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  {
    icon: "whatsapp",
    href: whatsappBookingUrl,
    label: "Message reservations",
    value: identity.whatsapp.display,
  },
  { icon: "phone", href: telephoneUrl, label: "Call reservations", value: identity.telephone },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: "Email reservations",
    value: identity.reservationsEmail,
  },
];

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
 * The page's on-page conversion surface: the "Stay in the story" enquiry
 * form in its own panel, beside "what happens next" and the three channels a
 * visitor might reach for instead — three because they are not
 * interchangeable in this market (a visiting executive emails, a Kampala
 * local messages, an organiser calls).
 */
export function StoryEnquirySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={STAY_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.enquiry.eyebrow}
      heading={sections.enquiry.heading}
      description={sections.enquiry.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 0.85fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Box sx={panelSx}>
          <DeferredStoryEnquiryForm />
        </Box>

        <Stack spacing={5}>
          <StoryNextSteps />
          <Stack spacing={3}>
            <Text variant="overline" component="p" color="text.secondary">
              Or reach a person directly
            </Text>
            {CHANNELS.map((channel) => (
              <ChannelCard
                key={channel.value}
                icon={channel.icon}
                href={channel.href}
                label={channel.label}
                value={channel.value}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </SectionShell>
  );
}
