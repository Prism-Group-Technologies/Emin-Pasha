import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { NapRow } from "@/containers/contact/molecules/NapRow";
import { identity } from "@/content/identity";
import { directionsUrl, emailUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";

/**
 * The NAP block. Every value reads from `content/identity.ts` — the same
 * object the footer and every JSON-LD node use — so the NAP is byte-identical
 * sitewide (CLAUDE.md §9), which `check:seo` asserts against this file.
 * Rendered as a real `<address>` so the name, address and telephone are
 * machine-readable as contact information.
 */
export function ContactDetails() {
  return (
    <Box component="address" sx={{ fontStyle: "normal", display: "grid", gap: 3 }}>
      <Text variant="h5" component="p">
        {identity.name}
      </Text>
      <NapRow icon="location" label="Address" value={identity.address} href={directionsUrl} />
      <NapRow icon="phone" label="Front desk" value={identity.telephone} href={telephoneUrl} />
      <NapRow
        icon="whatsapp"
        label="WhatsApp"
        value={identity.whatsapp.display}
        href={whatsappUrl}
      />
      <NapRow icon="mail" label="General enquiries" value={identity.email} href={emailUrl} />
      <NapRow
        icon="mail"
        label="Reservations"
        value={identity.reservationsEmail}
        href={`mailto:${identity.reservationsEmail}`}
      />
    </Box>
  );
}
