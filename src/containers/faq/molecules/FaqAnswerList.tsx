"use client";

import { useMemo } from "react";

import { Accordion, type AccordionItem } from "@/components/molecules/Accordion";
import type { FaqTopicId } from "@/containers/faq/anchors";
import type { HelpfulVote, HelpfulVotes } from "@/containers/faq/hooks/useHelpfulVotes";
import { FaqPanelFooter } from "@/containers/faq/molecules/FaqPanelFooter";
import type { FaqEntry } from "@/containers/faq/types";

export interface FaqAnswerListProps {
  entries: FaqEntry[];
  expanded: string | false;
  onToggle: (id: string) => void;
  votes: HelpfulVotes;
  onVote: (id: string, value: HelpfulVote) => void;
  askHrefs: Record<FaqTopicId, string>;
}

/**
 * The visible answers as the shared soft accordion, each panel anchored at its
 * own id and carrying the vote + WhatsApp footer. Presentational: every value
 * and handler arrives from the explorer's hooks.
 *
 * Collapsed answers stay in the DOM (MUI's `Collapse` hides, it does not
 * unmount), so every answer on the server-rendered page remains crawlable.
 */
export function FaqAnswerList({
  entries,
  expanded,
  onToggle,
  votes,
  onVote,
  askHrefs,
}: FaqAnswerListProps) {
  const byId = useMemo(() => new Map(entries.map((entry) => [entry.id, entry])), [entries]);

  const renderFooter = (item: AccordionItem) => {
    const entry = byId.get(item.id);
    if (!entry) {
      return null;
    }
    return (
      <FaqPanelFooter
        entry={entry}
        vote={votes[entry.id]}
        onVote={(value) => onVote(entry.id, value)}
        askHref={askHrefs[entry.topic]}
      />
    );
  };

  return (
    <Accordion
      variant="soft"
      anchored
      items={entries}
      expanded={expanded}
      onChange={onToggle}
      renderFooter={renderFooter}
    />
  );
}
