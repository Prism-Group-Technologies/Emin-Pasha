import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { HoursBlock } from "@/components/organisms/Footer/HoursBlock";
import { SocialLinks } from "@/components/organisms/Footer/SocialLinks";
import { getFooterData } from "@/components/organisms/Footer/footerData";
import { SectionShell } from "@/components/templates/SectionShell";
import { ContactDetails } from "@/containers/contact/organisms/ContactDetails";
import { DeferredContactForm } from "@/containers/contact/organisms/DeferredContactForm";
import { MapEmbed } from "@/containers/home/molecules/MapEmbed";
import { assets } from "@/content/assets";
import { contactCopy } from "@/content/contact-copy";
import { identity } from "@/content/identity";
import { alternatingDirection } from "@/theme/motion";

const mapAsset = assets.find((asset) => asset.id === "contact-static-map");
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(identity.address)}&output=embed`;

/**
 * Contact. The NAP, the two email addresses and the WhatsApp number all come
 * from `content/identity.ts` — the same object the footer and every JSON-LD
 * node read, so the NAP is byte-identical sitewide (CLAUDE.md §9).
 *
 * `HoursBlock` is reused from the footer rather than re-listed: it already
 * renders only the four approved hour facts and says plainly that restaurant
 * hours vary (§0.7 forbids inventing them).
 *
 * Department routing shows the two channels §9 actually lists. No `events@`
 * or `spa@` address is invented — those enquiries route to the general inbox,
 * which is what the source supports.
 */
export function ContactContainer() {
  // The two reused footer blocks are presentational now, so their content
  // comes from the same assembled object the footer itself renders from —
  // still one source for the hours and the social URLs, just passed in
  // rather than reached for.
  const footer = getFooterData();

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ CONTACT"
        heading="Contact"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            {contactCopy.intro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 7, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={7}>
            <ContactDetails />
            <HoursBlock hours={footer.hours} />
            <SocialLinks social={footer.social} />
          </Stack>

          <Stack spacing={7}>
            <DeferredContactForm />
            <Box>
              <Text variant="h3" component="h2" sx={{ mb: 4 }}>
                {contactCopy.mapTitle}
              </Text>
              <MapEmbed
                asset={mapAsset}
                mapUrl={embedUrl}
                label={identity.address}
                loadLabel={contactCopy.mapLoad}
              />
            </Box>
          </Stack>
        </Box>
      </SectionShell>
    </>
  );
}
