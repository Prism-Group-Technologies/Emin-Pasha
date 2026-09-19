"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { sections } from "@/containers/faq/copy/sections";
import type { FaqTopicFilter, FaqTopicOption } from "@/containers/faq/faqSearch";
import { FaqSearchField } from "@/containers/faq/molecules/FaqSearchField";
import { FaqTopicChips } from "@/containers/faq/molecules/FaqTopicChips";

const { questions } = sections;

export interface FaqExplorerControlsProps {
  query: string;
  onQueryChange: (value: string) => void;
  topic: FaqTopicFilter;
  onTopicChange: (value: FaqTopicFilter) => void;
  options: FaqTopicOption[];
  statusText: string;
}

/**
 * Search box, topic chips and the live result line, stacked above the
 * answers. The result line is a polite live region, so a screen-reader user
 * hears the count change as they type without losing focus.
 */
export function FaqExplorerControls(props: FaqExplorerControlsProps) {
  return (
    <Box sx={{ display: "grid", gap: 3, minWidth: 0 }}>
      <FaqSearchField
        value={props.query}
        onChange={props.onQueryChange}
        label={questions.searchLabel}
        placeholder={questions.searchPlaceholder}
        clearLabel={questions.clearSearch}
      />
      <FaqTopicChips
        options={props.options}
        value={props.topic}
        onChange={props.onTopicChange}
        label={questions.topicsLabel}
      />
      <Text role="status" aria-live="polite" variant="body2" color="text.secondary">
        {props.statusText}
      </Text>
    </Box>
  );
}
