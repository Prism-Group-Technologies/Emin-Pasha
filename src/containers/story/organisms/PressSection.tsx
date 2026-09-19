import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { pressQuotes, sections } from "@/containers/story/copy";
import { PressQuote } from "@/containers/story/molecules/PressQuote";
import type { RevealDirection } from "@/theme/motion";

/**
 * A placeholder recognition strip. Every quote is attributed to the literal
 * word "placeholder" (see `copy/press.ts`) so it cannot be read as genuine
 * coverage — replaced wholesale once confirmed press and any awards land.
 */
export function PressSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.press.eyebrow}
      heading={sections.press.heading}
      description={sections.press.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {pressQuotes.map((item, index) => (
          <Reveal key={item.id} index={index} fill>
            <PressQuote item={item} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
