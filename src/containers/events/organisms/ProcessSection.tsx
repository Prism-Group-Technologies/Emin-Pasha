import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { PROCESS_ANCHOR_ID } from "@/containers/events/anchors";
import { processSteps, sections } from "@/containers/events/copy";
import { ProcessStepCard } from "@/containers/events/molecules/ProcessStepCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * "How it works" — the four steps of a planning engagement, so an organiser
 * knows the shape of the process before they brief. `variant` defaults to the
 * raised band; a page passes `"default"` when a neighbour already owns the
 * raised tone.
 */
export function ProcessSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={PROCESS_ANCHOR_ID}
      motion={motion}
      variant={variant}
      eyebrow={sections.process.eyebrow}
      heading={sections.process.heading}
      description={sections.process.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {processSteps.map((step, index) => (
          <Reveal key={step.step} index={index} fill>
            <ProcessStepCard step={step} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
