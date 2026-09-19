import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { StatBlock } from "@/components/molecules/StatBlock";
import { SectionShell } from "@/components/templates/SectionShell";
import { sections } from "@/containers/gallery/copy/sections";
import { galleryStats } from "@/containers/gallery/copy/stats";
import type { RevealDirection } from "@/theme/motion";

/** Four planning figures on a hairline-divided rail — two-up on a phone, four across from `md`. */
export function GalleryStatsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      topRule
      align="center"
      motion={motion}
      eyebrow={sections.stats.eyebrow}
      heading={sections.stats.heading}
      description={sections.stats.description}
    >
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
          rowGap: 6,
          "& > li + li": { borderInlineStart: { md: "1px solid" }, borderColor: { md: "divider" } },
        }}
      >
        {galleryStats.map((stat, index) => (
          <Box component="li" key={stat.label} sx={{ px: 2 }}>
            <Reveal index={index}>
              <StatBlock value={stat.value} label={stat.label} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
