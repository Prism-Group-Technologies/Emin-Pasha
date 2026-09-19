"use client";

import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import type { TransferQuote } from "@/containers/experiences/transfer/transferQuote";

const p = bookingFormCopy.panel;
const rowSx = { display: "flex", justifyContent: "space-between", gap: 3 } as const;

/**
 * The priced rows of a transfer quote, the indicative total, and — when the
 * long-stay benefit applies — a success-toned note saying why the airport
 * fare reads US$0. Presentational; the numbers come from `transferQuote.ts`.
 */
export function FareBreakdown({ quote }: { quote: TransferQuote }) {
  if (quote.lines.length === 0) {
    return (
      <Text variant="body2" color="text.secondary">
        {p.empty}
      </Text>
    );
  }

  return (
    <>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {quote.lines.map((line) => (
          <Box key={line.label} component="li" sx={rowSx}>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {line.label}
            </Text>
            <Text variant="body2" sx={{ fontFamily: "var(--font-cartographic)", flexShrink: 0 }}>
              {formatUsd(line.amountUsd)}
            </Text>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          ...rowSx,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          alignItems: "baseline",
        }}
      >
        <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.75rem" }}>
          {quote.totalLabel}
        </Text>
        <Text variant="body2" component="span" color="text.secondary">
          {p.total}
        </Text>
      </Box>

      {quote.complimentary && (
        <Box sx={{ display: "flex", gap: 2, color: "success.main" }}>
          <Icon name="check-circle" fontSize="small" aria-hidden />
          <Text variant="body2" sx={{ color: "inherit" }}>
            {p.complimentary}
          </Text>
        </Box>
      )}
    </>
  );
}
