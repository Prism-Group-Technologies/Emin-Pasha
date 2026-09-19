import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { kudaraCaseStudies, kudaraSections } from "@/containers/events/copy";
import { KudaraCaseStudyCard } from "@/containers/events/molecules/KudaraCaseStudyCard";
import type { RevealDirection } from "@/theme/motion";

const { caseStudies } = kudaraSections;

/**
 * The proof band, set on the dark contrast ground for a tonal break in a long
 * page. The cards keep the light `cardSurface`, which is contrast-safe on that
 * ground. Every case note is a placeholder — no real organisation is named.
 */
export function KudaraCaseStudiesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      variant="contrast"
      eyebrow={caseStudies.eyebrow}
      heading={caseStudies.heading}
      description={caseStudies.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {kudaraCaseStudies.map((study, index) => (
          <Reveal key={study.id} index={index} fill>
            <KudaraCaseStudyCard study={study} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
