"use client";

import { Box } from "@/components/atoms/Box";
import type { NamedAfterEntry } from "@/containers/story/catalogue";
import { useSpotlight } from "@/containers/story/hooks/useSpotlight";
import { NamedAfterRow } from "@/containers/story/molecules/NamedAfterIndex/NamedAfterRow";
import { NamedAfterSpotlight } from "@/containers/story/molecules/NamedAfterIndex/NamedAfterSpotlight";
import {
  indexRootSx,
  listSx,
} from "@/containers/story/molecules/NamedAfterIndex/namedAfterIndexStyles";

/**
 * The named spaces as a spotlight index: a sticky photograph on one side, an
 * ordered list of hairline rows on the other, the panel following whichever
 * row has the pointer or focus.
 *
 * **Why this replaced a card grid.** Three cards in a two-column grid left a
 * fourth cell empty, and three equal boxes of equal-length prose give the eye
 * nowhere to start. An index has a reading order by construction, and the
 * shared panel earns the width the empty cell was wasting.
 *
 * **It is an `<ol>` because the order is meaningful** — the band's heading
 * frames these as the names the account carries forward, in the order the
 * account introduces them.
 *
 * This is the only client component in the band, and it exists for one piece
 * of state: which row owns the panel. Everything with a photograph in it is
 * resolved on the server and arrives as a serialisable prop (DECISIONS.md
 * D25); with scripting off the list renders in full, each row keeps its own
 * thumbnail below `md`, and only the panel's swap is lost.
 */
export function NamedAfterIndex({ entries }: { entries: NamedAfterEntry[] }) {
  const spotlight = useSpotlight();

  return (
    <Box sx={indexRootSx}>
      <NamedAfterSpotlight entries={entries} activeIndex={spotlight.activeIndex} />
      <Box component="ol" sx={listSx} {...spotlight.listProps}>
        {entries.map((entry, index) => (
          <NamedAfterRow
            key={entry.id}
            entry={entry}
            index={index}
            active={spotlight.activeIndex === index}
            dimmed={spotlight.engaged && spotlight.activeIndex !== index}
            itemProps={spotlight.itemProps(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
