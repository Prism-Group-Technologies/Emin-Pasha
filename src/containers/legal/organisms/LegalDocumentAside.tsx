import { Box } from "@/components/atoms/Box";
import { DOCUMENT_ANCHOR_ID, LEGAL_TOPIC_PHRASE } from "@/containers/legal/anchors";
import { legalLinks } from "@/containers/legal/catalogue";
import { legalSections } from "@/containers/legal/copy";
import { LegalAskCard } from "@/containers/legal/molecules/LegalAskCard";
import { LegalDocSwitcher } from "@/containers/legal/molecules/LegalDocSwitcher";
import { LegalTocNav } from "@/containers/legal/molecules/LegalTocNav";
import type { LegalDocument } from "@/containers/legal/types";
import { telephoneUrl, whatsappLegalTopicUrl } from "@/lib/directions";

const { document: copy } = legalSections;

/**
 * The document's sticky rail: contents with reading progress, then — from
 * `md` up — the jump list to the other legal pages and the ask card. On a
 * phone only the contents show, above the article; the closing band and the
 * related band carry the rest.
 */
export function LegalDocumentAside({ document }: { document: LegalDocument }) {
  const items = document.sections.map((section) => ({ id: section.id, title: section.title }));

  return (
    <Box
      sx={{
        alignSelf: "start",
        position: { md: "sticky" },
        // Clears the header plus its "Your stay" booking bar (~118px).
        top: { md: 150 },
        maxHeight: { md: "calc(100vh - 174px)" },
        overflowY: { md: "auto" },
        display: "grid",
        gap: 6,
        pr: { md: 2 },
      }}
    >
      <LegalTocNav
        items={items}
        label={copy.tocLabel}
        progressLabel={copy.progressLabel}
        documentId={DOCUMENT_ANCHOR_ID}
      />
      <Box sx={{ display: { xs: "none", md: "grid" }, gap: 6 }}>
        <LegalDocSwitcher links={legalLinks} currentId={document.id} label={copy.switcherLabel} />
        <LegalAskCard
          whatsappHref={whatsappLegalTopicUrl(LEGAL_TOPIC_PHRASE[document.id])}
          telephoneHref={telephoneUrl}
        />
      </Box>
    </Box>
  );
}
