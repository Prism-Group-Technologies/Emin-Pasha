import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { GUIDES_ANCHOR_ID } from "@/containers/faq/anchors";
import { faqById } from "@/containers/faq/catalogue";
import { faqGuideAsset, faqGuides, sections } from "@/containers/faq/copy";
import { GuideCard } from "@/containers/faq/molecules/GuideCard";
import type { FaqEntry } from "@/containers/faq/types";
import type { RevealDirection } from "@/theme/motion";

const { guides } = sections;

const questionsFor = (ids: string[]) =>
  ids.map(faqById).filter((entry): entry is FaqEntry => Boolean(entry));

/**
 * Cross-sell out of the answers: four guide cards (arrive, eat, unwind,
 * gather), each pairing a pitch with its related questions and a CTA into
 * that part of the site. One column on a phone, 2×2 on a tablet, four-up wide.
 */
export function PlanYourStaySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={GUIDES_ANCHOR_ID}
      motion={motion}
      eyebrow={guides.eyebrow}
      heading={guides.heading}
      description={guides.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {faqGuides.map((guide, index) => (
          <Reveal key={guide.id} index={index} fill>
            <GuideCard
              guide={guide}
              asset={faqGuideAsset(guide.id)}
              questions={questionsFor(guide.questionIds)}
              relatedLabel={guides.relatedLabel}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
