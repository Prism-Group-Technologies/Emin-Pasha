"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { MATCHER_ANCHOR_ID } from "@/containers/spaces/anchors";
import { useStickyCtaReveal } from "@/containers/wellness/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

/**
 * The visible half of the page's sticky "reserve" pill. Client because it
 * watches scroll (`useStickyCtaReveal`, shared with wellness and transfer);
 * the WhatsApp href arrives as a plain string from the server wrapper (D25).
 * Desktop only, from `lg` — below that the sitewide mobile `StickyActionBar`
 * already pins Book / Call / WhatsApp. `position: fixed`, so no CLS.
 */
export function SpacesStickyBar({ whatsappHref }: { whatsappHref: string }) {
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
        A table by the fire tonight?
      </Text>
      <Button
        href={whatsappHref}
        size="small"
        startIcon={<Icon name="whatsapp" />}
        aria-label={`Reserve on WhatsApp${NEW_TAB_NOTE}`}
      >
        Reserve on WhatsApp
      </Button>
      <Link href={`#${MATCHER_ANCHOR_ID}`} variant="body2" underline="hover">
        or find your space
      </Link>
    </Box>
  );
}
