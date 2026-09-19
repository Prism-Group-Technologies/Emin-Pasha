import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { BOOKING_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { transferSteps } from "@/containers/experiences/transfer/copy/journey";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { JourneyStepCard } from "@/containers/wellness/molecules/JourneyStepCard";
import type { RevealDirection } from "@/theme/motion";

const { howItWorks } = transferSections;

/**
 * Four numbered steps from booking to room key, in the shared
 * `JourneyStepCard` — 1-up on phones, 2×2 on tablets, a row of four from
 * `lg`. The section-level action is a second route into the form for the
 * visitor who is convinced by the process alone.
 */
export function HowItWorksSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={howItWorks.eyebrow}
      heading={howItWorks.heading}
      description={howItWorks.description}
      variant={variant}
      action={
        <Button href={`#${BOOKING_ANCHOR_ID}`} variant="ghost">
          Start booking
        </Button>
      }
    >
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {transferSteps.map((step, index) => (
          <Box component="li" key={step.step}>
            <Reveal index={index} fill>
              <JourneyStepCard step={step} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
