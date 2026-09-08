import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type { IconName } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { closingSection } from "@/containers/accommodation/copy";
import { identity } from "@/content/identity";
import { emailUrl, telephoneUrl, whatsappBookingUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  { icon: "phone", href: telephoneUrl, label: closingSection.callLabel, value: identity.telephone },
  {
    icon: "whatsapp",
    href: whatsappBookingUrl,
    label: closingSection.whatsappLabel,
    value: identity.whatsapp.display,
  },
  { icon: "mail", href: emailUrl, label: closingSection.emailLabel, value: identity.email },
];

/**
 * The last exit: the booking anchor, and all three channels a guest might
 * reach for — three rather than one because they are not interchangeable in
 * this market (a diplomatic booker emails, a Kampala local messages, an
 * organiser calls). `tel:`, `mailto:` and `wa.me` render as plain anchors
 * through `ChannelCard` / `ExternalLink`, so the OS hand-off is not broken.
 */
export function ClosingSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="raised" topRule motion={motion}>
      <Reveal direction={motion}>
        <Box sx={{ maxWidth: "64ch", mx: "auto", textAlign: "center" }}>
          <Text
            variant="overline"
            component="p"
            sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 4 }}
          >
            {closingSection.eyebrow}
          </Text>
          <Text variant="h2" component="h2" sx={{ mb: 4, textWrap: "balance" }}>
            {closingSection.heading}
          </Text>
          <Text variant="subtitle1" color="text.secondary" sx={{ mb: 6, textWrap: "pretty" }}>
            {closingSection.supporting}
          </Text>
          <Button href={`#${BOOKING_ANCHOR_ID}`} size="large">
            {closingSection.primaryCtaLabel}
          </Button>
        </Box>

        <Box
          sx={{
            mt: { xs: 7, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
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
      </Reveal>
    </SectionShell>
  );
}
