import { describe, expect, it } from "vitest";

import { kindFromEndpoint, loadSpec } from "@/lib/enquiry/registry";
import { identity } from "@/content/identity";
import type { EnquiryKind } from "@/lib/mail/types";

const KINDS: EnquiryKind[] = [
  "booking",
  "contact",
  "dining",
  "newsletter",
  "rfp",
  "room",
  "spa",
  "spaces",
  "story",
  "transfer",
];

describe("kindFromEndpoint", () => {
  it("maps every enquiry endpoint to its kind", () => {
    for (const kind of KINDS) {
      expect(kindFromEndpoint(`/api/enquiry/${kind}`)).toBe(kind);
    }
  });

  it("tolerates a trailing slash and a query string", () => {
    expect(kindFromEndpoint("/api/enquiry/dining/")).toBe("dining");
    expect(kindFromEndpoint("/api/enquiry/room?from=hero")).toBe("room");
  });

  /**
   * The guard that keeps the Web3Forms path from firing on an endpoint it has
   * no spec for — `submitEnquiry` falls back to posting the route instead.
   */
  it("returns null for anything that is not an enquiry endpoint", () => {
    expect(kindFromEndpoint("/api/booking/availability")).toBeNull();
    expect(kindFromEndpoint("/api/enquiry/unknown")).toBeNull();
  });
});

describe("loadSpec", () => {
  it("resolves a spec for every kind, with that kind's own name on it", async () => {
    for (const kind of KINDS) {
      const spec = await loadSpec(kind);
      expect(spec.kind).toBe(kind);
      expect(spec.messages.success.length).toBeGreaterThan(0);
      expect(spec.messages.failure.length).toBeGreaterThan(0);
    }
  });

  /**
   * Routing must land on one of the two approved inboxes (§1) — a third
   * address would be invented, and would also have no access key behind it.
   */
  it("routes contact intents only to approved inboxes", async () => {
    const spec = await loadSpec("contact");
    const approved = [identity.email, identity.reservationsEmail];
    for (const intent of ["stay", "dining", "events", "wellness", "general"]) {
      expect(approved).toContain(spec.to?.({ intent } as never));
    }
  });
});
