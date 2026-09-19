"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { BOOKING_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { useStickyCtaReveal } from "@/containers/wellness/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

const FROM = formatUsd(Math.min(...vehicles.map((vehicle) => vehicle.transferUsd)));

/**
 * The transfer page's sticky "book" pill. Reuses the wellness
 * `useStickyCtaReveal` (rAF-throttled, passive scroll) rather than adding a
 * sixth copy of the same hook. Desktop only, from `lg` — below that the
 * sitewide mobile `StickyActionBar` already pins Book / Call / WhatsApp —
 * and bottom-centred so it never collides with the corner FAB dock. The
 * WhatsApp href arrives as a plain string from the server wrapper (D25).
 */
export function StickyTransferBar({ whatsappHref }: { whatsappHref: string }) {
  const visible = useStickyCtaReveal();

  return (
    <Box
      aria-hidden={!visible}
      sx={{
        position: "fixed",
        left: "50%",
        bottom: 24,
        zIndex: zIndexTokens.appBar,
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        gap: 3,
        px: 4,
        py: 2,
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: shadowTokens.lg,
        transition:
          "transform 260ms cubic-bezier(0.16,1,0.3,1), opacity 260ms cubic-bezier(0.16,1,0.3,1)",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 140%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        "@media (prefers-reduced-motion: reduce)": { transition: "opacity 260ms linear" },
      }}
    >
      <Icon name="flight" aria-hidden sx={{ color: "primary.main" }} />
      <Text variant="body2" sx={{ fontWeight: 600 }}>
        Landing soon? Fixed fares from {FROM} —
      </Text>
      <Button href={`#${BOOKING_ANCHOR_ID}`} size="small" tabIndex={visible ? 0 : -1}>
        Book your transfer
      </Button>
      <Link
        href={whatsappHref}
        variant="body2"
        underline="hover"
        tabIndex={visible ? 0 : -1}
        aria-label={`or WhatsApp us${NEW_TAB_NOTE}`}
      >
        or WhatsApp us
      </Link>
    </Box>
  );
}
