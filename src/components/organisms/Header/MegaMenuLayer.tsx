"use client";

import Box from "@mui/material/Box";

import { MegaMenuPanel } from "@/components/organisms/Header/MegaMenuPanel";
import type { HeaderPanel } from "@/components/organisms/Header/headerData";

export interface MegaMenuLayerProps {
  panels: HeaderPanel[];
  openHref: string | null;
  revealedHrefs: ReadonlySet<string>;
  isActiveChild: (href: string) => boolean;
  onNavigate: () => void;
  /** Re-arms the close timer when the pointer leaves the open panel. */
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

/**
 * Hosts every panel as siblings, once, instead of nesting each panel inside
 * the trigger that opens it.
 *
 * That inversion is what makes the panel full-width *and* aligned. Nested in a
 * trigger, a panel's containing block was whichever ancestor happened to be
 * positioned — the `AppBar` — which is how the old panel ended up spanning the
 * viewport while its padding was measured from the screen edge. Hoisted here,
 * the layer itself is the positioned element, it is a direct child of the nav,
 * and each panel inside it can use the site container honestly.
 *
 * It also gives the pointer somewhere continuous to travel: hovering the layer
 * cancels the close timer, so moving diagonally from a trigger down into a
 * card never collapses the menu mid-reach.
 */
export function MegaMenuLayer({
  panels,
  openHref,
  revealedHrefs,
  isActiveChild,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: MegaMenuLayerProps) {
  return (
    <Box
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // The layer must not swallow clicks on the bar itself; only the open
        // panel inside it takes pointer events back.
        pointerEvents: "none",
        "& > *": { pointerEvents: "auto" },
      }}
    >
      {panels.map((panel) => (
        <MegaMenuPanel
          key={panel.href}
          panel={panel}
          open={openHref === panel.href}
          revealed={revealedHrefs.has(panel.href)}
          isActiveChild={isActiveChild}
          onNavigate={onNavigate}
        />
      ))}
    </Box>
  );
}
