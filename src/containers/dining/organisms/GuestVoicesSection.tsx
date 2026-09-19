import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { diningVoices, sections } from "@/containers/dining/copy";
import type { RevealDirection } from "@/theme/motion";

/**
 * Three diner notes, in the shared `QuoteCard`. These are placeholders (see
 * `copy/voices.ts`) — the three approved testimonials in the content layer
 * are about the hotel and spa, not a dinner — so nothing here is attributed
 * to a real, named guest yet.
 */
export function GuestVoicesSection({ motion = "up" }: { motion?: RevealDirection }) {
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
        {diningVoices.map((voice, index) => (
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
