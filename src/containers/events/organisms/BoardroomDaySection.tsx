import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { boardroomDay, boardroomDayNote, boardroomSections } from "@/containers/events/copy";
import { KudaraTimelineRow } from "@/containers/events/molecules/KudaraTimelineRow";
import type { RevealDirection } from "@/theme/motion";

const { day } = boardroomSections;

/**
 * An illustrative full-day board session on the shared run-of-show timeline.
 *
 * It earns its place by selling the absences — no room reset between sessions,
 * no caterer to brief, no drive to lunch, papers left where they lie. Those
 * are the differences a fixed private room makes, and they do not show up in a
 * capacity table.
 */
export function BoardroomDaySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={day.eyebrow}
      heading={day.heading}
      description={day.description}
    >
      <Box sx={{ maxWidth: "72ch" }}>
        {boardroomDay.map((step, index) => (
          <Reveal key={step.time} index={index}>
            <KudaraTimelineRow step={step} last={index === boardroomDay.length - 1} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 5, maxWidth: "68ch" }}>
        {boardroomDayNote}
      </Text>
    </SectionShell>
  );
}
