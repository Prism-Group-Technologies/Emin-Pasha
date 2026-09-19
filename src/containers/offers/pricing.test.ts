import { describe, expect, it } from "vitest";

import { offerPricing } from "@/containers/offers/pricing";

describe("offerPricing", () => {
  it("derives the saving from a higher was-price", () => {
    expect(offerPricing(1_520_000, 1_900_000)).toEqual({
      discounted: true,
      savingPercent: 20,
      savingAmount: 380_000,
    });
  });

  it("rounds the percentage down so the badge never overstates it", () => {
    expect(offerPricing(95_000, 115_000).savingPercent).toBe(17);
  });

  it("treats a missing price or was-price as no discount", () => {
    expect(offerPricing(85_000).discounted).toBe(false);
    expect(offerPricing(undefined, 100_000).discounted).toBe(false);
  });

  it("refuses a was-price that is not higher than the price", () => {
    expect(offerPricing(100_000, 100_000)).toEqual({
      discounted: false,
      savingPercent: 0,
      savingAmount: 0,
    });
    expect(offerPricing(120_000, 100_000).discounted).toBe(false);
  });
});
