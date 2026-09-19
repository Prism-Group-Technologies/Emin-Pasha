import type { IconName } from "@/components/atoms/Icon";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappLoungesUrl } from "@/lib/directions";

export interface Channel {
  icon: IconName;
  href: string;
  label: string;
  value: string;
}

/**
 * The three direct lines, shared by the reservation band and the closing
 * band. Server-only in practice (it reads `content/identity`).
 */
export const loungeChannels: Channel[] = [
  {
    icon: "whatsapp",
    href: whatsappLoungesUrl,
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
