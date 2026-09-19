import { describe, expect, it } from "vitest";

import { contactSchema } from "@/schemas/contact";

const valid = {
  intent: "stay",
  name: "Ada Lovelace",
  email: "ada@example.com",
  replyChannel: "email",
  contactTime: "any",
  consent: true,
};

const issuesFor = (input: Record<string, unknown>) => {
  const result = contactSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

describe("contactSchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts every intent the form renders", () => {
    for (const intent of ["stay", "events", "dining", "wellness"]) {
      expect(contactSchema.safeParse({ ...valid, intent }).success).toBe(true);
    }
  });

  it("rejects an intent outside the closed list", () => {
    expect(issuesFor({ ...valid, intent: "made-up" })).toContain("intent");
  });

  it("requires consent and a real email", () => {
    expect(issuesFor({ ...valid, consent: false })).toContain("consent");
    expect(issuesFor({ ...valid, email: "nope" })).toContain("email");
  });

  it("requires a phone number for a call or WhatsApp reply", () => {
    expect(issuesFor({ ...valid, replyChannel: "whatsapp" })).toContain("phone");
    expect(issuesFor({ ...valid, replyChannel: "phone", phone: "+256 700 000 000" })).toEqual([]);
  });

  it("requires a message only for 'something else'", () => {
    expect(issuesFor({ ...valid, intent: "general" })).toContain("message");
    expect(issuesFor({ ...valid, intent: "general", message: "A press enquiry, please." })).toEqual(
      [],
    );
  });

  it("requires departure to fall after arrival", () => {
    const dates = { arrival: "2026-10-10", departure: "2026-10-10" };
    expect(issuesFor({ ...valid, ...dates })).toContain("departure");
    expect(issuesFor({ ...valid, ...dates, departure: "2026-10-12" })).toEqual([]);
  });

  it("accepts empty dates and rejects malformed ones", () => {
    expect(issuesFor({ ...valid, arrival: "", eventDate: "" })).toEqual([]);
    expect(issuesFor({ ...valid, eventDate: "10/10/2026" })).toContain("eventDate");
  });

  it("bounds the guest count", () => {
    expect(issuesFor({ ...valid, guests: "" })).toEqual([]);
    expect(issuesFor({ ...valid, guests: "40" })).toEqual([]);
    expect(issuesFor({ ...valid, guests: "0" })).toContain("guests");
    expect(issuesFor({ ...valid, guests: "lots" })).toContain("guests");
  });

  it("treats a filled honeypot as invalid input", () => {
    expect(issuesFor({ ...valid, website: "bot" })).toContain("website");
  });
});
