import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import { sections } from "@/containers/wellness/copy";
import { EnquiryNextSteps } from "@/containers/wellness/molecules/EnquiryNextSteps";
import { DeferredWellnessEnquiryForm } from "@/containers/wellness/organisms/DeferredWellnessEnquiryForm";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappWellnessUrl } from "@/lib/directions";
import type { WellnessInterest } from "@/schemas/wellnessEnquiry";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

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
 * The page's on-page conversion surface: the enquiry form in its own panel,
 * beside "what happens next" and the three channels a visitor might reach for
 * instead. On the hub the form defaults to "not sure yet"; the facility pages
 * pass their own `interest` so it arrives pre-selected.
 */
export function WellnessEnquirySection({
  motion = "up",
  interest = "any",
}: {
  motion?: RevealDirection;
  interest?: WellnessInterest;
}) {
  return (
    <SectionShell
      id={ENQUIRE_ANCHOR_ID}
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
          // "What happens next" is short; centring it against the taller form
          // panel splits the leftover height rather than leaving it pooled
          // under the list.
          alignItems: { xs: "start", md: "center" },
        }}
      >
        <Box sx={panelSx}>
          <DeferredWellnessEnquiryForm interest={interest} />
        </Box>

        {/* The side rail carries only "what happens next" — the three contact
            channels move to a full-width row below, so a tall form is not sat
            beside a short column with empty space trailing off to the right. */}
        <EnquiryNextSteps />
      </Box>

      <Stack spacing={3} sx={{ mt: { xs: 6, md: 8 } }}>
        <Text variant="overline" component="p" color="text.secondary">
          Or reach a person directly
        </Text>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
            gap: 3,
          }}
        >
          {CHANNELS.map((channel) => (
            <ChannelCard
              key={channel.value}
              icon={channel.icon}
              href={channel.href}
              label={channel.label}
              value={channel.value}
            />
          ))}
        </Box>
      </Stack>
    </SectionShell>
  );
}
