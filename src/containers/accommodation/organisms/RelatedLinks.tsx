import { Box } from "@/components/atoms/Box";
import { RelatedLinkTile } from "@/containers/accommodation/molecules/RelatedLinkTile";
import { findNavItem } from "@/content/navigation";
import { revealSx } from "@/theme/motion";

/**
 * Four is the ceiling. Past that the tiles are narrower than the labels they
 * carry, and no caller passes more; below it the row is always full, so a
 * three-link band never trails an empty cell.
 */
const MAX_COLUMNS = 4;

function gridSx(count: number) {
  return {
    listStyle: "none",
    m: 0,
    p: 0,
    display: "grid",
    /**
     * Two up even on a phone. This band is tertiary — it sits above the
     * footer on roughly twenty pages — and one full-width 16:9 tile per row
     * turned four cross-links into about 1100px of scrolling past content the
     * reader has already decided not to read. Paired tiles keep the whole
     * band inside one thumb-flick.
     */
    gridTemplateColumns: {
      xs: "repeat(2, minmax(0, 1fr))",
      md: `repeat(${Math.min(count, MAX_COLUMNS)}, minmax(0, 1fr))`,
    },
    gap: { xs: 2, sm: 3, md: 4 },
    alignItems: "stretch",
  };
}

/**
 * Internal cross-links, as a row of photographic tiles. Shared by roughly
 * twenty containers — the accommodation location band, every section index,
 * and both detail-page templates — which is why it takes nothing but hrefs:
 * labels resolve from `navigation` by href, so a section renamed anywhere is
 * renamed here too (CLAUDE.md §5.4), and the photograph resolves from
 * `pageHeroes` the same way.
 *
 * A Server Component with no state and no JavaScript: the hover choreography
 * is CSS on the tile, and the entrance stagger is `revealSx`, which runs on a
 * scroll timeline rather than an observer.
 */
export function RelatedLinks({ hrefs }: { hrefs: string[] }) {
  return (
    <Box component="ul" sx={gridSx(hrefs.length)}>
      {hrefs.map((href, index) => {
        const item = findNavItem(href);
        if (!item) {
          return null;
        }
        return (
          <Box component="li" key={href} sx={revealSx({ index })}>
            <RelatedLinkTile href={href} label={item.label} />
          </Box>
        );
      })}
    </Box>
  );
}
