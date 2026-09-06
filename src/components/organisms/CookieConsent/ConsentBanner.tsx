"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Button } from "@/components/atoms/Button";
import { STICKY_BAR_HEIGHT } from "@/components/organisms/Header/constants";
import { shell } from "@/content/shell";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface ConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManage: () => void;
}

const { consent } = shell;

/**
 * The banner itself. Three properties keep its CLS contribution at zero:
 *
 *   1. `position: fixed` — it is out of normal flow, so no in-flow element
 *      can be displaced by it appearing.
 *   2. It is never in the server HTML (`useCookieConsent().ready` is false on
 *      the server and on the first client pass), so it cannot be part of the
 *      initial layout that LCP is measured against.
 *   3. It docks *above* the sticky action bar on mobile rather than on top of
 *      it, using the same `STICKY_BAR_HEIGHT` constant — so neither fixed
 *      element ever has to move to make room for the other.
 *
 * It is a `role="region"`, not a dialog: it does not trap focus or block the
 * page, which is both better for keyboard users and the reason it cannot
 * affect the rest of the layout.
 */
export function ConsentBanner({ onAcceptAll, onRejectAll, onManage }: ConsentBannerProps) {
  return (
    <Box
      role="region"
      aria-label={consent.bannerLabel}
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: { xs: `${STICKY_BAR_HEIGHT}px`, md: 0 },
        zIndex: (theme) => theme.zIndex.snackbar,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "primary.main",
        boxShadow: 24,
        animation: `consent-in ${motionTokens.navFade}ms ${easingTokens.emin}`,
        "@keyframes consent-in": { from: { opacity: 0 }, to: { opacity: 1 } },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    >
      <Container maxWidth="xl" sx={{ py: 5, display: "grid", gap: 4 }}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography variant="h4" component="h2">
            {consent.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "68ch" }}>
            {consent.body}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Button onClick={onAcceptAll}>{consent.acceptAll}</Button>
          <Button variant="ghost" onClick={onRejectAll}>
            {consent.rejectAll}
          </Button>
          <Button variant="link" onClick={onManage}>
            {consent.manage}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
