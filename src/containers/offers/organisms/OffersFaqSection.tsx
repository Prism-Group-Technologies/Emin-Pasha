import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { FaqAccordion } from "@/containers/contact/molecules/FaqAccordion";
import { offersFaq, sections } from "@/containers/offers/copy";
import { TermsCard } from "@/containers/offers/molecules/TermsCard";
import type { RevealDirection } from "@/theme/motion";

const { faq } = sections;

/**
 * Pre-claim questions beside the terms summary — together they replace the
 * old "terms pending" notice. The section and terms card stay on the server;
 * only the accordion's open panel is client state, via the contact page's
 * shared `FaqAccordion`. On desktop the terms card sticks beside the answers.
 */
export function OffersFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      variant="raised"
      motion={motion}
      eyebrow={faq.eyebrow}
      heading={faq.heading}
      description={faq.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <FaqAccordion items={offersFaq} />
        <Box sx={{ position: { md: "sticky" }, top: { md: 112 } }}>
          <TermsCard />
        </Box>
      </Box>
    </SectionShell>
  );
}
