import { Box } from "@/components/atoms/Box";
import { HeroStat, type HeroStatProps } from "@/components/organisms/PageHero/HeroStat";

const HAIRLINE = "1px solid rgba(251,250,247,0.24)";

export type HeroStatItem = Pick<HeroStatProps, "value" | "label">;

/**
 * The page hero's figure rail: two to four traceable stats on a top hairline,
 * 2-up on mobile and up to 4-up from `sm`. Extracted from `PageHero` so that
 * organism stays inside the repo's per-file line ceiling. Renders nothing when
 * no stats are passed, so `PageHero` carries no branch of its own.
 */
export function HeroStatRail({ stats }: { stats?: HeroStatItem[] }) {
  if (!stats || stats.length === 0) {
    return null;
  }
  const columns = Math.min(stats.length, 4);
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
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: `repeat(${columns}, minmax(0, 1fr))`,
        },
        gap: { xs: 4, md: 5 },
      }}
    >
      {stats.map((stat) => (
        <Box component="li" key={stat.label}>
          <HeroStat value={stat.value} label={stat.label} onDark />
        </Box>
      ))}
    </Box>
  );
}
