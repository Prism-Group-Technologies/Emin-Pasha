"use client";

import dynamic from "next/dynamic";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiIconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { Icon } from "@/components/atoms/Icon";
import { DesktopNav } from "@/components/organisms/Header/DesktopNav";
import { Logo } from "@/components/organisms/Header/Logo";
import { UtilityRow } from "@/components/organisms/Header/UtilityRow";
import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_CONDENSED,
  HEADER_TRANSITION,
  HERO_SCRIM,
} from "@/components/organisms/Header/constants";
import type { HeaderData } from "@/components/organisms/Header/headerData";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useMegaMenu } from "@/hooks/useMegaMenu";
import { useMobileNav } from "@/hooks/useMobileNav";

/**
 * The drawer pulls MUI `Drawer`, `Modal` and `Collapse` — none of which any
 * visitor needs until they tap the menu button, and none of which a desktop
 * visitor ever needs. `ssr: false` keeps that weight out of the first-load
 * bundle on every route, and the `openedOnce` latch means the chunk is not
 * even requested in a session that never opens it.
 */
const MobileNav = dynamic(
  () => import("@/components/organisms/Header/MobileNav").then((m) => m.MobileNav),
  { ssr: false },
);

/**
 * 'use client' justification: reads scroll position (`useHeaderScroll`), the
 * active pathname, and mobile-drawer state. It is the site's one persistent
 * client island; everything below `<main>` stays server-rendered.
 *
 * The bar is `position: fixed` in **both** states, not sticky. That is the
 * CLS decision: condensing changes the bar's own height, and a sticky
 * (in-flow) bar would drag the whole document up by 32px the first time a
 * visitor scrolled. Fixed keeps it out of flow, and `HeaderSpacer` reserves
 * the *expanded* height once, server-side — so the reserved space never
 * changes and the condense animation moves nothing but the header itself.
 */
export function Header({ data }: { data: HeaderData }) {
  const { condensed, transparent: overUnscrolledHero } = useHeaderScroll(data.labels.heroRoutes);
  const nav = useMobileNav();
  const menu = useMegaMenu();
  /**
   * An open mega-menu drops the transparent hero treatment even when nothing
   * has been scrolled. Without this the bar stayed transparent while an opaque
   * panel unfolded directly beneath it, so the two met at a hard seam and the
   * nav words above the panel were still being read against video. Going
   * opaque for the duration makes bar and panel one surface — and removes the
   * only moment where the scrim's contrast caveat (see `HERO_SCRIM`) would
   * have applied to text sitting over a lit panel edge.
   */
  const transparent = overUnscrolledHero && !menu.isOpen;
  const variant = transparent ? "light" : "dark";

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        sx={{
          height: condensed ? HEADER_HEIGHT_CONDENSED : HEADER_HEIGHT,
          justifyContent: "center",
          color: transparent ? "common.white" : "text.primary",
          backgroundColor: transparent ? "transparent" : "background.default",
          backgroundImage: transparent ? HERO_SCRIM : "none",
          backdropFilter: transparent ? "none" : "blur(12px)",
          borderBottom: "1px solid",
          borderColor: transparent ? "transparent" : "divider",
          transition: HEADER_TRANSITION,
          borderRadius: 0,
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 0, gap: 4, justifyContent: "space-between" }}>
            <Logo variant={variant} condensed={condensed} />
            <DesktopNav variant={variant} data={data} menu={menu} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <UtilityRow variant={variant} data={data} />
              <MuiIconButton
                onClick={nav.openNav}
                aria-label={data.labels.openMenuLabel}
                aria-expanded={nav.open}
                color="inherit"
                sx={{ width: 44, height: 44, display: { xs: "inline-flex", md: "none" } }}
              >
                <Icon name="menu" />
              </MuiIconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {nav.openedOnce && (
        <MobileNav
          open={nav.open}
          expandedHref={nav.expandedHref}
          onClose={nav.close}
          onToggleSection={nav.toggleSection}
          data={data}
        />
      )}
    </>
  );
}
