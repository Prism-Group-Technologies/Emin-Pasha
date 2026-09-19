import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { HoursBadge } from "@/containers/wellness/molecules/HoursBadge";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { spa, spaServices } from "@/content/wellness";
import type { RevealDirection } from "@/theme/motion";

/**
 * "What we offer" — the spa's approved §6 offerings and its 7am–9pm hours
 * beside a short line on how a visit is shaped, with a ghost WhatsApp CTA.
 * Lifted out of `spa.tsx` so that container stays pure composition.
 *
 * Plain band: it sits between the raised assurance strip and the dark
 * Turkish-bath ritual, so all three of those bands read as distinct grounds.
 */
export function SpaOfferingsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} heading="What we offer">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Stack spacing={4}>
          <HoursBadge hours={spa.hours} />
          <FactList items={spaServices.map((service) => service.name)} />
        </Stack>
        <Stack spacing={4}>
          <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
            Every treatment starts with a two-minute consultation and ends in the relaxation lounge
            with tea, for as long as you like. Book a single treatment, or a package that runs the
            bath, the pool and lunch together.
          </Text>
          <WhatsAppCta label="Book a treatment" variant="ghost" />
        </Stack>
      </Box>
    </SectionShell>
  );
}
