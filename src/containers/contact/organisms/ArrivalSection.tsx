import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { arrivalNotes, sections } from "@/containers/contact/copy";
import { ArrivalNoteCard } from "@/containers/contact/molecules/ArrivalNoteCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * "Before you arrive": transfers, parking, late arrivals and step-free help —
 * the logistics questions that otherwise become a phone call, answered in
 * four cards. One column on phones, two on tablets, four from `lg`.
 */
export function ArrivalSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.arrival.eyebrow}
      heading={sections.arrival.heading}
      description={sections.arrival.description}
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
          gap: { xs: 3, md: 4 },
        }}
      >
        {arrivalNotes.map((note, index) => (
          <Reveal key={note.id} index={index} fill>
            <ArrivalNoteCard note={note} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
