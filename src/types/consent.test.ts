import { describe, expect, it } from "vitest";

import { CONSENT_VERSION, defaultConsentRecord, isValidConsentRecord } from "@/types/consent";

describe("isValidConsentRecord", () => {
  const good = {
    preferences: { necessary: true, analytics: true, marketing: false },
    decidedAt: "2026-08-03T10:00:00.000Z",
    version: CONSENT_VERSION,
  };

  it("accepts a well-formed record", () => {
    expect(isValidConsentRecord(good)).toBe(true);
  });

  it("accepts an undecided record", () => {
    expect(isValidConsentRecord(defaultConsentRecord)).toBe(true);
  });

  it("rejects a hand-edited necessary:false — necessary is not a choice", () => {
    expect(
      isValidConsentRecord({ ...good, preferences: { ...good.preferences, necessary: false } }),
    ).toBe(false);
  });

  it("rejects a stale version, so the banner re-shows rather than assuming consent", () => {
    expect(isValidConsentRecord({ ...good, version: CONSENT_VERSION + 1 })).toBe(false);
  });

  it("rejects junk", () => {
    for (const value of [null, undefined, "{}", 42, {}, { preferences: {} }]) {
      expect(isValidConsentRecord(value)).toBe(false);
    }
  });
});
