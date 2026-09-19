import { describe, expect, it } from "vitest";

import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import { capacityWarning } from "@/containers/experiences/transfer/transferCapacity";
import {
  TRANSFER_QUOTE_PLACEHOLDER,
  type TransferQuoteInput,
  buildTransferQuote,
} from "@/containers/experiences/transfer/transferQuote";

const base: TransferQuoteInput = {
  service: "arrival",
  vehicle: "executive-saloon",
  passengers: 2,
  bags: 2,
  hours: 3,
  nights: 0,
  addOns: [],
};

describe("buildTransferQuote", () => {
  it("returns the placeholder for an unknown service or vehicle", () => {
    const quote = buildTransferQuote({ ...base, vehicle: "hovercraft" });
    expect(quote.lines).toEqual([]);
    expect(quote.totalLabel).toBe(TRANSFER_QUOTE_PLACEHOLDER);
  });

  it("prices a one-way airport pickup at the vehicle's fare", () => {
    const quote = buildTransferQuote(base);
    expect(quote.totalUsd).toBe(55);
    expect(quote.totalLabel).toBe("US$55");
    expect(quote.complimentary).toBe(false);
  });

  it("charges two legs less 10% for a return", () => {
    const quote = buildTransferQuote({ ...base, service: "return", vehicle: "premium-suv" });
    expect(quote.totalUsd).toBe(144);
    expect(quote.lines[0]?.label).toContain("10% off");
  });

  it("prices hourly hire on the hourly rate and enforces the 3-hour minimum", () => {
    expect(buildTransferQuote({ ...base, service: "hourly", hours: 5 }).totalUsd).toBe(125);
    expect(buildTransferQuote({ ...base, service: "hourly", hours: 1 }).totalUsd).toBe(75);
  });

  it("waives the airport fare from 8 nights but keeps add-ons priced", () => {
    const quote = buildTransferQuote({ ...base, nights: 8, addOns: ["child-seat"] });
    expect(quote.complimentary).toBe(true);
    expect(quote.lines[0]?.amountUsd).toBe(0);
    expect(quote.totalUsd).toBe(10);
  });

  it("does not waive at 7 nights, nor for hourly hire", () => {
    expect(buildTransferQuote({ ...base, nights: 7 }).complimentary).toBe(false);
    const hourly = buildTransferQuote({ ...base, service: "hourly", nights: 30 });
    expect(hourly.complimentary).toBe(false);
    expect(hourly.totalUsd).toBe(75);
  });

  it("scales VIP meet & assist per person and per leg", () => {
    const quote = buildTransferQuote({ ...base, service: "return", addOns: ["vip-meet-assist"] });
    // 2 × 55 × 0.9 = 99, plus 60 × 2 people × 2 legs = 240.
    expect(quote.totalUsd).toBe(339);
  });

  it("ignores add-ons that don't apply to the chosen service", () => {
    const quote = buildTransferQuote({ ...base, service: "hourly", addOns: ["vip-meet-assist"] });
    expect(quote.lines).toHaveLength(1);
  });

  it("writes a desk-ready summary with party, extras and the total", () => {
    const { summary } = buildTransferQuote({ ...base, addOns: ["sim-card"] });
    expect(summary).toContain("2 passengers, 2 cases");
    expect(summary).toContain("local sim");
    expect(summary).toContain("US$75");
  });
});

describe("capacityWarning", () => {
  const saloon = vehicles[0];

  it("is null when the party fits", () => {
    expect(capacityWarning(saloon, 3, 2, vehicles)).toBeNull();
  });

  it("suggests the smallest car that fits", () => {
    expect(capacityWarning(saloon, 4, 3, vehicles)).toContain("Premium SUV");
    expect(capacityWarning(saloon, 6, 2, vehicles)).toContain("Business Van");
  });

  it("falls back to a convoy note when nothing fits", () => {
    expect(capacityWarning(saloon, 30, 10, vehicles)).toContain("more than one car");
  });
});
