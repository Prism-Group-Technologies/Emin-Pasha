import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { DOCUMENT_ANCHOR_ID, LEGAL_TOPIC_PHRASE } from "@/containers/legal/anchors";
import { legalSections } from "@/containers/legal/copy";
import { LegalSectionArticle } from "@/containers/legal/molecules/LegalSectionArticle";
import { LegalDocumentAside } from "@/containers/legal/organisms/LegalDocumentAside";
import type { LegalDocument } from "@/containers/legal/types";
import { whatsappLegalTopicUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

export interface LegalDocumentSectionProps {
  document: LegalDocument;
  motion?: RevealDirection;
}

/**
 * The full document: a sticky contents rail beside numbered sections held to
 * a comfortable reading measure. The article element carries
 * `DOCUMENT_ANCHOR_ID`, which is what the reading-progress bar tracks.
 */
export function LegalDocumentSection({ document, motion = "up" }: LegalDocumentSectionProps) {
  const askHref = whatsappLegalTopicUrl(LEGAL_TOPIC_PHRASE[document.id]);

  return (
    <SectionShell
      variant="raised"
      motion={motion}
      eyebrow={legalSections.document.eyebrow}
      heading={document.navLabel}
      description={`${legalSections.hero.updated}: ${document.updated} · ${legalSections.hero.version} ${document.version}`}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "260px minmax(0, 1fr)",
            lg: "300px minmax(0, 1fr)",
          },
          gap: { xs: 6, md: 8, lg: 10 },
        }}
      >
        <LegalDocumentAside document={document} />
        <Box
          component="article"
          id={DOCUMENT_ANCHOR_ID}
          aria-label={document.navLabel}
          sx={{
            display: "grid",
            gap: { xs: 6, md: 7 },
            maxWidth: "74ch",
            minWidth: 0,
            scrollMarginTop: 150,
          }}
        >
          {document.sections.map((section, index) => (
            <LegalSectionArticle
              key={section.id}
              section={section}
              number={index + 1}
              askHref={askHref}
              askLabel={legalSections.document.askSection}
            />
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
