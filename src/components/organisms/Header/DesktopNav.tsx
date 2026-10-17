"use client";

import { useCallback } from "react";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";

import { MegaMenuLayer } from "@/components/organisms/Header/MegaMenuLayer";
import { NavTrigger } from "@/components/organisms/Header/NavTrigger";
import { NAV_METRICS, atNav } from "@/components/organisms/Header/constants";
import type { HeaderData } from "@/components/organisms/Header/headerData";
import type { MegaMenuState } from "@/hooks/useMegaMenu";
import { isActiveRoute } from "@/utils/route";

export interface DesktopNavProps {
  /** Light lock-up over the hero video, dark once the header goes opaque. */
  variant: "light" | "dark";
  data: HeaderData;
  /**
   * Owned by `Header`, not by this component: the bar's own transparency
   * depends on whether a panel is open, so the state has to live above both.
   */
  menu: MegaMenuState;
}

/**
 * The `NAV_BREAKPOINT`-and-up primary navigation: a row of triggers, plus one
 * panel layer rendered as their sibling.
 *
 * Escape and focus-out are handled on this wrapper rather than per trigger, so
 * one listener covers the triggers *and* the panels their focus can move into.
 */
export function DesktopNav({ variant, data, menu }: DesktopNavProps) {
  const pathname = usePathname();

  const isActiveChild = useCallback((href: string) => isActiveRoute(pathname, href), [pathname]);

  const panels = data.headerNavigation.flatMap((item) => {
    const panel = data.panels[item.href];
    return panel ? [panel] : [];
  });

  return (
    <Box
      component="nav"
      aria-label={data.labels.primaryNavLabel}
      onKeyDown={menu.onKeyDown}
      onBlur={menu.onBlur}
      sx={{
        display: atNav("none", "flex"),
        alignItems: "center",
        gap: NAV_METRICS.itemGap,
        // `flexShrink: 0`, not `minWidth: 0`. Shrinking this box did not
        // shrink anything inside it — every label is `white-space: nowrap`,
        // so the children simply overflowed the box and painted on top of
        // the utility row. Refusing to shrink makes that failure mode
        // impossible; `NAV_BREAKPOINT` is what keeps the bar from being
        // mounted at a width where it would have had to.
        flexShrink: 0,
      }}
    >
      {data.headerNavigation.map((item) => (
        <NavTrigger
          key={item.href}
          item={item}
          variant={variant}
          submenuHint={data.labels.submenuHint}
          active={isActiveRoute(pathname, item.href)}
          hasPanel={Boolean(data.panels[item.href])}
          open={menu.openHref === item.href}
          onScheduleOpen={() => menu.scheduleOpen(item.href)}
          onToggle={() => menu.toggle(item.href)}
          onScheduleClose={menu.scheduleClose}
          onClose={menu.close}
        />
      ))}

      <MegaMenuLayer
        panels={panels}
        openHref={menu.openHref}
        revealedHrefs={menu.revealedHrefs}
        isActiveChild={isActiveChild}
        onNavigate={menu.close}
        // Entering the panel cancels the pending close; leaving it re-arms
        // one, so the menu closes when the pointer genuinely goes elsewhere
        // rather than the instant it leaves the trigger word.
        onPointerEnter={menu.cancelClose}
        onPointerLeave={menu.scheduleClose}
      />
    </Box>
  );
}
