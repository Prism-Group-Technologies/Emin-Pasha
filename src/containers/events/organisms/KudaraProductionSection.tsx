import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { kudaraProduction, kudaraProductionNote, kudaraSections } from "@/containers/events/copy";
import { KudaraSpecGroup } from "@/containers/events/molecules/KudaraSpecGroup";
import type { RevealDirection } from "@/theme/motion";

const { production } = kudaraSections;

/**
 * The in-house production spec, in five scannable groups. Equipment counts and
 * models are indicative placeholders for planning — the final spec is set on
 * the proposal, as the note says.
 */
export function KudaraProductionSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      variant="raised"
      eyebrow={production.eyebrow}
      heading={production.heading}
      description={production.description}
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
        {kudaraProduction.map((group, index) => (
          <Reveal key={group.id} index={index} fill>
            <KudaraSpecGroup group={group} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {kudaraProductionNote}
      </Text>
    </SectionShell>
  );
}
