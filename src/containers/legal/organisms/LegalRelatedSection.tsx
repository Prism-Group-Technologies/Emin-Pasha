import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import type { LegalPageId } from "@/containers/legal/anchors";
import { legalLinks } from "@/containers/legal/catalogue";
import { legalSections } from "@/containers/legal/copy";
import { LegalLinkCard } from "@/containers/legal/molecules/LegalLinkCard";
import type { RevealDirection } from "@/theme/motion";

const { related } = legalSections;

export interface LegalRelatedSectionProps {
  currentId: LegalPageId;
  planHrefs: string[];
  motion?: { related: RevealDirection; plan: RevealDirection };
}

/**
 * Two exits: every legal page as a card (the current one marked), then a
 * "keep planning" row back into the site — so a visitor who arrived to check
 * a policy leaves looking at rooms or offers rather than the back button.
 */
export function LegalRelatedSection({ currentId, planHrefs, motion }: LegalRelatedSectionProps) {
  return (
    <>
      <SectionShell
        topRule
        motion={motion?.related}
        eyebrow={related.eyebrow}
        heading={related.heading}
      >
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {legalLinks.map((link, index) => (
            <Box component="li" key={link.id}>
              <Reveal index={index} fill>
                <LegalLinkCard
                  link={link}
                  current={link.id === currentId}
                  currentLabel={related.current}
                />
              </Reveal>
            </Box>
          ))}
        </Box>
      </SectionShell>
      <SectionShell
        variant="raised"
        motion={motion?.plan}
        eyebrow={related.planEyebrow}
        heading={related.planHeading}
      >
        <RelatedLinks hrefs={planHrefs} />
      </SectionShell>
    </>
  );
}
