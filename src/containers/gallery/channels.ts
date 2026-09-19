import type { ChannelCardProps } from "@/components/molecules/ChannelCard";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappGalleryUrl } from "@/lib/directions";

/**
 * The three direct lines for the closing band. Server-only in practice (it
 * reads `content/identity`). WhatsApp leads — it is the page's lead channel.
 */
export const galleryChannels: ChannelCardProps[] = [
  {
    icon: "whatsapp",
    href: whatsappGalleryUrl,
    label: "Message on WhatsApp",
    value: identity.whatsapp.display,
  },
  { icon: "phone", href: telephoneUrl, label: "Call reservations", value: identity.telephone },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: "Email reservations",
    value: identity.reservationsEmail,
  },
];
