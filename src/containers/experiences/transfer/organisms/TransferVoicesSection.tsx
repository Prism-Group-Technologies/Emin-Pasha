import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { transferVoices } from "@/containers/experiences/transfer/copy/voices";
import type { RevealDirection } from "@/theme/motion";

const { voices } = transferSections;

/**
 * Three traveller notes in the shared `QuoteCard`, each answering one fear —
 * a delayed flight, children, a group on many flights. Placeholders (see
 * `copy/voices.ts`); nothing is attributed to a real person.
 */
export function TransferVoicesSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={voices.eyebrow}
      heading={voices.heading}
      description={voices.description}
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
        {transferVoices.map((voice, index) => (
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
