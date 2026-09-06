"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import type { BookingSummary } from "@/containers/booking/hooks/useBookingSummary";
import { BookingSummarySegment } from "@/containers/booking/molecules/BookingSummarySegment";
import type { BookingCopy } from "@/schemas/content/booking";

export interface StickySummaryRowProps {
  copy: BookingCopy;
  summary: BookingSummary;
  expanded: boolean;
  panelId: string;
  submitting: boolean;
  onToggle: () => void;
}

/**
 * The collapsed bar: what the guest has chosen, and the one button that acts
 * on it. Roughly 60px tall against the ~250px the bar used to take, which was
 * the whole complaint — a persistent bar earns its place by *restating* the
 * search, not by carrying a second copy of the form.
 *
 * The CTA is `type="submit"` on the enclosing form, so the common case — a
 * guest happy with the dates already showing — is one click, not open-then-
 * submit. The segments beside it are the way in for anyone who wants to change
 * something first.
 */
export function StickySummaryRow(props: StickySummaryRowProps) {
  const { copy, summary, expanded, panelId, submitting, onToggle } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1, lg: 2 }, minWidth: 0 }}>
      <Text
        variant="overline"
        component="p"
        sx={{
          fontFamily: "var(--font-cartographic)",
          color: "text.secondary",
          whiteSpace: "nowrap",
          display: { md: "none", lg: "block" },
          mr: 1,
        }}
      >
        {copy.summary.label}
      </Text>

      <BookingSummarySegment
        label={copy.summary.editDates}
        value={summary.dates}
        expanded={expanded}
        controls={panelId}
        onClick={onToggle}
      />

      <Text
        variant="body2"
        component="span"
        sx={{ color: "text.secondary", whiteSpace: "nowrap", display: { md: "none", lg: "block" } }}
      >
        {summary.nights}
      </Text>

      <BookingSummarySegment
        label={copy.summary.editGuests}
        value={summary.guests}
        expanded={expanded}
        controls={panelId}
        onClick={onToggle}
      />

      <Box sx={{ flex: 1 }} />

      <Button type="submit" loading={submitting} sx={{ flexShrink: 0, whiteSpace: "nowrap" }}>
        {submitting ? copy.actions.submitting : copy.actions.submit}
      </Button>
    </Box>
  );
}
