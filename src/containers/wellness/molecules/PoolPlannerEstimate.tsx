"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import type { PoolQuote } from "@/containers/wellness/poolQuote";
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
 * The running "your pool day" panel: each priced row, an indicative total (or
 * the enquiry note for private hire), then the submit button and the
 * `aria-live` result line. The total is never a checkout — the label says
 * indicative and the copy says a person confirms.
 */
export function PoolPlannerEstimate({
  quote,
  submitting,
  result,
}: {
  quote: PoolQuote;
  submitting: boolean;
  result: string | null;
}) {
  return (
    <Box sx={panelSx}>
      <Text variant="overline" component="p" color="text.secondary">
        Your pool day so far
      </Text>

      {quote.lines.length === 0 ? (
        <Text variant="body2" color="text.secondary">
          {quote.isEnquiryOnly
            ? "Private hire is quoted by hand — send your date and numbers and we will price it."
            : quote.totalLabel}
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

      {!quote.isEnquiryOnly && quote.lines.length > 0 && (
        <Box
          sx={{
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
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
      )}

      <Button type="submit" loading={submitting} fullWidth>
        {submitting ? "Sending…" : "Send my plan to the wellness desk"}
      </Button>
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: 40 }}
      >
        {result}
      </Text>
    </Box>
  );
}
