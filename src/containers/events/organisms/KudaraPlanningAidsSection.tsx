import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { DetailList } from "@/components/molecules/DetailList";
import { SectionShell } from "@/components/templates/SectionShell";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import {
  kudaraFactSheet,
  kudaraPlannerNote,
  kudaraRunOfShow,
  kudaraSections,
} from "@/containers/events/copy";
import { KudaraTimelineRow } from "@/containers/events/molecules/KudaraTimelineRow";
import type { RevealDirection } from "@/theme/motion";

const { planning } = kudaraSections;
const factRows = kudaraFactSheet.map((point, index) => ({
  id: `fact-${index}`,
  label: point.label,
  value: point.value,
}));

/**
 * The planning-aids band: a sample conference-day run of show to react to,
 * beside a one-page fact sheet card and the named-planner promise. The run of
 * show is illustrative, not a committed schedule.
 */
export function KudaraPlanningAidsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={planning.eyebrow}
      heading={planning.heading}
      description={planning.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.1fr) minmax(0, 0.9fr)" },
          gap: { xs: 6, lg: 8 },
          alignItems: "start",
        }}
      >
        <Box>
          <Text variant="overline" component="p" color="text.secondary" sx={{ mb: 4 }}>
            Sample conference day
          </Text>
          <Box sx={{ display: "grid" }}>
            {kudaraRunOfShow.map((step, index) => (
              <KudaraTimelineRow
                key={step.time}
                step={step}
                last={index === kudaraRunOfShow.length - 1}
              />
            ))}
          </Box>
        </Box>

        <Stack spacing={4} sx={cardSurface()}>
          <Text variant="h4" component="h3">
            One-page fact sheet
          </Text>
          <DetailList rows={factRows} />
          <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {kudaraPlannerNote}
          </Text>
          <Button href={`#${ENQUIRE_ANCHOR_ID}`} sx={{ alignSelf: "flex-start" }}>
            Ask for the fact sheet
          </Button>
        </Stack>
      </Box>
    </SectionShell>
  );
}
