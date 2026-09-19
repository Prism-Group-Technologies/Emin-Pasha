import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { NAMED_AFTER_ANCHOR_ID } from "@/containers/story/anchors";
import { namedAfter, sections } from "@/containers/story/copy";
import { NamedAfterCard } from "@/containers/story/molecules/NamedAfterCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The internal-linking spine as a card band — the pillar page passes its
 * authority to the commercial pages that carry names from the story
 * (CLAUDE.md §9). Names and attributions come from the record; the nudges
 * are invented.
 */
export function NamedAfterSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={NAMED_AFTER_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.namedAfter.eyebrow}
      heading={sections.namedAfter.heading}
      description={sections.namedAfter.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {namedAfter.map((link, index) => (
          <Reveal key={link.id} index={index} fill>
            <NamedAfterCard link={link} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
