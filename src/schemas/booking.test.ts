import { describe, expect, it } from "vitest";

import { bookingSearchSchema, nightsBetween, startOfLocalToday } from "@/schemas/booking";

const iso = (offsetDays: number) => {
  const d = startOfLocalToday();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const base = { adults: 2, children: 0, rooms: 1 };

describe("bookingSearchSchema", () => {
  it("accepts a valid future search", () => {
    const result = bookingSearchSchema.safeParse({ ...base, checkIn: iso(1), checkOut: iso(3) });
    expect(result.success).toBe(true);
  });

  it("rejects a check-in in the past", () => {
    const result = bookingSearchSchema.safeParse({ ...base, checkIn: iso(-1), checkOut: iso(2) });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((i) => i.message === "checkIn.past")).toBe(true);
  });

  it("rejects a check-out on or before check-in", () => {
    for (const checkOut of [iso(1), iso(0)]) {
      const result = bookingSearchSchema.safeParse({ ...base, checkIn: iso(1), checkOut });
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "checkOut.notAfter")).toBe(true);
    }
  });

  it("rejects zero adults and enforces the room ceiling", () => {
    const dates = { checkIn: iso(1), checkOut: iso(2) };
    expect(bookingSearchSchema.safeParse({ ...base, ...dates, adults: 0 }).success).toBe(false);
    expect(bookingSearchSchema.safeParse({ ...base, ...dates, rooms: 99 }).success).toBe(false);
  });

  it("counts nights across a month boundary", () => {
    expect(nightsBetween("2026-01-30", "2026-02-02")).toBe(3);
    expect(nightsBetween("2026-12-31", "2027-01-01")).toBe(1);
  });
});
