import { describe, expect, it } from "vitest";

import { storyEnquirySchema } from "@/schemas/storyEnquiry";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  focus: "any",
  consent: true,
};

describe("storyEnquirySchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(storyEnquirySchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent — an unticked box is not consent", () => {
    expect(storyEnquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("rejects an invalid email and a name that is too short", () => {
    expect(storyEnquirySchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(storyEnquirySchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
  });

  it("rejects a focus outside the closed list", () => {
    expect(storyEnquirySchema.safeParse({ ...valid, focus: "made-up" }).success).toBe(false);
  });

  it("accepts each real focus value", () => {
    for (const focus of ["any", "stay", "celebration", "heritage"]) {
      expect(storyEnquirySchema.safeParse({ ...valid, focus }).success).toBe(true);
    }
  });

  it("treats a filled honeypot as invalid input", () => {
    expect(storyEnquirySchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
  });

  it("keeps phone, preferredDate and message optional", () => {
    const result = storyEnquirySchema.safeParse({
      ...valid,
      phone: "+256 700 000 000",
      preferredDate: "a weekend in March",
      message: "Travelling for the history — anything you would recommend?",
    });
    expect(result.success).toBe(true);
  });
});
