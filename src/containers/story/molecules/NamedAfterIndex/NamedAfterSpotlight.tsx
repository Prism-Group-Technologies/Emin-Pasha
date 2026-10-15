"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { NamedAfterEntry } from "@/containers/story/catalogue";
import {
  spotlightCaptionSx,
  spotlightFrameSx,
  spotlightLayerSx,
  spotlightRailSx,
} from "@/containers/story/molecules/NamedAfterIndex/namedAfterIndexStyles";

/** Desktop only, so the panel can claim a generous share of the container. */
const SIZES = "(min-width: 1200px) 520px, 42vw";

export interface NamedAfterSpotlightProps {
  entries: NamedAfterEntry[];
  activeIndex: number;
}

/**
 * The shared photograph beside the index — the half of the band that turns a
 * list of three links into something worth looking at.
 *
 * **Every image is mounted, and they cross-fade.** Swapping one `src` would
 * re-fetch and pop on each hover; three stacked layers at `opacity: 0`
 * pre-load once and then change over on the compositor, so the panel keeps up
 * with a reader running down the rows.
 *
 * **The whole panel is `aria-hidden`.** It restates rows that are already
 * fully readable immediately beside it, so exposing three more `alt` strings
 * would make assistive tech announce the band twice. It is decoration for
 * pointer and keyboard users, and it is declared as such.
 */
export function NamedAfterSpotlight({ entries, activeIndex }: NamedAfterSpotlightProps) {
  const active = entries[activeIndex];

  return (
    <Box aria-hidden sx={spotlightRailSx}>
      <Box sx={spotlightFrameSx}>
        {entries.map((entry, index) =>
          entry.asset ? (
            <Box key={entry.id} sx={spotlightLayerSx(index === activeIndex)}>
              <AssetImage asset={entry.asset} sizes={SIZES} ratio="fill" />
            </Box>
          ) : null,
        )}
      </Box>
      {active?.section && (
        <Text variant="overline" component="p" sx={spotlightCaptionSx}>
          {`${active.section} — ${active.name}`}
        </Text>
      )}
    </Box>
  );
}
