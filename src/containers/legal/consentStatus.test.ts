import { describe, expect, it } from "vitest";

import {
  choicesDiffer,
  countActiveCategories,
  fillTemplate,
  formatDecidedAt,
} from "@/containers/legal/consentStatus";
import { progressWithin } from "@/containers/legal/progress";
import { countWords, readingMinutes } from "@/containers/legal/readingTime";

describe("consentStatus", () => {
  it("counts necessary as always on", () => {
    expect(countActiveCategories({ analytics: false, marketing: false })).toBe(1);
    expect(countActiveCategories({ analytics: true, marketing: true })).toBe(3);
  });

  it("detects a changed choice", () => {
    const off = { analytics: false, marketing: false };
    expect(choicesDiffer(off, { ...off })).toBe(false);
    expect(choicesDiffer(off, { ...off, marketing: true })).toBe(true);
  });

  it("formats a saved date and rejects missing or invalid values", () => {
    expect(formatDecidedAt(null)).toBeNull();
    expect(formatDecidedAt("not a date")).toBeNull();
    expect(formatDecidedAt("2026-09-15T14:05:00Z")).toContain("2026");
  });

  it("fills known tokens and leaves unknown ones alone", () => {
    expect(fillTemplate("{count} of 3 {x}", { count: 2 })).toBe("2 of 3 {x}");
  });
});

describe("readingTime", () => {
  it("counts words and never reports under a minute", () => {
    expect(countWords("  one two  three ")).toBe(3);
    expect(countWords("")).toBe(0);
    expect(readingMinutes([{ id: "a", title: "Hi", blocks: [{ kind: "p", text: "short" }] }])).toBe(
      1,
    );
  });

  it("includes list, callout and table text", () => {
    const words = Array.from({ length: 440 }, () => "word").join(" ");
    expect(
      readingMinutes([
        { id: "a", title: "", blocks: [{ kind: "list", items: [words] }] },
        { id: "b", title: "", blocks: [{ kind: "table", caption: words, columns: [], rows: [] }] },
      ]),
    ).toBe(4);
  });
});

describe("progressWithin", () => {
  it("clamps between 0 and 1 across the element's scrollable span", () => {
    expect(progressWithin({ top: 100, height: 2000 }, 800)).toBe(0);
    expect(progressWithin({ top: -600, height: 2000 }, 800)).toBeCloseTo(0.5);
    expect(progressWithin({ top: -5000, height: 2000 }, 800)).toBe(1);
    expect(progressWithin({ top: 0, height: 500 }, 800)).toBe(1);
  });
});
