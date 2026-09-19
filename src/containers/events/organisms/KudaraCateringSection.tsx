import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import {
  kudaraCateringNote,
  kudaraCateringPackages,
  kudaraSections,
} from "@/containers/events/copy";
import { KudaraCateringCard } from "@/containers/events/molecules/KudaraCateringCard";
import type { RevealDirection } from "@/theme/motion";

const { catering } = kudaraSections;

/**
 * Kudara Hall catering — three package cards from the hotel's own kitchens.
 * Per-delegate rates are indicative placeholders and are flagged on each card
 * and in the note.
 */
export function KudaraCateringSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={catering.eyebrow}
      heading={catering.heading}
      description={catering.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {kudaraCateringPackages.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <KudaraCateringCard pkg={pkg} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {kudaraCateringNote}
      </Text>
    </SectionShell>
  );
}
