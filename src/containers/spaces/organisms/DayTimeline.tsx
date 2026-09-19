"use client";

import { Box } from "@/components/atoms/Box";
import { useDayPart } from "@/containers/spaces/hooks/useDayPart";
import { DayMomentCard } from "@/containers/spaces/molecules/DayMomentCard";
import { DayPartToggle } from "@/containers/spaces/molecules/DayPartToggle";

/**
 * The day / evening timeline. Four moments per half, on a gold rule that runs
 * horizontally from `md` and becomes a snap-scrolling row on a phone.
 *
 * 'use client' justification: the toggle state (`useDayPart`). The moments are
 * import-free `copy/`, so no content layer crosses the boundary.
 */
export function DayTimeline() {
  const { part, setPart, moments } = useDayPart();

  return (
    <Box sx={{ display: "grid", gap: 5 }}>
      <DayPartToggle value={part} onChange={setPart} />
      <Box
        component="ol"
        aria-live="polite"
        sx={{
          m: 0,
          p: 0,
          position: "relative",
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridAutoFlow: { xs: "column", md: "row" },
          gridAutoColumns: { xs: "78%", sm: "45%" },
          gridTemplateColumns: { md: "repeat(4, minmax(0, 1fr))" },
          overflowX: { xs: "auto", md: "visible" },
          scrollSnapType: { xs: "x mandatory", md: "none" },
          "& > li": { scrollSnapAlign: "start" },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 5,
            left: 0,
            right: 0,
            height: "1px",
            bgcolor: "primary.main",
            opacity: 0.5,
          },
        }}
      >
        {moments.map((moment) => (
          <DayMomentCard key={moment.id} moment={moment} />
        ))}
      </Box>
    </Box>
  );
}
