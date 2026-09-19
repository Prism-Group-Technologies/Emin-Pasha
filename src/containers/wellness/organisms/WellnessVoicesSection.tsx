import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { sections, wellnessVoices } from "@/containers/wellness/copy";
import type { RevealDirection } from "@/theme/motion";

/**
 * Three visitor notes, in the shared `QuoteCard`. These are placeholders
 * (see `copy/voices.ts`) — the approved testimonials are about the hotel as a
 * whole — so nothing here is attributed to a real, named person yet.
 *
 * `variant` defaults to the plain band; a page passes `"raised"` to keep the
 * alternating tonal rhythm going.
 */
export function WellnessVoicesSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.voices.eyebrow}
      heading={sections.voices.heading}
      description={sections.voices.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {wellnessVoices.map((voice, index) => (
          <Reveal key={voice.id} index={index} fill>
            <QuoteCard
              heading={voice.heading}
              quote={voice.quote}
              author={voice.author}
              location={voice.location}
              stayDate={voice.date}
              featured={index === 0}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
