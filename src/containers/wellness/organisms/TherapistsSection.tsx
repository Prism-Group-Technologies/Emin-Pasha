import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { spaSections, therapists } from "@/containers/wellness/copy";
import { TherapistCard } from "@/containers/wellness/molecules/TherapistCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The treatment team as four profiles — the human faces the funnel was
 * missing. Names are placeholders (see `copy/therapists.ts`); each card's CTA
 * lands on the enquiry form so a guest can ask for someone by name.
 */
export function TherapistsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.therapists.eyebrow}
      heading={spaSections.therapists.heading}
      description={spaSections.therapists.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {therapists.map((therapist, index) => (
          <Reveal key={therapist.id} index={index} fill>
            <TherapistCard therapist={therapist} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, fontStyle: "italic" }}>
        Team names and portraits are placeholders until the spa&apos;s own bios are confirmed.
      </Text>
    </SectionShell>
  );
}
