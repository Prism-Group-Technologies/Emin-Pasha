import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { BOOKING_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { ReservationsChannels } from "@/containers/experiences/transfer/molecules/ReservationsChannels";
import { TransferWhatsAppCta } from "@/containers/experiences/transfer/molecules/TransferWhatsAppCta";
import type { RevealDirection } from "@/theme/motion";

const { closing } = transferSections;

/**
 * The last exit: a one-line promise, the two primary routes (book online,
 * book on WhatsApp) and all three direct channels to reservations — three
 * rather than one because in this market they are not interchangeable.
 */
export function TransferClosingSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="raised" topRule motion={motion}>
      <Reveal direction={motion}>
        <Box sx={{ maxWidth: "64ch", mx: "auto", textAlign: "center" }}>
          <Text
            variant="overline"
            component="p"
            sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 4 }}
          >
            {closing.eyebrow}
          </Text>
          <Text variant="h2" component="h2" sx={{ mb: 4, textWrap: "balance" }}>
            {closing.heading}
          </Text>
          <Text variant="subtitle1" color="text.secondary" sx={{ mb: 6, textWrap: "pretty" }}>
            {closing.supporting}
          </Text>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
            <Button href={`#${BOOKING_ANCHOR_ID}`} size="large">
              Book your transfer
            </Button>
            <TransferWhatsAppCta label={closing.ctaLabel} variant="ghost" size="large" />
          </Box>
        </Box>
        <Box sx={{ mt: { xs: 7, md: 8 } }}>
          <ReservationsChannels />
        </Box>
      </Reveal>
    </SectionShell>
  );
}
