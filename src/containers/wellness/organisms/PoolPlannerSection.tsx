import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { EnquiryNextSteps } from "@/containers/wellness/molecules/EnquiryNextSteps";
import { DeferredPoolPlannerForm } from "@/containers/wellness/organisms/DeferredPoolPlannerForm";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappWellnessUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const { planner } = poolSections;

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  {
    icon: "whatsapp",
    href: whatsappWellnessUrl,
    label: "Message the wellness desk",
    value: identity.whatsapp.display,
  },
  { icon: "phone", href: telephoneUrl, label: "Call the wellness desk", value: identity.telephone },
  {
    icon: "mail",
    href: `mailto:${identity.email}`,
    label: "Email the wellness desk",
    value: identity.email,
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
 * The pool's on-page conversion surface: the visit planner in its own panel,
 * with "what happens next" and the three channels a visitor might reach for
 * instead below it. Replaces the generic `WellnessEnquirySection` on this
 * page and keeps the `#enquire` id so every on-page CTA still lands here.
 */
export function PoolPlannerSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={ENQUIRE_ANCHOR_ID}
      motion={motion}
      eyebrow={planner.eyebrow}
      heading={planner.heading}
      description={planner.description}
      variant="raised"
    >
      <Stack spacing={{ xs: 7, md: 8 }}>
        <Box sx={panelSx}>
          <DeferredPoolPlannerForm />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <EnquiryNextSteps />
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
        </Box>
      </Stack>
    </SectionShell>
  );
}
