"use client";

import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface BookingSummarySegmentProps {
  /** Read by assistive tech in place of the visible value, e.g. "Change dates". */
  label: string;
  value: string;
  expanded: boolean;
  controls: string;
  onClick: () => void;
}

/**
 * One tappable chunk of the collapsed bar — the dates, or the guests. A real
 * `<button>` with `aria-expanded`/`aria-controls`, because it is a disclosure
 * for the panel below it and nothing about a styled `<div>` would say so.
 *
 * `minWidth: 0` on the button and `noWrap` on the value are load-bearing: the
 * bar is a flex row, and without them a long date range refuses to shrink and
 * pushes the "Check Availability" button off the end between `md` and `lg`.
 */
export function BookingSummarySegment(props: BookingSummarySegmentProps) {
  const { label, value, expanded, controls, onClick } = props;

  return (
    <Box
      component="button"
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        minWidth: 0,
        px: 3,
        py: 2,
        border: "1px solid transparent",
        borderRadius: 0.5,
        background: "none",
        font: "inherit",
        color: "text.primary",
        cursor: "pointer",
        textAlign: "left",
        transition: "background-color 150ms, border-color 150ms",
        "&:hover": { bgcolor: "action.hover", borderColor: "divider" },
        "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Text component="span" variant="body2" noWrap sx={{ minWidth: 0 }}>
        {value}
      </Text>
      <Icon
        name="expand-more"
        fontSize="small"
        sx={{
          flexShrink: 0,
          color: "text.secondary",
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform 200ms",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      />
    </Box>
  );
}
