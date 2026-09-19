import { describe, expect, it } from "vitest";

import { diningReservationSchema } from "@/schemas/diningReservation";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  outlet: "any",
  partySize: 2,
  occasion: "dining",
  consent: true,
};

describe("diningReservationSchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(diningReservationSchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent — an unticked box is not consent", () => {
    expect(diningReservationSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("rejects an invalid email and an out-of-range party size", () => {
    expect(diningReservationSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(diningReservationSchema.safeParse({ ...valid, partySize: 0 }).success).toBe(false);
    expect(diningReservationSchema.safeParse({ ...valid, partySize: 21 }).success).toBe(false);
  });

  it("rejects an outlet or occasion outside the closed list", () => {
    expect(diningReservationSchema.safeParse({ ...valid, outlet: "made-up" }).success).toBe(false);
    expect(diningReservationSchema.safeParse({ ...valid, occasion: "brunch" }).success).toBe(false);
  });

  it("accepts each real outlet id", () => {
    for (const outlet of [
      "hakki-pasha-restaurant-bar",
      "sir-samuel-baker-fine-dining",
      "rooftop-terrace",
      "manutea-wine-whisky-lounge",
      "in-room-dining",
    ]) {
      expect(diningReservationSchema.safeParse({ ...valid, outlet }).success).toBe(true);
    }
  });

  it("keeps date, time, phone and message optional", () => {
    const result = diningReservationSchema.safeParse({
      ...valid,
      date: "2026-10-01",
      time: "19:30",
      phone: "+256 700 000 000",
      message: "Window table if possible",
    });
    expect(result.success).toBe(true);
  });
});
