import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { ambiences, sections } from "@/containers/dining/copy";
import { AmbienceCard } from "@/containers/dining/molecules/AmbienceCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * "Where to sit" — three settings for the same kitchen, each a card with a
 * photograph. Standard boutique practice: let the guest picture the evening
 * before they book it.
 */
export function AmbienceSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.ambience.eyebrow}
      heading={sections.ambience.heading}
      description={sections.ambience.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {ambiences.map((ambience, index) => (
          <Reveal key={ambience.id} index={index} fill>
            <AmbienceCard ambience={ambience} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
