"use client";

import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { QUESTIONS_ANCHOR_ID } from "@/containers/faq/anchors";
import { sections } from "@/containers/faq/copy/sections";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { useStickyCtaReveal } from "@/containers/wellness/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

const { sticky } = sections;

/**
 * The FAQ's sticky "ask" pill — the twin of `OffersStickyBar`, reusing the
 * wellness scroll-reveal hook. Client because it watches the scroll position;
 * the WhatsApp href arrives as a plain string from the server wrapper
 * (DECISIONS.md D25).
 *
 * Desktop only, from `lg`: below that the sitewide mobile `StickyActionBar`
 * already pins Book / Call / WhatsApp. `position: fixed`, so no CLS.
 */
export function FaqStickyBar({ whatsappHref }: { whatsappHref: string }) {
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
        {sticky.lead}
      </Text>
      <ClaimOnWhatsApp href={whatsappHref} label={sticky.whatsapp} size="small" />
      <Link
        href={`#${QUESTIONS_ANCHOR_ID}`}
        variant="body2"
        underline="hover"
        tabIndex={visible ? undefined : -1}
      >
        {sticky.search}
      </Link>
    </Box>
  );
}
