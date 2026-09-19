"use client";

import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { FAQ_TOPIC_ICON, FAQ_TOPIC_LABEL } from "@/containers/faq/anchors";
import { sections } from "@/containers/faq/copy/sections";
import type { HelpfulVote } from "@/containers/faq/hooks/useHelpfulVotes";
import { HelpfulVoteRow } from "@/containers/faq/molecules/HelpfulVoteRow";
import type { FaqEntry } from "@/containers/faq/types";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";

const { questions } = sections;

export interface FaqPanelFooterProps {
  entry: FaqEntry;
  vote?: HelpfulVote;
  onVote: (value: HelpfulVote) => void;
  /** The resolved per-topic WhatsApp URL — never built on the client. */
  askHref: string;
}

/**
 * What sits under an open answer: its topic and "Most asked" tags, the
 * helpful vote, and a topic-named WhatsApp hand-off. A "No" vote promotes the
 * hand-off to a filled button — the moment a visitor says the answer fell
 * short is the moment to offer a person.
 */
export function FaqPanelFooter({ entry, vote, onVote, askHref }: FaqPanelFooterProps) {
  return (
    <Box
      sx={{
        mt: 4,
        pt: 3,
        borderTop: "1px dashed",
        borderColor: "divider",
        display: "grid",
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        <Chip
          size="small"
          variant="outlined"
          icon={<Icon name={FAQ_TOPIC_ICON[entry.topic]} fontSize="small" />}
          label={FAQ_TOPIC_LABEL[entry.topic]}
        />
        {entry.popular && (
          <Chip
            size="small"
            icon={<Icon name="auto-awesome" fontSize="small" />}
            label={questions.popularBadge}
            sx={{ bgcolor: "rgba(196,168,50,0.16)", color: "text.primary" }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <HelpfulVoteRow question={entry.question} value={vote} onVote={onVote} />
        <ClaimOnWhatsApp
          href={askHref}
          label={questions.askAbout}
          offerTitle={entry.question}
          size="small"
          variant={vote === "no" ? "primary" : "ghost"}
        />
      </Box>
    </Box>
  );
}
