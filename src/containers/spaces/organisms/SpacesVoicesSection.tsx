import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { sections } from "@/containers/spaces/copy/sections";
import { spacesVoices } from "@/containers/spaces/copy/voices";
import type { RevealDirection } from "@/theme/motion";

/** Three placeholder visitor notes — one per space — in the shared `QuoteCard`. */
export function SpacesVoicesSection({ motion = "up" }: { motion?: RevealDirection }) {
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
          gap: { xs: 5, md: 6 },
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {spacesVoices.map((voice, index) => (
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
