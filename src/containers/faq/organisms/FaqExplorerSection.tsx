import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import {
  FAQ_TOPIC_ORDER,
  FAQ_TOPIC_PHRASE,
  type FaqTopicId,
  QUESTIONS_ANCHOR_ID,
} from "@/containers/faq/anchors";
import { faqCatalogue } from "@/containers/faq/catalogue";
import { sections } from "@/containers/faq/copy";
import { FaqExplorer } from "@/containers/faq/organisms/FaqExplorer";
import { FaqExplorerAside } from "@/containers/faq/organisms/FaqExplorerAside";
import { whatsappFaqTopicUrl, whatsappFaqUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { questions } = sections;

/** Resolved here so `lib/directions` and the content layer stay off the client. */
const askHrefs = Object.fromEntries(
  FAQ_TOPIC_ORDER.map((topic) => [topic, whatsappFaqTopicUrl(FAQ_TOPIC_PHRASE[topic])]),
) as Record<FaqTopicId, string>;

/**
 * The heart of the page, `#questions`: the searchable explorer beside the
 * sticky aside. A Server Component that hands the catalogue and resolved
 * WhatsApp URLs to the client island as plain props (DECISIONS.md D25). The
 * aside drops below the answers under `lg`.
 */
export function FaqExplorerSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={QUESTIONS_ANCHOR_ID}
      variant="raised"
      motion={motion}
      eyebrow={questions.eyebrow}
      heading={questions.heading}
      description={questions.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 1fr) 360px" },
          gap: { xs: 6, lg: 8 },
          alignItems: "start",
        }}
      >
        <FaqExplorer entries={faqCatalogue} askHrefs={askHrefs} whatsappHref={whatsappFaqUrl} />
        <FaqExplorerAside />
      </Box>
    </SectionShell>
  );
}
