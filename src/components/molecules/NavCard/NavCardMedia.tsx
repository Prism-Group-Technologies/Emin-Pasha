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
          {/* `ratio="fill"` because here the *frame* owns the geometry, not
              the photograph. `AssetImage` defaults to the asset's declared
              ratio, and 20 of the 21 nav slots declare 3:2 against frames of
              4:3 (panel) and 1:1 (drawer) — so the default left a strip of
              `action.hover` showing under every thumbnail, and clipped the
              one asset taller than its frame. The frame already reserves a
              deterministic height, so filling it costs no layout shift.

              Navigation chrome, not content: the whole card is one link to
              a destination, and a modal opened over an open mega-menu is a
              dead end. */}
          <AssetImage
            asset={asset}
            sizes={sizes}
            ratio="fill"
            // A cutout is cut to its own silhouette and has no margin to crop
            // into, so covering it would trim the figure — see `cutout` in
            // `@/schemas/content/assetRef`.
            fit={asset.cutout ? "contain" : "cover"}
            zoomable={false}
          />
        </Box>
      )}
    </Box>
  );
}
