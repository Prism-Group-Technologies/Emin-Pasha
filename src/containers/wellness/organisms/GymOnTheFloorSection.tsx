import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { HoursBadge } from "@/containers/wellness/molecules/HoursBadge";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { gym, gymOfferings } from "@/content/wellness";
import type { RevealDirection } from "@/theme/motion";

/**
 * "On the floor" — the gym's approved §6 offerings and its 6am–9pm hours
 * beside a short line on how membership works, with a ghost WhatsApp CTA.
 * Lifted out of `gym.tsx` verbatim so that container stays pure composition.
 */
export function GymOnTheFloorSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} heading="On the floor" variant="raised">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Stack spacing={4}>
          <HoursBadge hours={gym.hours} />
          <FactList items={gymOfferings} />
        </Stack>
        <Stack spacing={4} sx={{ maxWidth: "52ch" }}>
          <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
            Train month to month or by the year, as a hotel guest or a resident of the
            neighbourhood. Every membership includes the group classes, the pool, and a trainer
            induction to get you started.
          </Text>
          <WhatsAppCta label="Ask about joining" variant="ghost" />
        </Stack>
      </Box>
    </SectionShell>
  );
}
