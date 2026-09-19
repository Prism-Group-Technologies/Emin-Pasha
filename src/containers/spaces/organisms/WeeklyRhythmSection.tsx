import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { weeklyRhythm } from "@/containers/spaces/copy/rhythm";
import { sections } from "@/containers/spaces/copy/sections";
import { LoungesWhatsAppCta } from "@/containers/spaces/molecules/LoungesWhatsAppCta";
import { RhythmDayCard } from "@/containers/spaces/molecules/RhythmDayCard";
import type { RevealDirection } from "@/theme/motion";

/** The standing week — seven day cards in a row from `lg`, a swipeable strip below it. */
export function WeeklyRhythmSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      bodyMotion={motion}
      eyebrow={sections.rhythm.eyebrow}
      heading={sections.rhythm.heading}
      description={sections.rhythm.description}
      action={<LoungesWhatsAppCta label="Hold a table this week" />}
    >
      <Box
        component="ol"
        aria-label="This week's programme"
        sx={{
          m: 0,
          p: 0,
          pb: { xs: 1, lg: 0 },
          display: "grid",
          gap: 2,
          gridAutoFlow: { xs: "column", lg: "row" },
          gridAutoColumns: { xs: "46%", sm: "30%", md: "22%" },
          gridTemplateColumns: { lg: "repeat(7, minmax(0, 1fr))" },
          overflowX: { xs: "auto", lg: "visible" },
          scrollSnapType: { xs: "x mandatory", lg: "none" },
          "& > li": { scrollSnapAlign: "start" },
        }}
      >
        {weeklyRhythm.map((entry) => (
          <RhythmDayCard key={entry.day} entry={entry} />
        ))}
      </Box>
    </SectionShell>
  );
}
