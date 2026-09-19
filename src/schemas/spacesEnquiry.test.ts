import { describe, expect, it } from "vitest";

import { timeOptions } from "@/containers/spaces/copy/enquiry";
import { matcherTimes } from "@/containers/spaces/copy/matcherTimes";
import { spacesEnquirySchema } from "@/schemas/spacesEnquiry";

const valid = {
  requestType: "table",
  space: "acropole-lounge",
  experience: "none",
  guests: 4,
  time: "evening",
  name: "Ada Lovelace",
  email: "ada@example.com",
  consent: true,
};

const issuesAt = (input: unknown, field: string) => {
  const result = spacesEnquirySchema.safeParse(input);
  return result.success ? [] : result.error.issues.filter((issue) => issue.path[0] === field);
};

describe("spacesEnquirySchema", () => {
  it("accepts a minimal table request", () => {
    expect(spacesEnquirySchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent and rejects a filled honeypot", () => {
    expect(spacesEnquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(spacesEnquirySchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
  });

  it("rejects values outside the closed lists", () => {
    for (const field of ["requestType", "space", "experience", "time"]) {
      expect(spacesEnquirySchema.safeParse({ ...valid, [field]: "made-up" }).success).toBe(false);
    }
  });

  it("flags a party larger than the chosen space holds standing, on guests", () => {
    expect(issuesAt({ ...valid, guests: 120 }, "guests")).toHaveLength(1);
    expect(issuesAt({ ...valid, space: "equatorial-gardens", guests: 120 }, "guests")).toHaveLength(
      0,
    );
    expect(issuesAt({ ...valid, space: "any", guests: 120 }, "guests")).toHaveLength(0);
  });

  it("bounds guests between 1 and 250", () => {
    expect(issuesAt({ ...valid, space: "any", guests: 0 }, "guests").length).toBeGreaterThan(0);
    expect(issuesAt({ ...valid, space: "any", guests: 251 }, "guests").length).toBeGreaterThan(0);
  });

  it("requires a phone for private hire and photoshoots only", () => {
    expect(issuesAt({ ...valid, requestType: "private-hire" }, "phone")).toHaveLength(1);
    expect(issuesAt({ ...valid, requestType: "photoshoot" }, "phone")).toHaveLength(1);
    expect(issuesAt({ ...valid, requestType: "experience" }, "phone")).toHaveLength(0);
    const hire = { ...valid, requestType: "private-hire", phone: "+256 700 000 000" };
    expect(spacesEnquirySchema.safeParse(hire).success).toBe(true);
  });

  it("keeps the matcher's hours in step with the form's time options", () => {
    expect(matcherTimes.map((time) => time.id)).toEqual(timeOptions.map((option) => option.value));
  });
});
