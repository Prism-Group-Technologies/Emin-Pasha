import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { eventVoices, sections } from "@/containers/events/copy";
import { EventVoiceCard } from "@/containers/events/molecules/EventVoiceCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Three planner notes. Attributions are placeholders until real
 * meetings-and-events references are collected and signed off; see
 * `copy/voices.ts`.
 */
export function EventVoicesSection({ motion = "up" }: { motion?: RevealDirection }) {
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
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {eventVoices.map((voice, index) => (
          <Reveal key={voice.id} index={index} fill>
            <EventVoiceCard voice={voice} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
