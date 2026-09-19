import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { quickAnswers, sections } from "@/containers/faq/copy";
import { QuickAnswerCard } from "@/containers/faq/molecules/QuickAnswerCard";
import type { RevealDirection } from "@/theme/motion";

const { quick } = sections;

/**
 * The six facts most visitors came for, directly under the hero — two-up on a
 * phone, three-up on a tablet, one row of six on a wide screen. Each card
 * jumps to its full answer, so the strip is a shortcut, not a second source.
 */
export function QuickAnswersSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={quick.eyebrow}
      heading={quick.heading}
      description={quick.description}
    >
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(6, minmax(0, 1fr))",
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {quickAnswers.map((answer, index) => (
          <Box component="li" key={answer.id}>
            <Reveal index={index} fill>
              <QuickAnswerCard answer={answer} readMore={quick.readMore} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
