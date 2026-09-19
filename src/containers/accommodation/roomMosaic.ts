/**
 * The room gallery's tile geometry, as data.
 *
 * The old gallery poured every photograph into a uniform `repeat(2, 1fr)`,
 * which only ever looks right on an even count. The four categories ship 3,
 * 5, 4 and 6 photographs, so three of the four pages ended on a half-empty
 * row — a stranded cell reads as a broken grid, which is exactly the problem
 * the fallback in the old file was written to avoid one line further up.
 *
 * Here every count gets a layout that closes: a 12×6 placement table, one
 * entry per supported count, chosen so the mosaic is always a full rectangle.
 *
 * **Why the container carries the aspect ratio.** Each cell is sized by the
 * grid rather than by its own photograph, so the ratios below are picked to
 * make the lead tile land on 3:2 — the ratio every room asset is delivered at
 * (1600×1067). A cell spanning `c` of 12 columns and `r` of 6 rows resolves to
 * `(c/12) / (r/6) × ratio`; for n ≥ 4 that puts the lead and both stacked
 * tiles on exactly 3:2, and the closing row on a deliberate panorama.
 *
 * Because the ratio is fixed up front the block reserves its full height on
 * first paint, so CLS stays at 0 even though no cell defers to the image.
 */

/** One tile's placement, as CSS grid line pairs. */
export interface MosaicCell {
  /** `grid-column` from `md` up. */
  column: string;
  /** `grid-row` from `md` up. */
  row: string;
  /** `grid-column` below `md`, where the mosaic collapses to two columns. */
  mobileColumn: string;
}

export interface RoomMosaic {
  /** Aspect ratio of the whole block from `md` up. */
  ratio: string;
  cells: MosaicCell[];
  /** Photographs beyond the mosaic — reachable in the lightbox only. */
  hidden: number;
}

/** Above this the mosaic stops growing and the surplus moves into the counter. */
export const MOSAIC_MAX = 6;

/** Desktop placements, indexed by how many photographs are shown. */
const LAYOUTS: Record<number, { ratio: string; cells: [string, string][] }> = {
  1: { ratio: "3 / 2", cells: [["1 / -1", "1 / -1"]] },
  2: {
    ratio: "3 / 1",
    cells: [
      ["1 / 7", "1 / -1"],
      ["7 / 13", "1 / -1"],
    ],
  },
  3: {
    ratio: "9 / 4",
    cells: [
      ["1 / 9", "1 / -1"],
      ["9 / 13", "1 / 4"],
      ["9 / 13", "4 / 7"],
    ],
  },
  4: {
    ratio: "3 / 2",
    cells: [
      ["1 / 9", "1 / 5"],
      ["9 / 13", "1 / 3"],
      ["9 / 13", "3 / 5"],
      ["1 / 13", "5 / 7"],
    ],
  },
  5: {
    ratio: "3 / 2",
    cells: [
      ["1 / 9", "1 / 5"],
      ["9 / 13", "1 / 3"],
      ["9 / 13", "3 / 5"],
      ["1 / 7", "5 / 7"],
      ["7 / 13", "5 / 7"],
    ],
  },
  6: {
    ratio: "3 / 2",
    cells: [
      ["1 / 9", "1 / 5"],
      ["9 / 13", "1 / 3"],
      ["9 / 13", "3 / 5"],
      ["1 / 5", "5 / 7"],
      ["5 / 9", "5 / 7"],
      ["9 / 13", "5 / 7"],
    ],
  },
};

/**
 * Below `md` the mosaic is two columns: the lead runs full width, the rest
 * pair off, and an odd tail spans both so the stack closes here too.
 */
function mobileColumn(index: number, shown: number): string {
  const isLead = index === 0;
  const isOddTail = index === shown - 1 && (shown - 1) % 2 === 1;
  return isLead || isOddTail ? "span 2" : "span 1";
}

/**
 * The layout for `count` photographs. A count of 0 returns no cells, so the
 * caller can render nothing rather than an empty frame.
 */
export function roomMosaic(count: number): RoomMosaic {
  const shown = Math.min(Math.max(count, 0), MOSAIC_MAX);
  const layout = LAYOUTS[shown];

  if (!layout) {
    return { ratio: "3 / 2", cells: [], hidden: 0 };
  }

  return {
    ratio: layout.ratio,
    hidden: Math.max(count - shown, 0),
    cells: layout.cells.map(([column, row], index) => ({
      column,
      row,
      mobileColumn: mobileColumn(index, shown),
    })),
  };
}
