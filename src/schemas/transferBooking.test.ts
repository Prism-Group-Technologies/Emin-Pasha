import { describe, expect, it } from "vitest";

import { transferBookingSchema } from "@/schemas/transferBooking";

const valid = {
  service: "arrival",
  vehicle: "executive-saloon",
  date: "2026-10-01",
  flightNumber: "KQ 414",
  hours: 3,
  passengers: 2,
  bags: 2,
  nights: 3,
  addOns: [],
  name: "Ada Lovelace",
  email: "ada@example.com",
  consent: true,
};

const errorPaths = (input: unknown) => {
  const result = transferBookingSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

describe("transferBookingSchema", () => {
  it("accepts a minimal valid airport pickup", () => {
    expect(transferBookingSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a flight number for a pickup or a return", () => {
    expect(errorPaths({ ...valid, flightNumber: "" })).toContain("flightNumber");
    expect(errorPaths({ ...valid, service: "return", flightNumber: undefined })).toContain(
      "flightNumber",
    );
  });

  it("keeps the flight number optional for drop-offs and hourly hire", () => {
    expect(errorPaths({ ...valid, service: "departure", flightNumber: "" })).toEqual([]);
    expect(errorPaths({ ...valid, service: "hourly", flightNumber: "" })).toEqual([]);
  });

  it("accepts common flight-number spellings and rejects nonsense", () => {
    for (const flightNumber of ["KQ414", "kq 414", "5Z 601", "ET338"]) {
      expect(errorPaths({ ...valid, flightNumber })).toEqual([]);
    }
    expect(errorPaths({ ...valid, flightNumber: "tomorrow" })).toContain("flightNumber");
  });

  it("rejects services, vehicles and add-ons outside the closed lists", () => {
    expect(errorPaths({ ...valid, service: "helicopter" })).toContain("service");
    expect(errorPaths({ ...valid, vehicle: "tuk-tuk" })).toContain("vehicle");
    expect(errorPaths({ ...valid, addOns: ["champagne"] })).toContain("addOns.0");
  });

  it("bounds the numeric fields", () => {
    expect(errorPaths({ ...valid, passengers: 0 })).toContain("passengers");
    expect(errorPaths({ ...valid, hours: 1 })).toContain("hours");
    expect(errorPaths({ ...valid, bags: 1.5 })).toContain("bags");
  });

  it("requires consent and a date, and treats a filled honeypot as invalid", () => {
    expect(errorPaths({ ...valid, consent: false })).toContain("consent");
    expect(errorPaths({ ...valid, date: "" })).toContain("date");
    expect(errorPaths({ ...valid, website: "bot" })).toContain("website");
  });
});
