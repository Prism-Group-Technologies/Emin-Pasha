"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import type { KudaraQuote } from "@/containers/events/kudaraQuote";
import { radiusTokens, shadowTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

const panelSx = {
  p: { xs: 4, md: 5 },
  border: "1px solid",
  borderColor: "divider",
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  borderRadius: `${radiusTokens.lg}px`,
  bgcolor: "background.default",
  boxShadow: shadowTokens.sm,
  display: "grid",
  gap: 3,
  position: { lg: "sticky" },
  top: { lg: 120 },
} as const;

/**
 * The running "your Kudara day" panel: every priced row, an indicative total
 * and a per-delegate figure, then the hand-off button that seeds the proposal
 * request. Never a checkout — the label says indicative and the copy says a
 * planner confirms.
 */
export function KudaraEstimateSummary({
  quote,
  applied,
  onApply,
}: {
  quote: KudaraQuote;
  applied: boolean;
  onApply: () => void;
}) {
  const hasLines = quote.lines.length > 0;

  return (
    <Box sx={panelSx}>
      <Text variant="overline" component="p" color="text.secondary">
        Your Kudara day so far
      </Text>

      {!hasLines ? (
        <Text variant="body2" color="text.secondary">
          {quote.totalLabel}
        </Text>
      ) : (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
          {quote.lines.map((line) => (
            <Box
              key={line.label}
              component="li"
              sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
            >
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {line.label}
              </Text>
              <Text variant="body2" sx={{ fontFamily: "var(--font-cartographic)", flexShrink: 0 }}>
                {formatUgx(line.amountUgx)}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {hasLines && (
        <Box
          sx={{ pt: 3, borderTop: "1px solid", borderColor: "divider", display: "grid", gap: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
              {quote.totalLabel}
            </Text>
            <Text variant="body2" component="span" color="text.secondary">
              indicative total
            </Text>
          </Box>
          {quote.perDelegateLabel && (
            <Text variant="body2" color="text.secondary">
              ≈ {quote.perDelegateLabel}
            </Text>
          )}
        </Box>
      )}

      <Button onClick={onApply} disabled={!hasLines} fullWidth>
        Add these numbers to my proposal request
      </Button>
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: 40 }}
      >
        {applied
          ? "Added — your numbers are in the form below. Add your dates and contact details to send it."
          : "Nothing is sent yet. This drops the summary into the proposal request for you to finish."}
      </Text>
    </Box>
  );
}
