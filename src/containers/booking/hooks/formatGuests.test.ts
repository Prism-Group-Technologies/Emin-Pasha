import { describe, expect, it } from "vitest";

import { bookingCopy } from "@/content/booking";

import { formatGuests } from "./useBookingSummary";

/**
 * The hero's collapsed guests field and the sticky bar's summary both read
 * this phrase. A second, hand-rolled copy of the pluralisation in either one
 * is exactly the drift these cases exist to catch.
 */
describe("formatGuests", () => {
  it("uses the singular templates for one guest in one room", () => {
    expect(formatGuests(bookingCopy, 1, 0, 1)).toBe("1 guest · 1 room");
  });

  it("counts adults and children as one guest total", () => {
    expect(formatGuests(bookingCopy, 2, 3, 2)).toBe("5 guests · 2 rooms");
  });

  it("pluralises guests and rooms independently", () => {
    expect(formatGuests(bookingCopy, 2, 0, 1)).toBe("2 guests · 1 room");
    expect(formatGuests(bookingCopy, 1, 0, 2)).toBe("1 guest · 2 rooms");
  });

  it("treats children alone as guests", () => {
    expect(formatGuests(bookingCopy, 0, 1, 1)).toBe("1 guest · 1 room");
  });
});
