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
 *
 * Layout: a single row from `md` up — copy left, actions right and vertically
 * centred against it — collapsing to a stack below that. Accept and reject
 * are both solid buttons of the same size and weight — only the hue
 * differs — so neither choice is visually privileged, which is what the
 * GDPR/ePrivacy regulators read as "equally easy to refuse as to accept"; `manage` stays a text button
 * because it is a third path, not a competing consent decision. The three
 * keep one DOM order at every breakpoint so tab order always matches what
 * is on screen.
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
        "@keyframes consent-in": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "none" },
        },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, md: 3.5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ display: "grid", gap: 1.5 }}>
          <Typography variant="h4" component="h2">
            {consent.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "68ch" }}>
            {consent.body}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { sm: "flex-end" },
            gap: 2,
            flexShrink: 0,
            // Full-bleed targets while stacked; intrinsic width once in a row.
            "& > *": { width: { xs: "100%", sm: "auto" } },
          }}
        >
          <Button variant="link" onClick={onManage}>
            {consent.manage}
          </Button>
          <Button variant="danger" onClick={onRejectAll}>
            {consent.rejectAll}
          </Button>
          <Button onClick={onAcceptAll}>{consent.acceptAll}</Button>
        </Box>
      </Container>
    </Box>
  );
}
