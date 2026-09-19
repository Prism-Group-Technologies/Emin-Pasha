"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { useStickyCtaReveal } from "@/containers/events/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

/**
 * The visible half of the events funnel's sticky "enquire" bar. Client
 * because it watches the scroll position (`useStickyCtaReveal`); the WhatsApp
 * href arrives as a plain string from the server wrapper, so the Zod-validated
 * content layer never crosses this boundary (DECISIONS.md D25) — the same
 * split `wellness/molecules/StickyCtaBar` uses.
 *
 * Desktop only, from `lg`: below that the sitewide mobile `StickyActionBar`
 * already pins the primary actions. Bottom-centred, `position: fixed`, so it
 * is out of flow and adds nothing to CLS.
 */
export function StickyEnquireBar({ whatsappHref }: { whatsappHref: string }) {
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
      <Text variant="body2" sx={{ fontWeight: 600 }}>
        Planning an event?
      </Text>
      <Button href={`#${ENQUIRE_ANCHOR_ID}`} size="small">
        Request a proposal
      </Button>
      <Link
        href={whatsappHref}
        variant="body2"
        underline="hover"
        aria-label={`Message the events team on WhatsApp${NEW_TAB_NOTE}`}
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
      >
        <Icon name="whatsapp" fontSize="small" aria-hidden />
        or message us
      </Link>
    </Box>
  );
}
