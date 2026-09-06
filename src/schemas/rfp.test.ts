import { describe, expect, it } from "vitest";

import { rfpSchema } from "@/schemas/rfp";

const valid = {
  eventType: "wedding",
  startDate: "2027-03-14",
  guests: 120,
  name: "Ada Lovelace",
  email: "ada@example.com",
  consent: true,
};

describe("rfpSchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(rfpSchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent — an unticked box is not consent", () => {
    expect(rfpSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("rejects an invalid email and a malformed date", () => {
    expect(rfpSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(rfpSchema.safeParse({ ...valid, startDate: "14/03/2027" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(rfpSchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(false);
  });

  it("coerces a numeric string guest count", () => {
    const result = rfpSchema.safeParse({ ...valid, guests: "80" });
    expect(result.success).toBe(true);
    expect(result.data?.guests).toBe(80);
  });
});
