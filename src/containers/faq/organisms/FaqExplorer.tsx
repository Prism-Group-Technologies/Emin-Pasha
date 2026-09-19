"use client";

import { Box } from "@/components/atoms/Box";
import type { FaqTopicId } from "@/containers/faq/anchors";
import { useFaqExplorer } from "@/containers/faq/hooks/useFaqExplorer";
import { useHelpfulVotes } from "@/containers/faq/hooks/useHelpfulVotes";
import { FaqAnswerList } from "@/containers/faq/molecules/FaqAnswerList";
import { FaqEmptyState } from "@/containers/faq/molecules/FaqEmptyState";
import { FaqExplorerControls } from "@/containers/faq/molecules/FaqExplorerControls";
import type { FaqEntry } from "@/containers/faq/types";

export interface FaqExplorerProps {
  entries: FaqEntry[];
  /** Per-topic WhatsApp URLs, resolved on the server. */
  askHrefs: Record<FaqTopicId, string>;
  /** The untopical WhatsApp URL for the empty state. */
  whatsappHref: string;
}

/**
 * The page's one substantial client island: search, topic filter, the answer
 * accordion and the helpful votes. It wires hooks to presentational molecules
 * and holds no rules of its own — state is `useFaqExplorer`, votes are
 * `useHelpfulVotes`, matching is `faqSearch.ts`.
 */
export function FaqExplorer({ entries, askHrefs, whatsappHref }: FaqExplorerProps) {
  const explorer = useFaqExplorer(entries);
  const { votes, vote } = useHelpfulVotes();

  return (
    <Box sx={{ display: "grid", gap: { xs: 4, md: 5 }, minWidth: 0 }}>
      <FaqExplorerControls
        query={explorer.query}
        onQueryChange={explorer.setQuery}
        topic={explorer.topic}
        onTopicChange={explorer.setTopic}
        options={explorer.options}
        statusText={explorer.statusText}
      />
      {explorer.visible.length > 0 ? (
        <FaqAnswerList
          entries={explorer.visible}
          expanded={explorer.expanded}
          onToggle={explorer.toggle}
          votes={votes}
          onVote={vote}
          askHrefs={askHrefs}
        />
      ) : (
        <FaqEmptyState whatsappHref={whatsappHref} onReset={explorer.clear} />
      )}
    </Box>
  );
}
