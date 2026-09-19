import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { JOURNEY_ANCHOR_ID } from "@/containers/story/anchors";
import { journeyCopy, sections } from "@/containers/story/copy";
import { JourneyStop } from "@/containers/story/molecules/JourneyStop";
import { story } from "@/content/story";
import type { RevealDirection } from "@/theme/motion";

/**
 * The "Equatorial Line" turned horizontal — DESIGN_DIRECTION.md §B.6's
 * signature element as a scroll-snapping rail. The stops are the seven
 * `story.timeline` chapters, titles verbatim; each links to that chapter of
 * the preserved account. A Server Component — the horizontal scroll is native
 * overflow, no JS.
 */
export function JourneyMapSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={JOURNEY_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.journey.eyebrow}
      heading={sections.journey.heading}
      description={sections.journey.description}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          color: "text.secondary",
          fontFamily: "var(--font-cartographic)",
          fontSize: "0.6875rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span>{journeyCopy.startLabel}</span>
        <span>{journeyCopy.endLabel}</span>
      </Box>
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          pb: 2,
          borderTop: "1px solid",
          borderColor: "primary.main",
          display: "flex",
          gap: { xs: 4, md: 5 },
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          "& > li": { flex: { md: "1 1 0" } },
        }}
      >
        {story.timeline.map((entry, index) => (
          <JourneyStop key={entry.id} index={index + 1} title={entry.title} anchorId={entry.id} />
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        {journeyCopy.note}
      </Text>
    </SectionShell>
  );
}
