"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { ENQUIRE_ANCHOR_ID } from "@/containers/contact/anchors";
import { useStickyCtaReveal } from "@/containers/contact/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

export interface ContactStickyBarProps {
  whatsappHref: string;
  lead: string;
  whatsappLabel: string;
  enquireLabel: string;
}

/**
 * The visible half of the Contact page's sticky bar. Client because it
 * watches the scroll position (`useStickyCtaReveal`); every string and the
 * WhatsApp href arrive as props from the server wrapper, so the content layer
 * never crosses this boundary (DECISIONS.md D25).
 *
 * Desktop only, from `lg`: below that the sitewide mobile `StickyActionBar`
 * already pins Book / Call / WhatsApp / Directions. `position: fixed`, so it
 * adds nothing to CLS.
 */
export function ContactStickyBar({
  whatsappHref,
  lead,
  whatsappLabel,
  enquireLabel,
}: ContactStickyBarProps) {
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
        {lead}
      </Text>
      <Button
        href={whatsappHref}
        size="small"
        startIcon={<Icon name="whatsapp" />}
        aria-label={`${whatsappLabel}${NEW_TAB_NOTE}`}
        tabIndex={visible ? undefined : -1}
      >
        {whatsappLabel}
      </Button>
      <Link
        href={`#${ENQUIRE_ANCHOR_ID}`}
        variant="body2"
        underline="hover"
        tabIndex={visible ? undefined : -1}
      >
        {enquireLabel}
      </Link>
    </Box>
  );
}
