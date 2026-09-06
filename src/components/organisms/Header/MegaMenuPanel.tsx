"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { MegaMenuGrid } from "@/components/organisms/Header/MegaMenuGrid";
import { MegaMenuIntro } from "@/components/organisms/Header/MegaMenuIntro";
import type { HeaderPanel } from "@/components/organisms/Header/headerData";
import { megaMenuLayoutSx, megaMenuPanelSx } from "@/components/organisms/Header/megaMenuStyles";

export interface MegaMenuPanelProps {
  panel: HeaderPanel;
  open: boolean;
  /** False until the panel has been opened once — gates thumbnail loading. */
  revealed: boolean;
  isActiveChild: (href: string) => boolean;
  onNavigate: () => void;
}

/**
 * One mega-menu panel: an intro rail beside a grid of image cards, one card
 * per destination.
 *
 * **Why a card grid.** The panel this replaces was a bare link list next to a
 * single half-viewport-wide photograph — four words of content against six
 * hundred pixels of image. Giving every destination its own thumbnail spends
 * the same space showing a visitor what they are choosing between, which for
 * a hotel is the whole job of the menu: rooms, restaurants and event spaces
 * are chosen by eye. It costs no new content either — `assets.ts` already
 * carries a dedicated asset for essentially every child route.
 *
 * **Why it is container-aligned.** The panel spans the full viewport width,
 * but its *contents* sit inside the same `maxWidth="xl"` container the bar
 * uses, so the eyebrow lines up with the logo and the last card lines up with
 * BOOK NOW. The old panel was absolutely positioned against the `AppBar` and
 * padded from the raw viewport edge, so nothing in it lined up with anything
 * in the bar above it.
 *
 * Kept mounted and hidden with `visibility` rather than unmounted, so opening
 * is a pure compositor transition; `inert` removes its links from the
 * accessibility tree and the tab order while closed.
 */
export function MegaMenuPanel({
  panel,
  open,
  revealed,
  isActiveChild,
  onNavigate,
}: MegaMenuPanelProps) {
  return (
    <Box
      id={`megamenu-${panel.href}`}
      inert={!open}
      aria-labelledby={`megamenu-heading-${panel.href}`}
      sx={megaMenuPanelSx(open)}
    >
      <Container maxWidth="xl">
        <Box sx={megaMenuLayoutSx}>
          <MegaMenuIntro panel={panel} onNavigate={onNavigate} />
          <MegaMenuGrid
            links={panel.links}
            revealed={revealed}
            isActiveChild={isActiveChild}
            onNavigate={onNavigate}
          />
        </Box>
      </Container>
    </Box>
  );
}
