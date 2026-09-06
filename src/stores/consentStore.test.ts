import { beforeEach, describe, expect, it } from "vitest";

import { hasConsent, useConsentStore } from "@/stores/consentStore";
import { CONSENT_STORAGE_KEY } from "@/types/consent";

describe("consentStore", () => {
  beforeEach(() => {
    useConsentStore.getState().reset();
  });

  it("grants nothing before a decision is recorded", () => {
    expect(hasConsent("analytics")).toBe(false);
    expect(hasConsent("marketing")).toBe(false);
  });

  it("always grants necessary", () => {
    expect(hasConsent("necessary")).toBe(true);
  });

  it("records a decision and stamps decidedAt", () => {
    useConsentStore.getState().decide({ analytics: true, marketing: false });
    expect(hasConsent("analytics")).toBe(true);
    expect(hasConsent("marketing")).toBe(false);
    expect(useConsentStore.getState().record.decidedAt).not.toBeNull();
  });

  it("distinguishes 'rejected everything' from 'not asked yet'", () => {
    useConsentStore.getState().decide({ analytics: false, marketing: false });
    const { record } = useConsentStore.getState();
    expect(record.decidedAt).not.toBeNull();
    expect(hasConsent("analytics")).toBe(false);
  });

  it("persists the decision under the documented key", () => {
    useConsentStore.getState().decide({ analytics: true, marketing: true });
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw ?? "{}").state.record.preferences.marketing).toBe(true);
  });
});
