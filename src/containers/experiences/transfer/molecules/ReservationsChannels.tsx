import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappTransferUrl } from "@/lib/directions";

const { closing } = transferSections;

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  {
    icon: "whatsapp",
    href: whatsappTransferUrl,
    label: closing.whatsappLabel,
    value: identity.whatsapp.display,
  },
  { icon: "phone", href: telephoneUrl, label: closing.callLabel, value: identity.telephone },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: closing.emailLabel,
    value: identity.reservationsEmail,
  },
];

/**
 * The three ways to reach reservations directly — WhatsApp, phone and the
 * approved reservations@ address (§8: "Arrange transfers at
 * reservations@eminpasha.com"). `columns` is 3 in a full-width band and 1 in
 * a side rail. Server component: reads `identity` and `lib/directions`.
 */
export function ReservationsChannels({ columns = 3 }: { columns?: 1 | 3 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", md: `repeat(${columns}, minmax(0, 1fr))` },
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
  );
}
