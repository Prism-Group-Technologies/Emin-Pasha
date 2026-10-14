import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { boardroomSections, boardroomSpec, boardroomSpecNote } from "@/containers/events/copy";
import { SpecGroupCard } from "@/containers/events/molecules/SpecGroupCard";
import type { RevealDirection } from "@/theme/motion";

const { technology } = boardroomSections;

/**
 * The room's technology and service spec in six scannable groups, rendered
 * with the same card Kudara Hall uses for its production spec.
 *
 * This is the band that answers the question an executive assistant actually
 * has — will the laptop connect, will the far end hear us, who brings the
 * coffee. Panel and connectivity figures are indicative placeholders; the note
 * under the grid says so.
 */
export function BoardroomTechnologySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      variant="raised"
      eyebrow={technology.eyebrow}
      heading={technology.heading}
      description={technology.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {boardroomSpec.map((group, index) => (
          <Reveal key={group.id} index={index} fill>
            <SpecGroupCard group={group} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {boardroomSpecNote}
      </Text>
    </SectionShell>
  );
}
