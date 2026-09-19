import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { sections } from "@/containers/events/copy";
import { RfpNextSteps } from "@/containers/events/molecules/RfpNextSteps";
import { DeferredRfpForm } from "@/containers/events/organisms/DeferredRfpForm";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappEventsUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  {
    icon: "whatsapp",
    href: whatsappEventsUrl,
    label: "Message the events team",
    value: identity.whatsapp.display,
  },
  { icon: "phone", href: telephoneUrl, label: "Call the events desk", value: identity.telephone },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: "Email the events desk",
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
 * The page's on-page conversion surface: the multi-step RFP form in its own
 * panel, beside "what happens next" and the three channels an organiser might
 * reach for instead. Mirrors `wellness/organisms/WellnessEnquirySection`;
 * the form itself is unchanged (`useRfpForm` / `DeferredRfpForm`).
 */
export function RfpSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={ENQUIRE_ANCHOR_ID}
      motion={motion}
      variant="raised"
      eyebrow={sections.rfp.eyebrow}
      heading={sections.rfp.heading}
      description={sections.rfp.description}
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
          <DeferredRfpForm />
        </Box>

        <Stack spacing={5}>
          <RfpNextSteps />
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
