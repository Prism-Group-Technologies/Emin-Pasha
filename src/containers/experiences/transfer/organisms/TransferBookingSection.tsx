import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { BOOKING_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { NextSteps } from "@/containers/experiences/transfer/molecules/NextSteps";
import { ReservationsChannels } from "@/containers/experiences/transfer/molecules/ReservationsChannels";
import { DeferredTransferBookingForm } from "@/containers/experiences/transfer/organisms/DeferredTransferBookingForm";
import { whatsappTransferUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const { booking } = transferSections;

const panelSx = {
  p: { xs: 3, sm: 4, md: 6 },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.lg}px`,
  bgcolor: "background.paper",
  boxShadow: shadowTokens.sm,
} as const;

/**
 * The page's conversion surface (`#book`): the booking form in its own
 * panel, then "what happens next" beside the three direct channels for the
 * traveller who would rather talk to a person. Server component — it
 * resolves `whatsappTransferUrl` and hands the island a plain string (D25).
 */
export function TransferBookingSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={BOOKING_ANCHOR_ID}
      motion={motion}
      eyebrow={booking.eyebrow}
      heading={booking.heading}
      description={booking.description}
      variant={variant}
    >
      <Stack spacing={{ xs: 7, md: 8 }}>
        <Box sx={panelSx}>
          <DeferredTransferBookingForm whatsappHref={whatsappTransferUrl} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <NextSteps heading="What happens next" steps={bookingFormCopy.nextSteps} />
          <Stack spacing={3}>
            <Text variant="overline" component="p" color="text.secondary">
              Or reach reservations directly
            </Text>
            <ReservationsChannels columns={1} />
          </Stack>
        </Box>
      </Stack>
    </SectionShell>
  );
}
