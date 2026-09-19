import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { sections, storyVoices } from "@/containers/story/copy";
import type { RevealDirection } from "@/theme/motion";

/**
 * Three visitor notes about the sense of place, in the shared `QuoteCard`.
 * Placeholders (see `copy/voices.ts`) — nothing is attributed to a real,
 * named guest until reviews specifically about the building are collected.
 */
export function StoryVoicesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.voices.eyebrow}
      heading={sections.voices.heading}
      description={sections.voices.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {storyVoices.map((voice, index) => (
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
