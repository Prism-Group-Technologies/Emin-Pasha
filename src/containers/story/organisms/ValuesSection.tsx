import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { sections, storyValues } from "@/containers/story/copy";
import { ValueCard } from "@/containers/story/molecules/ValueCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * "What we take from it" as a four-up card band. Each `title` is a phrase of
 * `story.whatWeTakeFromIt` verbatim; the body under it is the invented gloss.
 */
export function ValuesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.values.eyebrow}
      heading={sections.values.heading}
      description={sections.values.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {storyValues.map((value, index) => (
          <Reveal key={value.id} index={index} fill>
            <ValueCard value={value} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
