import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type { IconName } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";
import { sections } from "@/containers/dining/copy";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { closing } = sections;

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  { icon: "phone", href: telephoneUrl, label: closing.callLabel, value: identity.telephone },
  {
    icon: "whatsapp",
    href: whatsappUrl,
    label: closing.whatsappLabel,
    value: identity.whatsapp.display,
  },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: closing.emailLabel,
    value: identity.reservationsEmail,
  },
];

/**
 * The last exit: the reservation anchor and all three channels a guest might
 * use — three rather than one because they are not interchangeable in this
 * market (a visiting executive emails, a Kampala local messages, an organiser
 * calls). Mirrors `accommodation/organisms/ClosingSection`.
 */
export function ClosingCtaSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="raised" topRule motion={motion}>
      <Reveal direction={motion}>
        <Box sx={{ maxWidth: "64ch", mx: "auto", textAlign: "center" }}>
          <Text
            variant="overline"
            component="p"
            sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 4 }}
          >
            {closing.eyebrow}
          </Text>
          <Text variant="h2" component="h2" sx={{ mb: 4, textWrap: "balance" }}>
            {closing.heading}
          </Text>
          <Text variant="subtitle1" color="text.secondary" sx={{ mb: 6, textWrap: "pretty" }}>
            {closing.supporting}
          </Text>
          <Button href={`#${RESERVE_ANCHOR_ID}`} size="large">
            {closing.ctaLabel}
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
