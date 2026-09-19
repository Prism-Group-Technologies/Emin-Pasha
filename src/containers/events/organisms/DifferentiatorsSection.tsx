import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { differentiators, sections } from "@/containers/events/copy";
import { DifferentiatorCard } from "@/containers/events/molecules/DifferentiatorCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * "Why Emin Pasha" — six buying reasons as flat cards, each tied back to an
 * approved §7 fact. The section that builds conviction between the packages
 * and the enquiry form. See `copy/differentiators.ts`.
 */
export function DifferentiatorsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      variant="raised"
      eyebrow={sections.differentiators.eyebrow}
      heading={sections.differentiators.heading}
      description={sections.differentiators.description}
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
        {differentiators.map((item, index) => (
          <Reveal key={item.id} index={index} fill>
            <DifferentiatorCard item={item} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
