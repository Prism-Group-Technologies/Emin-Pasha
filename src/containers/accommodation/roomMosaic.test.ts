import { describe, expect, it } from "vitest";

import { MOSAIC_MAX, roomMosaic } from "@/containers/accommodation/roomMosaic";

/** Parses a `grid-area`-style line pair, resolving `-1` against `end`. */
function span(value: string, end: number): { start: number; end: number } {
  const [from = "1", to = "1"] = value.split(" / ");
  const resolve = (line: string) => (line === "-1" ? end : Number(line));
  return { start: resolve(from), end: resolve(to) };
}

/**
 * The property that matters: the mosaic is a closed rectangle. Every one of
 * the 12×6 units is covered exactly once, so no count can leave the stranded
 * cell the old uniform grid produced on 3 and 5 photographs.
 */
function coverage(count: number) {
  const { cells } = roomMosaic(count);
  const grid = new Map<string, number>();

  for (const cell of cells) {
    const columns = span(cell.column, 13);
    const rows = span(cell.row, 7);
    for (let c = columns.start; c < columns.end; c += 1) {
      for (let r = rows.start; r < rows.end; r += 1) {
        grid.set(`${c}:${r}`, (grid.get(`${c}:${r}`) ?? 0) + 1);
      }
    }
  }

  return grid;
}

describe("roomMosaic", () => {
  it("places one cell per photograph, up to the ceiling", () => {
    expect(roomMosaic(3).cells).toHaveLength(3);
    expect(roomMosaic(5).cells).toHaveLength(5);
    expect(roomMosaic(MOSAIC_MAX).cells).toHaveLength(MOSAIC_MAX);
  });

  it.each([1, 2, 3, 4, 5, 6])("tiles the full 12x6 grid with no gap or overlap (%i)", (count) => {
    const grid = coverage(count);
    expect(grid.size).toBe(72);
    expect([...grid.values()].every((hits) => hits === 1)).toBe(true);
  });

  it.each([
    [1, "3 / 2"],
    [2, "3 / 1"],
    [3, "9 / 4"],
    [4, "3 / 2"],
    [5, "3 / 2"],
    [6, "3 / 2"],
  ])("gives %i photographs a ratio that lands the lead tile on 3:2", (count, ratio) => {
    expect(roomMosaic(count).ratio).toBe(ratio);
  });

  it("moves photographs past the ceiling into the hidden count", () => {
    expect(roomMosaic(9)).toMatchObject({ hidden: 3 });
    expect(roomMosaic(9).cells).toHaveLength(MOSAIC_MAX);
    expect(roomMosaic(6).hidden).toBe(0);
  });

  it("renders nothing for an empty gallery rather than an empty frame", () => {
    expect(roomMosaic(0)).toMatchObject({ cells: [], hidden: 0 });
  });

  it("closes the two-column mobile stack on every count", () => {
    for (const count of [1, 2, 3, 4, 5, 6]) {
      const columns = roomMosaic(count).cells.map((cell) => cell.mobileColumn);
      const units = columns.reduce((total, value) => total + (value === "span 2" ? 2 : 1), 0);
      expect(units % 2).toBe(0);
      expect(columns[0]).toBe("span 2");
    }
  });
});
