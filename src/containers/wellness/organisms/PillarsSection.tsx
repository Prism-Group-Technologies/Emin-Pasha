import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { sections, wellnessPillars } from "@/containers/wellness/copy";
import { PillarCard } from "@/containers/wellness/molecules/PillarCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The three facilities as a row of pillar cards — the first decision the hub
 * asks a visitor to make. Each card links to its own page.
 */
export function PillarsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.pillars.eyebrow}
      heading={sections.pillars.heading}
      description={sections.pillars.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {wellnessPillars.map((pillar, index) => (
          <Reveal key={pillar.id} index={index} fill>
            <PillarCard pillar={pillar} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
