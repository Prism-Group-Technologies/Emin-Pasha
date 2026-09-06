"use client";

import Box from "@mui/material/Box";

import { NavCard } from "@/components/molecules/NavCard";
import { PANEL_IMAGE_SIZES } from "@/components/organisms/Header/constants";
import type { HeaderPanelLink } from "@/components/organisms/Header/headerData";

export interface MegaMenuGridProps {
  links: HeaderPanelLink[];
  revealed: boolean;
  isActiveChild: (href: string) => boolean;
  onNavigate: () => void;
}

/**
 * The panel's card grid.
 *
 * Columns come from `auto-fit` rather than from `links.length`, because the
 * sections run from two children (Experiences) to five (Dining) and one rule
 * has to hold for all of them at every width from `md` up. A section that
 * gains or loses a child needs no change here.
 */
export function MegaMenuGrid({ links, revealed, isActiveChild, onNavigate }: MegaMenuGridProps) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(auto-fit, minmax(150px, 1fr))",
          lg: "repeat(auto-fit, minmax(175px, 1fr))",
        },
        gap: { md: 3, lg: 4 },
      }}
    >
      {links.map((link) => (
        <li key={link.href}>
          <NavCard
            href={link.href}
            label={link.label}
            description={link.description}
            asset={link.asset}
            active={isActiveChild(link.href)}
            revealed={revealed}
            imageSizes={PANEL_IMAGE_SIZES}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </Box>
  );
}
