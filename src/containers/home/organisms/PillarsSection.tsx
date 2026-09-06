import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { PillarCard } from "@/containers/home/molecules/PillarCard";
import { site } from "@/content/site";
import type { RevealDirection } from "@/theme/motion";

/**
 * History / Culture / Nature / Serenity — the brand, on the page's one dark
 * band.
 *
 * This section was the page's worst dead space: four short paragraphs down a
 * narrow left column with the whole right half of the viewport empty. It is
 * now a 2×2 grid on a contrast band, which does three things at once — it
 * fills the measure, it gives the page the tonal break it had nowhere else,
 * and it lets the brand's gold carry type at size for the only time on the
 * homepage.
 */
export function PillarsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow="§ FOUR PILLARS"
      heading={site.positioning.oneLiner}
      variant="contrast"
      align="center"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
        }}
      >
        {site.pillars.map((pillar, index) => (
          <Reveal key={pillar.name} index={index} fill>
            <PillarCard
              ordinal={index + 1}
              name={pillar.name}
              description={pillar.description}
              cues={pillar.cues}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
