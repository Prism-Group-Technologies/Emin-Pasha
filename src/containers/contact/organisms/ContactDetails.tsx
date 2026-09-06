import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { contactChannels } from "@/content/contact";
import { contactCopy } from "@/content/contact-copy";
import { identity } from "@/content/identity";
import { directionsUrl, emailUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";

/**
 * The NAP and department routing.
 *
 * Every value reads from `content/identity.ts` and `content/contact.ts` — the
 * same objects the footer and every JSON-LD node use — so the NAP is
 * byte-identical sitewide (CLAUDE.md §9). §9 of the source lists exactly two
 * channels, so no `events@` or `spa@` address is invented; those enquiries
 * route to the general inbox, which is what the source supports.
 */
export function ContactDetails() {
  return (
    <Stack spacing={7}>
      <Box>
        <Text variant="h3" component="h2" sx={{ mb: 4 }}>
          {contactCopy.napTitle}
        </Text>
        <Box component="address" sx={{ fontStyle: "normal", display: "grid", gap: 2 }}>
          <Text variant="body1">{identity.name}</Text>
          <ExternalLink href={directionsUrl} variant="body1">
            {identity.address}
          </ExternalLink>
          <ExternalLink href={telephoneUrl} variant="body1">
            {identity.telephone}
          </ExternalLink>
          <ExternalLink href={emailUrl} variant="body1">
            {identity.email}
          </ExternalLink>
          <ExternalLink href={`mailto:${identity.reservationsEmail}`} variant="body1">
            {identity.reservationsEmail}
          </ExternalLink>
          <ExternalLink href={whatsappUrl} variant="body1">
            {`WhatsApp ${identity.whatsapp.display}`}
          </ExternalLink>
        </Box>
      </Box>

      <Box>
        <Text variant="h3" component="h2" sx={{ mb: 4 }}>
          {contactCopy.departmentsTitle}
        </Text>
        <Box component="dl" sx={{ m: 0, display: "grid", gap: 4 }}>
          {contactChannels.map((channel) => (
            <Box key={channel.id}>
              <Text component="dt" variant="overline">
                {channel.department}
              </Text>
              {/* Purpose and address both live inside the <dd>: a <dl>
                        child that is neither <dt> nor <dd> is invalid markup,
                        and axe fails the page for it. */}
              <Box component="dd" sx={{ m: 0, display: "grid", gap: 1 }}>
                <Text variant="body2" color="text.secondary">
                  {channel.purpose}
                </Text>
                <ExternalLink href={`mailto:${channel.email}`} variant="body2">
                  {channel.email}
                </ExternalLink>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
