import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";
import { sections } from "@/containers/dining/copy";
import { DeferredDiningReservationForm } from "@/containers/dining/organisms/DeferredDiningReservationForm";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappUrl } from "@/lib/directions";
import type { ReservationOutlet } from "@/schemas/diningReservation";
import type { RevealDirection } from "@/theme/motion";

const CHANNELS: { icon: IconName; href: string; label: string; value: string }[] = [
  {
    icon: "phone",
    href: telephoneUrl,
    label: sections.closing.callLabel,
    value: identity.telephone,
  },
  {
    icon: "whatsapp",
    href: whatsappUrl,
    label: sections.closing.whatsappLabel,
    value: identity.whatsapp.display,
  },
  {
    icon: "mail",
    href: `mailto:${identity.reservationsEmail}`,
    label: sections.closing.emailLabel,
    value: identity.reservationsEmail,
  },
];

/**
 * The page's primary conversion surface: the reservation enquiry form beside
 * the three channels a guest might reach for instead. On the index the form
 * defaults to "any outlet"; the detail pages pass their own outlet so it
 * arrives pre-selected.
 */
export function ReservationSection({
  motion = "up",
  outlet,
}: {
  motion?: RevealDirection;
  outlet?: ReservationOutlet;
}) {
  return (
    <SectionShell
      id={RESERVE_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.reservation.eyebrow}
      heading={sections.reservation.heading}
      description={sections.reservation.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 1fr)" },
          gap: { xs: 7, md: 8 },
          alignItems: "start",
        }}
      >
        <DeferredDiningReservationForm outlet={outlet} />

        <Stack spacing={3}>
          <Text variant="overline" component="p" color="text.secondary">
            Or reach the reservations desk directly
          </Text>
          {CHANNELS.map((channel) => (
            <ChannelCard
              key={channel.value}
              icon={channel.icon}
              href={channel.href}
              label={channel.label}
              value={channel.value}
            />
          ))}
        </Stack>
      </Box>
    </SectionShell>
  );
}
