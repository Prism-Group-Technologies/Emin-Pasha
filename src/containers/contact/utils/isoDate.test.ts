import { describe, expect, it } from "vitest";

import { fromIsoDate, toIsoDate } from "@/containers/contact/utils/isoDate";

describe("isoDate", () => {
  it("round-trips a local date without shifting the day", () => {
    const date = new Date(2026, 9, 10);
    expect(toIsoDate(date)).toBe("2026-10-10");
    expect(fromIsoDate("2026-10-10")?.getDate()).toBe(10);
  });

  it("maps empty and invalid input to empty values", () => {
    expect(toIsoDate(null)).toBe("");
    expect(toIsoDate(new Date(Number.NaN))).toBe("");
    expect(fromIsoDate("")).toBeNull();
    expect(fromIsoDate(undefined)).toBeNull();
    expect(fromIsoDate("not-a-date")).toBeNull();
  });
});
