import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { locationSection } from "@/containers/home/copy";
import { MapEmbed } from "@/containers/home/molecules/MapEmbed";
import { TrustItem } from "@/containers/home/molecules/TrustItem";
import { assets } from "@/content/assets";
import { identity } from "@/content/identity";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { directionsUrl, emailUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const mapAsset = assets.find((asset) => asset.id === "contact-static-map");

/** Google's documented embed form, keyed on the approved NAP address. */
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(identity.address)}&output=embed`;

const CONTACT_ROWS = [
  { icon: "location", href: directionsUrl, text: identity.address },
  { icon: "phone", href: telephoneUrl, text: identity.telephone },
  { icon: "mail", href: emailUrl, text: identity.email },
  { icon: "whatsapp", href: whatsappUrl, text: identity.whatsapp.display },
] as const;

/**
 * Nakasero positioning, the NAP, a click-to-load map and a directions CTA.
 *
 * The address, phone, email and WhatsApp number come straight from
 * `content/identity.ts` — the same object the footer and the JSON-LD read, so
 * the NAP is byte-identical everywhere, which is the whole point of local SEO.
 *
 * Each contact row is an icon plus a live link rather than plain text: on the
 * device most of this traffic arrives on, a tappable number is the difference
 * between an enquiry and a copy-paste.
 */
export function LocationBlock({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell eyebrow="§ NAKASERO" heading={identity.neighbourhood} topRule motion={motion}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Reveal direction={motion}>
          <Stack spacing={5}>
            <Text variant="subtitle1" sx={{ textWrap: "pretty" }}>
              {locationSection.description}
            </Text>
            <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {site.setting.whySells}
            </Text>

            <Box component="address" sx={{ fontStyle: "normal", display: "grid", gap: 3, pt: 2 }}>
              <Text variant="overline" component="p">
                {identity.name}
              </Text>
              {CONTACT_ROWS.map((row) => (
                <Box key={row.text} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Icon
                    name={row.icon}
                    aria-hidden
                    fontSize="small"
                    sx={{ color: "primary.main", flexShrink: 0 }}
                  />
                  <ExternalLink href={row.href} variant="body2">
                    {row.text}
                  </ExternalLink>
                </Box>
              ))}
            </Box>

            {/* Check-in and check-out are real, already-approved values that
                nothing on the homepage surfaced, and they are the two facts a
                visitor most often scrolls back to the footer to find. */}
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                pt: 4,
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 4,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box component="li">
                <TrustItem value={identity.checkInTime} label="Check-in from" />
              </Box>
              <Box component="li">
                <TrustItem value={identity.checkOutTime} label="Check-out by" />
              </Box>
            </Box>

            <Button href={directionsUrl} variant="ghost" sx={{ alignSelf: "flex-start" }}>
              {shell.stickyBar.directions}
            </Button>
          </Stack>
        </Reveal>
        <Reveal index={1} direction={oppositeOf(motion)}>
          <MapEmbed
            asset={mapAsset}
            mapUrl={embedUrl}
            label={identity.address}
            loadLabel={shell.stickyBar.directions}
          />
        </Reveal>
      </Box>
    </SectionShell>
  );
}
