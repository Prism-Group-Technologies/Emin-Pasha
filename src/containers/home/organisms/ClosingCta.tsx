import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { closingSection } from "@/containers/home/copy";
import { CtaPair } from "@/containers/home/molecules/CtaPair";
import { identity } from "@/content/identity";
import { bookNowCta } from "@/content/navigation";
import { site } from "@/content/site";
import { emailUrl, telephoneUrl, whatsappBookingUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const CHANNELS = [
  { icon: "phone", href: telephoneUrl, label: closingSection.callLabel, value: identity.telephone },
  {
    icon: "whatsapp",
    href: whatsappBookingUrl,
    label: closingSection.whatsappLabel,
    value: identity.whatsapp.display,
  },
  { icon: "mail", href: emailUrl, label: "Email reservations", value: identity.email },
] as const;

/**
 * The last exit. The approved closing sentence, the booking CTA, and all three
 * channels a guest might actually reach for.
 *
 * Three channels rather than one because they are not interchangeable in this
 * market: a diplomatic booker emails, a Kampala local messages on WhatsApp,
 * and an event organiser picks up the phone. Making a visitor guess which one
 * is welcome loses the ones who guess wrong.
 *
 * `tel:`, `mailto:` and `wa.me` all render as plain anchors rather than
 * client-router links — handing a protocol URL to the router breaks the
 * handoff to the dialler.
 */
export function ClosingCta({ motion = "up" }: { motion?: RevealDirection }) {
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
            {site.homepage.closing.text}
          </Text>
          <Text variant="subtitle1" color="text.secondary" sx={{ mb: 6, textWrap: "pretty" }}>
            {closingSection.supporting}
          </Text>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 7 }}>
            <CtaPair
              section="closing"
              align="center"
              size="large"
              primary={{ label: site.homepage.closing.ctaLabel, href: bookNowCta.href }}
            />
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 4, sm: 6 }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              pt: 6,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {CHANNELS.map((channel) => (
              <Stack key={channel.value} spacing={1} sx={{ alignItems: "center" }}>
                <Icon
                  name={channel.icon}
                  aria-hidden
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
                <ExternalLink href={channel.href} variant="body1" aria-label={channel.label}>
                  {channel.value}
                </ExternalLink>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Reveal>
    </SectionShell>
  );
}
