"use client";

import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { OFFERS_ANCHOR_ID } from "@/containers/offers/anchors";
// Leaf module, not the `copy` barrel, so only the strings this bar needs ship to the client.
import { sections } from "@/containers/offers/copy/sections";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { useStickyCtaReveal } from "@/containers/wellness/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

const { sticky } = sections;

/**
 * The page's sticky "claim" pill — the Offers twin of the wellness
 * `StickyCtaBar`, reusing its scroll-reveal hook. Client because it watches
 * the scroll position; the WhatsApp href arrives as a plain string from the
 * server wrapper (DECISIONS.md D25).
 *
 * Desktop only, from `lg`: below that the sitewide mobile `StickyActionBar`
 * already pins Book / Call / WhatsApp. Bottom-centred, clear of the corner
 * FABs, and `position: fixed`, so it adds nothing to CLS.
 */
export function OffersStickyBar({ whatsappHref }: { whatsappHref: string }) {
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
      <ClaimOnWhatsApp href={whatsappHref} label={sticky.claim} size="small" />
      <Link href={`#${OFFERS_ANCHOR_ID}`} variant="body2" underline="hover">
        {sticky.browse}
      </Link>
    </Box>
  );
}
