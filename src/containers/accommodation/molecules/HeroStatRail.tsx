import { Box } from "@/components/atoms/Box";
import type { HeroStatCopy } from "@/containers/accommodation/copy";
import { RoomStat } from "@/containers/accommodation/molecules/RoomStat";

const HAIRLINE = "1px solid rgba(251,250,247,0.24)";

/**
 * The hero's figure rail: the traceable stats from `copy/hero.ts`, each in
 * its `onDark` `RoomStat` form, on a top hairline. 2-up on mobile, 4-up from
 * `sm`. Extracted from `AccommodationHero` so that organism stays inside the
 * repo's per-file line ceiling once the shell/CTA blocks are counted.
 */
export function HeroStatRail({ stats }: { stats: HeroStatCopy[] }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        pt: { xs: 4, md: 5 },
        borderTop: HAIRLINE,
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))" },
        gap: { xs: 4, md: 5 },
      }}
    >
      {stats.map((stat) => (
        <Box component="li" key={stat.label}>
          <RoomStat value={stat.value} label={stat.label} onDark />
        </Box>
      ))}
    </Box>
  );
}
