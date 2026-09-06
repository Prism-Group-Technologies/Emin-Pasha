"use client";

import { useCallback } from "react";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import { MobileNavBar, MobileNavFooter } from "@/components/organisms/Header/MobileNavChrome";
import { MobileNavSection } from "@/components/organisms/Header/MobileNavSection";
import type { HeaderData } from "@/components/organisms/Header/headerData";
import { drawerPaperSx } from "@/components/organisms/Header/mobileNavStyles";
import { motionTokens } from "@/theme/tokens";
import { isActiveRoute } from "@/utils/route";

export interface MobileNavProps {
  open: boolean;
  expandedHref: string | null;
  onClose: () => void;
  onToggleSection: (href: string) => void;
  data: HeaderData;
}

/**
 * Full-screen mobile navigation. Focus trapping, Escape-to-close, the
 * body-scroll lock and `aria-hidden` on the rest of the document all come
 * from MUI's `Modal`, which `Drawer` composes — verified against the
 * installed @mui/material@6.5.0 `Modal.d.ts`, where `disableEnforceFocus`
 * and `disableScrollLock` exist only as opt-*outs*. Closing on route change
 * is the one behaviour `Drawer` cannot know about; `useMobileNav` owns it.
 *
 * Renders the whole of `navigation`, unlike the six-entry desktop bar, and
 * hands each section the same server-built panel the desktop uses — so the
 * drawer shows the same descriptions and imagery, laid out for a thumb.
 */
export function MobileNav({ open, expandedHref, onClose, onToggleSection, data }: MobileNavProps) {
  const pathname = usePathname();
  const isActiveChild = useCallback((href: string) => isActiveRoute(pathname, href), [pathname]);

  return (
    <MuiDrawer
      open={open}
      onClose={onClose}
      anchor="right"
      transitionDuration={motionTokens.navFade}
      slotProps={{ paper: { sx: drawerPaperSx } }}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <MobileNavBar closeLabel={data.labels.closeMenuLabel} onClose={onClose} />

      <Box
        component="nav"
        aria-label={data.labels.primaryNavLabel}
        sx={{ overflowY: "auto", overscrollBehavior: "contain", px: 5, flex: 1, minHeight: 0 }}
      >
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {data.navigation.map((item) => (
            <MobileNavSection
              key={item.href}
              item={item}
              panel={data.panels[item.href]}
              active={isActiveRoute(pathname, item.href)}
              expanded={expandedHref === item.href}
              onToggle={() => onToggleSection(item.href)}
              onNavigate={onClose}
              isActiveChild={isActiveChild}
              submenuHint={data.labels.submenuHint}
            />
          ))}
        </Box>
      </Box>

      <MobileNavFooter cta={data.bookCta} onNavigate={onClose} />
    </MuiDrawer>
  );
}
