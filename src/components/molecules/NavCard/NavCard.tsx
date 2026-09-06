"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";

import { NavCardBody } from "@/components/molecules/NavCard/NavCardBody";
import { NavCardMedia } from "@/components/molecules/NavCard/NavCardMedia";
import {
  type NavCardOrientation,
  navCardRootSx,
} from "@/components/molecules/NavCard/navCardStyles";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface NavCardProps {
  href: string;
  label: string;
  description?: string;
  asset?: AssetRef;
  /** `vertical` for the desktop panel grid, `horizontal` for drawer rows. */
  orientation?: NavCardOrientation;
  active?: boolean;
  /** False until the owning panel has been opened once — gates image loading. */
  revealed?: boolean;
  /** Responsive `sizes` for the thumbnail; required whenever an asset is given. */
  imageSizes?: string;
  onNavigate?: () => void;
}

/**
 * One navigable destination rendered as an image card — the unit the header's
 * mega-menu panels and the mobile drawer are both built from.
 *
 * It is a molecule rather than a Header-local component precisely because
 * those two consumers need the *same* card in two shapes: a portrait tile in
 * the desktop grid, a thumbnail row in the drawer. Sharing it is what stops
 * the two halves of the navigation drifting into looking like two different
 * products — the failure mode the research on responsive mega menus keeps
 * flagging (reorganise for small screens, don't shrink).
 *
 * The whole card is a single `<a>`: one tab stop, one hit target, and the
 * label is the accessible name — the description sits inside the link, so it
 * is announced as part of it rather than being orphaned text a screen reader
 * meets with no context.
 */
export function NavCard({
  href,
  label,
  description,
  asset,
  orientation = "vertical",
  active = false,
  revealed = true,
  imageSizes = "200px",
  onNavigate,
}: NavCardProps) {
  return (
    <Box
      component={NextLink}
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      sx={navCardRootSx(orientation)}
    >
      <NavCardMedia
        asset={asset}
        orientation={orientation}
        active={active}
        revealed={revealed}
        sizes={imageSizes}
      />
      <NavCardBody
        label={label}
        description={description}
        active={active}
        fill={orientation === "horizontal"}
      />
    </Box>
  );
}
