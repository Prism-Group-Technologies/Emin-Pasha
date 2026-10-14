"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { NamedAfterEntry } from "@/containers/story/catalogue";
import {
  ordinalSx,
  rowArrowSx,
  rowBlurbSx,
  rowBodySx,
  rowFromSx,
  rowLinkSx,
  rowNameSx,
  rowSectionSx,
  rowSx,
  rowThumbSx,
} from "@/containers/story/molecules/NamedAfterIndex/namedAfterIndexStyles";
import { revealSx } from "@/theme/motion";

const THUMB_SIZES = "104px";

export interface NamedAfterRowProps {
  entry: NamedAfterEntry;
  index: number;
  active: boolean;
  dimmed: boolean;
  /** Hover and focus handlers from `useSpotlight` — the row owns no state. */
  itemProps: { onMouseEnter: () => void; onFocus: () => void };
}

/**
 * One named space as an index row.
 *
 * The whole row is a single `<a>`: one tab stop, one hit target, and the name
 * is the accessible name, with the attribution and the nudge announced as
 * part of it rather than as orphaned text — the same contract `NavCard` makes.
 *
 * The thumbnail is the mirror image of the spotlight panel's visibility: it
 * shows below `md` and the panel shows from `md` up, so exactly one of the two
 * is ever in the layout. Both are lazy, and a `display: none` element never
 * intersects the viewport, so the hidden half is never fetched — the band
 * costs one image set, not two.
 */
export function NamedAfterRow({ entry, index, active, dimmed, itemProps }: NamedAfterRowProps) {
  return (
    <Box component="li" sx={[rowSx(active), revealSx({ index })]}>
      <Link href={entry.href} underline="none" sx={rowLinkSx(dimmed)} {...itemProps}>
        <Text component="span" sx={ordinalSx}>
          {String(index + 1).padStart(2, "0")}
        </Text>

        {entry.asset && (
          <Box sx={rowThumbSx}>
            {/* A 104px thumbnail inside the row's single link: navigation wins,
                and a 44px corner control would cover half of it. The same
                photograph is enlargeable at full size in the spotlight panel
                beside the index from `md` up. */}
            <AssetImage asset={entry.asset} sizes={THUMB_SIZES} ratio="fill" zoomable={false} />
          </Box>
        )}

        <Box sx={rowBodySx}>
          {entry.section && (
            <Text variant="overline" component="span" sx={rowSectionSx}>
              {entry.section}
            </Text>
          )}
          <Text variant="h5" component="h3" sx={rowNameSx(active)}>
            {entry.name}
          </Text>
          <Text variant="caption" component="span" sx={rowFromSx}>
            {`From — ${entry.from}`}
          </Text>
          <Text variant="body2" component="span" sx={rowBlurbSx}>
            {entry.blurb}
          </Text>
        </Box>

        <Icon name="arrow-forward" fontSize="small" aria-hidden sx={rowArrowSx} />
      </Link>
    </Box>
  );
}
