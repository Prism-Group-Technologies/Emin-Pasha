"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { NavCard } from "@/components/molecules/NavCard";
import { DRAWER_IMAGE_SIZES } from "@/components/organisms/Header/constants";
import type { HeaderPanelLink } from "@/components/organisms/Header/headerData";

export interface MobileNavChildrenProps {
  id: string;
  intro?: string;
  links: HeaderPanelLink[];
  isActiveChild: (href: string) => boolean;
  onNavigate: () => void;
}

/**
 * The expanded contents of one drawer section: the section's framing sentence,
 * then its destinations as horizontal `NavCard` rows.
 *
 * These are the *same* cards the desktop panel renders, turned on their side —
 * an 88px thumbnail beside the label and its one-line description. That is the
 * "reorganise, don't shrink" rule: someone choosing a room on a phone gets the
 * same photograph-led choice someone on a laptop gets, laid out for a thumb
 * instead of a pointer, rather than a scaled-down copy of the desktop grid.
 */
export function MobileNavChildren({
  id,
  intro,
  links,
  isActiveChild,
  onNavigate,
}: MobileNavChildrenProps) {
  return (
    <Box sx={{ pb: 4 }}>
      {intro && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, fontSize: "0.8125rem" }}>
          {intro}
        </Typography>
      )}
      <Box component="ul" id={id} sx={{ listStyle: "none", m: 0, p: 0, display: "grid" }}>
        {links.map((link) => (
          <li key={link.href}>
            <NavCard
              href={link.href}
              label={link.label}
              description={link.description}
              asset={link.asset}
              orientation="horizontal"
              active={isActiveChild(link.href)}
              imageSizes={DRAWER_IMAGE_SIZES}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </Box>
    </Box>
  );
}
