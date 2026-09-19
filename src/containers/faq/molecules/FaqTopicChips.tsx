"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { FAQ_TOPIC_ICON } from "@/containers/faq/anchors";
import type { FaqTopicFilter, FaqTopicOption } from "@/containers/faq/faqSearch";

export interface FaqTopicChipsProps {
  options: FaqTopicOption[];
  value: FaqTopicFilter;
  onChange: (value: FaqTopicFilter) => void;
  label: string;
}

/**
 * The topic filter as pill toggles, each with an icon and its live count
 * under the current search. A topic the search has emptied is disabled rather
 * than hidden, so the row never jumps as the visitor types. On a phone the
 * row scrolls sideways — the same treatment as the Offers filter.
 */
export function FaqTopicChips({ options, value, onChange, label }: FaqTopicChipsProps) {
  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: { xs: "nowrap", md: "wrap" },
        overflowX: { xs: "auto", md: "visible" },
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        pb: { xs: 1, md: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            variant={active ? "primary" : "ghost"}
            size="small"
            aria-pressed={active}
            disabled={!active && option.count === 0}
            onClick={() => onChange(option.value)}
            startIcon={
              option.value === "all" ? undefined : <Icon name={FAQ_TOPIC_ICON[option.value]} />
            }
            sx={{ flexShrink: 0, borderRadius: 999, whiteSpace: "nowrap" }}
          >
            {`${option.label} · ${option.count}`}
          </Button>
        );
      })}
    </Box>
  );
}
