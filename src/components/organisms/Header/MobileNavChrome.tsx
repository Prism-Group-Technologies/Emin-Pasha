"use client";

import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/organisms/Header/Logo";

export interface MobileNavBarProps {
  closeLabel: string;
  onClose: () => void;
}

/** The drawer's fixed top bar: brand lock-up and the close control. */
export function MobileNavBar({ closeLabel, onClose }: MobileNavBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        px: 5,
        py: 4,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Logo variant="dark" condensed />
      <MuiIconButton onClick={onClose} aria-label={closeLabel} sx={{ width: 44, height: 44 }}>
        <Icon name="close" />
      </MuiIconButton>
    </Box>
  );
}

export interface MobileNavFooterProps {
  cta: { label: string; href: string };
  onNavigate: () => void;
}

/**
 * The drawer's anchored foot.
 *
 * Anchored, not appended: it sits outside the scrolling list in a flex column,
 * so BOOK NOW is reachable at any scroll position. A booking CTA that scrolls
 * away with the menu is the one thing a hotel drawer must not do, and the
 * research on mobile mega-menu patterns is unanimous that the primary CTA
 * stays pinned to the bottom.
 */
export function MobileNavFooter({ cta, onNavigate }: MobileNavFooterProps) {
  return (
    <Box
      sx={{
        p: 5,
        flexShrink: 0,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        // Clears the iOS home indicator / Android gesture bar. 24px is what
        // `p: 5` resolves to on this theme's scale, so the padding only ever
        // grows past the design value, never shrinks below it.
        pb: "max(24px, env(safe-area-inset-bottom))",
      }}
    >
      <Button href={cta.href} fullWidth onClick={onNavigate}>
        {cta.label}
      </Button>
    </Box>
  );
}
