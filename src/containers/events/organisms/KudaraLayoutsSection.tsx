import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { kudaraLayouts, kudaraLayoutsNote, kudaraSections } from "@/containers/events/copy";
import { KudaraLayoutCard } from "@/containers/events/molecules/KudaraLayoutCard";
import type { RevealDirection } from "@/theme/motion";

const { layouts } = kudaraSections;

/**
 * Kudara Hall by layout — six schematic cards, each with its indicative
 * maximum, what it is set for and how it is dressed. Every capacity is a
 * placeholder and is labelled on the card and in the note below the grid.
 */
export function KudaraLayoutsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={layouts.eyebrow}
      heading={layouts.heading}
      description={layouts.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {kudaraLayouts.map((layout, index) => (
          <Reveal key={layout.id} index={index} fill>
            <KudaraLayoutCard layout={layout} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {kudaraLayoutsNote}
      </Text>
    </SectionShell>
  );
}
