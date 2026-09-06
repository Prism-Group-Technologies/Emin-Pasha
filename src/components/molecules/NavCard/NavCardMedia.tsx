"use client";

import Box from "@mui/material/Box";

import { AssetImage } from "@/components/atoms/AssetImage";
import {
  type NavCardOrientation,
  navCardMediaInnerSx,
  navCardMediaSx,
} from "@/components/molecules/NavCard/navCardStyles";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface NavCardMediaProps {
  asset?: AssetRef;
  orientation: NavCardOrientation;
  active: boolean;
  /**
   * Gate on mounting `next/image` at all. A mega-menu panel that has never
   * been opened is hidden but still in the DOM, and the old panel loaded its
   * imagery regardless — three photographs fetched in the header of every
   * route by every visitor, including the ones who never touch the nav. The
   * frame below still renders, so revealing costs no layout shift.
   */
  revealed: boolean;
  sizes: string;
}

/** The card's image frame — always painted, conditionally filled. */
export function NavCardMedia({ asset, orientation, active, revealed, sizes }: NavCardMediaProps) {
  return (
    <Box sx={navCardMediaSx(orientation, active)}>
      {asset && revealed && (
        <Box className="NavCard-media" sx={navCardMediaInnerSx}>
          <AssetImage asset={asset} sizes={sizes} />
        </Box>
      )}
    </Box>
  );
}
