"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { FareBreakdown } from "@/containers/experiences/transfer/molecules/FareBreakdown";
import type { TransferQuote } from "@/containers/experiences/transfer/transferQuote";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const p = bookingFormCopy.panel;

const panelSx = {
  p: { xs: 4, md: 5 },
  display: "grid",
  gap: 3,
  border: "1px solid",
  borderColor: "divider",
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  borderRadius: `${radiusTokens.lg}px`,
  bgcolor: "background.default",
  boxShadow: shadowTokens.sm,
  position: { lg: "sticky" },
  top: { lg: 120 },
} as const;

/**
 * The running "your transfer" panel: the fare breakdown, then the submit
 * button, the no-card reassurance, a WhatsApp alternative and the
 * `aria-live` result line with a reserved height so nothing shifts when it
 * arrives. Sticky from `lg`, so the fare stays in view while the details are
 * filled in.
 *
 * `whatsappHref` arrives as a plain string from the server section, so the
 * content layer never enters this bundle (D25).
 */
export function TransferQuotePanel({
  quote,
  submitting,
  result,
  whatsappHref,
}: {
  quote: TransferQuote;
  submitting: boolean;
  result: string | null;
  whatsappHref: string;
}) {
  return (
    <Box component="aside" aria-label={p.eyebrow} sx={panelSx}>
      <Text variant="overline" component="p" color="text.secondary">
        {p.eyebrow}
      </Text>

      <FareBreakdown quote={quote} />

      <Button type="submit" loading={submitting} size="large" fullWidth>
        {submitting ? p.submitting : p.submit}
      </Button>
      <Text variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
        {p.reassurance}
      </Text>
      <Link
        href={whatsappHref}
        variant="body2"
        underline="hover"
        aria-label={`${p.whatsapp}${NEW_TAB_NOTE}`}
        sx={{ display: "inline-flex", alignItems: "center", gap: 1, justifySelf: "center" }}
      >
        <Icon name="whatsapp" fontSize="small" aria-hidden />
        {p.whatsapp}
      </Link>
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
