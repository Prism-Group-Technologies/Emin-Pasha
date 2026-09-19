"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
// Leaf module, not the `copy` barrel, so only these strings ship to the client.
import { sections } from "@/containers/faq/copy/sections";
import type { HelpfulVote } from "@/containers/faq/hooks/useHelpfulVotes";

const { helpful } = sections;

export interface HelpfulVoteRowProps {
  question: string;
  value?: HelpfulVote;
  onVote: (value: HelpfulVote) => void;
}

const OPTIONS: Array<{ value: HelpfulVote; icon: IconName; label: string }> = [
  { value: "yes", icon: "thumb-up", label: helpful.yes },
  { value: "no", icon: "thumb-down", label: helpful.no },
];

/**
 * "Was this helpful?" with two pressed-state toggles and a polite thank-you.
 * Presentational — the vote lives in `useHelpfulVotes`. Each button's
 * accessible name starts with its visible label and adds the question, so a
 * screen reader can tell forty "Yes" buttons apart.
 */
export function HelpfulVoteRow({ question, value, onVote }: HelpfulVoteRowProps) {
  const thanks = { yes: helpful.thanksYes, no: helpful.thanksNo };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
      <Text variant="body2" component="span" color="text.secondary">
        {helpful.prompt}
      </Text>
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          size="small"
          variant={value === option.value ? "primary" : "ghost"}
          aria-pressed={value === option.value}
          aria-label={`${option.label}: ${question}`}
          startIcon={<Icon name={option.icon} fontSize="small" />}
          onClick={() => onVote(option.value)}
          sx={{ borderRadius: 999, minWidth: 0 }}
        >
          {option.label}
        </Button>
      ))}
      <Text
        role="status"
        variant="body2"
        component="span"
        sx={{ flexBasis: { xs: "100%", sm: "auto" } }}
      >
        {value ? thanks[value] : ""}
      </Text>
    </Box>
  );
}
