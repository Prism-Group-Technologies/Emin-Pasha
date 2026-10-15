import { afterEach, describe, expect, it, vi } from "vitest";

import { identity } from "@/content/identity";
import type { EnquirySpec } from "@/lib/enquiry/types";
import { submitToWeb3Forms } from "@/lib/web3forms/submit";

interface Values {
  email: string;
  party: number;
}

const spec: EnquirySpec<Values> = {
  kind: "dining",
  subject: "Table reservation enquiry",
  replyTo: (values) => values.email,
  toFields: (values) => [
    { label: "Party size", value: String(values.party) },
    { label: "Email", value: values.email },
  ],
  messages: { success: "ok", failure: "no", rateLimited: "slow" },
};

const values: Values = { email: "guest@example.com", party: 4 };

/** The body the provider actually received, parsed back out of the mock. */
const sentBody = (mock: ReturnType<typeof vi.fn>) =>
  JSON.parse((mock.mock.calls[0]?.[1] as { body: string }).body) as Record<string, unknown>;

const okReply = () => ({ ok: true, status: 200, json: () => Promise.resolve({ success: true }) });

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("submitToWeb3Forms", () => {
  it("reports unconfigured, and sends nothing, when no key is set", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitToWeb3Forms(spec, values)).resolves.toEqual({ status: "unconfigured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

/**
 * The keys are read at module load, so these cases re-import the module with
 * the env in place rather than stubbing after the fact.
 */
describe("submitToWeb3Forms, configured", () => {
  const withKeys = async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY_INFO", "info-key");
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY_RESERVATIONS", "reservations-key");
    vi.resetModules();
    return (await import("@/lib/web3forms/submit")).submitToWeb3Forms;
  };

  it("posts the desk's own key and flattens the ordered fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue(okReply());
    vi.stubGlobal("fetch", fetchMock);
    const submit = await withKeys();

    await expect(submit(spec, values)).resolves.toEqual({ status: "sent" });

    const body = sentBody(fetchMock);
    // `dining` is a reservations-desk kind, so it must use that desk's key.
    expect(body.access_key).toBe("reservations-key");
    expect(body.Department).toBe(identity.reservationsEmail);
    expect(body.subject).toBe("Table reservation enquiry");
    expect(body.replyto).toBe("guest@example.com");
    expect(body.botcheck).toBe(false);
    expect(body["Party size"]).toBe("4");
    expect(body.Form).toBe("dining");
  });

  it("fails on a provider error rather than reporting a send", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: () => Promise.resolve({ success: false, message: "Invalid access key" }),
      }),
    );
    const submit = await withKeys();

    await expect(submit(spec, values)).resolves.toEqual({
      status: "failed",
      reason: "Invalid access key",
    });
  });

  it("fails on a network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const submit = await withKeys();

    await expect(submit(spec, values)).resolves.toEqual({ status: "failed", reason: "offline" });
  });
});
