import Box from "@mui/material/Box";

import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { STICKY_BAR_HEIGHT } from "@/components/organisms/Header/constants";
import { BookNowAction } from "@/components/organisms/StickyActionBar/BookNowAction";
import { bookNowCta } from "@/content/navigation";
import { shell } from "@/content/shell";
import { directionsUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";
import { zIndexTokens } from "@/theme/tokens";

const actions: { id: string; label: string; href: string; icon: IconName; route: boolean }[] = [
  { id: "book", label: bookNowCta.label, href: bookNowCta.href, icon: "event", route: true },
  { id: "call", label: shell.stickyBar.call, href: telephoneUrl, icon: "phone", route: false },
  {
    id: "whatsapp",
    label: shell.stickyBar.whatsapp,
    href: whatsappUrl,
    icon: "whatsapp",
    route: false,
  },
  {
    id: "directions",
    label: shell.stickyBar.directions,
    href: directionsUrl,
    icon: "directions",
    route: false,
  },
];

const actionSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  textDecoration: "none",
  fontSize: "0.6875rem",
} as const;

/**
 * Mobile-only sticky action bar — CLAUDE.md §6.5's persistent CTA plus the
 * three highest-intent contact actions this property converts on. Hidden
 * from `md` up, where the same actions sit in the header utility row.
 *
 * A **Server Component**: only the Book action is a client leaf
 * (`BookNowAction`, which opens the mobile booking sheet rather than
 * navigating), the other three are ordinary anchors. Keeping the bar itself on
 * the server is what lets it read `content/*` directly without dragging Zod
 * into the first-load bundle (DECISIONS.md D25).
 *
 * `position: fixed`, so it is out of flow and contributes nothing to CLS —
 * `PageShell` reserves its height at the foot of the document instead.
 */
export function StickyActionBar() {
  return (
    <Box
      component="nav"
      aria-label={shell.stickyBar.label}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: STICKY_BAR_HEIGHT,
        display: { xs: "grid", md: "none" },
        gridTemplateColumns: "repeat(4, 1fr)",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        zIndex: zIndexTokens.appBar,
      }}
    >
      {actions.map((action) =>
        action.route ? (
          <BookNowAction
            key={action.id}
            label={action.label}
            href={action.href}
            sx={{ ...actionSx, color: "primary.main" }}
          >
            <Icon name={action.icon} fontSize="small" />
          </BookNowAction>
        ) : (
          <ExternalLink
            key={action.id}
            href={action.href}
            variant="body2"
            sx={{ ...actionSx, color: "text.primary" }}
          >
            <Icon name={action.icon} fontSize="small" />
            {action.label}
          </ExternalLink>
        ),
      )}
    </Box>
  );
}
