import { describe, expect, it } from "vitest";

import { maxGuests } from "@/utils/capacity";
import { formatUgx } from "@/utils/currency";
import { isActiveRoute } from "@/utils/route";

describe("isActiveRoute", () => {
  it("matches the homepage only on itself", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
    expect(isActiveRoute("/dining", "/")).toBe(false);
  });

  it("marks a section current on its own detail routes", () => {
    expect(isActiveRoute("/accommodation/superior-room", "/accommodation")).toBe(true);
    expect(isActiveRoute("/accommodation-extra", "/accommodation")).toBe(false);
  });
});

describe("maxGuests", () => {
  it("reads the upper bound from the approved capacity string", () => {
    expect(maxGuests("1–2 guests")).toBe(2);
    expect(maxGuests("2-3 guests")).toBe(3);
    expect(maxGuests("Single occupancy")).toBe(1);
  });
});

describe("formatUgx", () => {
  it("uses the approved UGX prefix, never Intl's USh", () => {
    expect(formatUgx(250000)).toBe("UGX 250,000");
    expect(formatUgx(350000)).not.toContain("USh");
  });
});
