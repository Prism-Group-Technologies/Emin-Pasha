import { sections } from "@/containers/contact/copy";
import { ContactStickyBar } from "@/containers/contact/molecules/ContactStickyBar";
import { whatsappUrl } from "@/lib/directions";

/**
 * The page-scoped sticky bar. A Server Component whose only job is to resolve
 * the WhatsApp URL and copy and hand them to the client `ContactStickyBar` as
 * plain strings, so `lib/directions` stays off the client (DECISIONS.md D25).
 */
export function StickyEnquireCta() {
  const { sticky } = sections;
  return (
    <ContactStickyBar
      whatsappHref={whatsappUrl}
      lead={sticky.lead}
      whatsappLabel={sticky.whatsapp}
      enquireLabel={sticky.enquire}
    />
  );
}
