import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { sections, wellnessAsset, wellnessJourney } from "@/containers/wellness/copy";
import { JourneyStepCard } from "@/containers/wellness/molecules/JourneyStepCard";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const asset = wellnessAsset("wellness-journey");

/**
 * "What to expect" — the five steps of a treatment visit beside a
 * photograph, so a first-timer knows the shape of the day before they book.
 * Two columns that enter against each other on desktop.
 *
 * `variant` defaults to the raised band it has always used; a page passes
 * `"default"` when a neighbouring section already owns the raised tone.
 */
export function JourneySection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.journey.eyebrow}
      heading={sections.journey.heading}
      description={sections.journey.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.1fr)" },
          gap: { xs: 6, md: 8 },
          // Centre the wide photograph in the row so the leftover height sits
          // above and below it, not as one empty block beside the last steps.
          alignItems: { xs: "start", md: "center" },
        }}
      >
        {asset && (
          <Box sx={{ order: { xs: 1, md: 1 }, position: { md: "sticky" }, top: { md: 120 } }}>
            <Reveal direction={oppositeOf(motion)} media>
              <MediaFrame>
                <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />
              </MediaFrame>
            </Reveal>
          </Box>
        )}

        <Box
          sx={{
            order: { xs: 2, md: 2 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 4, md: 5 },
            alignItems: "stretch",
          }}
        >
          {wellnessJourney.map((step, index) => (
            <Reveal key={step.step} index={index} fill>
              <JourneyStepCard step={step} />
            </Reveal>
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
