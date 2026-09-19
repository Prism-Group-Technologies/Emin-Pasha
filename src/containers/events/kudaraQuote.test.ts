import { describe, expect, it } from "vitest";

import type { KudaraCateringTier } from "@/containers/events/copy/kudaraCatering";
import type { KudaraExtra } from "@/containers/events/copy/kudaraExtras";
import type { KudaraLayout } from "@/containers/events/copy/kudaraLayouts";
import { KUDARA_QUOTE_PLACEHOLDER, buildKudaraQuote } from "@/containers/events/kudaraQuote";

const LAYOUTS: KudaraLayout[] = [
  {
    id: "theatre",
    label: "Theatre",
    icon: "groups",
    capacity: 500,
    bestFor: "",
    note: "",
    diagram: "theatre",
  },
  {
    id: "uShape",
    label: "U-shape",
    icon: "verified",
    capacity: 70,
    bestFor: "",
    note: "",
    diagram: "uShape",
  },
];

const TIERS: KudaraCateringTier[] = [
  { id: "none", label: "Room & production only", hint: "", perDelegateUgx: 0, perDay: true },
  {
    id: "day-delegate",
    label: "Day-delegate catering",
    hint: "",
    perDelegateUgx: 95000,
    perDay: true,
  },
  { id: "gala", label: "Add a gala dinner", hint: "", perDelegateUgx: 305000, perDay: false },
];

const EXTRAS: KudaraExtra[] = [
  { id: "streaming", label: "Managed live stream", hint: "", priceUgx: 2_800_000 },
  { id: "rooms", label: "Delegate room block", hint: "", priceUgx: 320000, perDelegate: true },
];

const options = { layouts: LAYOUTS, cateringTiers: TIERS, extras: EXTRAS };
const HIRE = 6_500_000;

const run = (over: Partial<Parameters<typeof buildKudaraQuote>[0]> = {}) =>
  buildKudaraQuote(
    { layoutId: "theatre", delegates: 200, days: 1, cateringId: "none", extraIds: [], ...over },
    options,
  );

describe("buildKudaraQuote · base", () => {
  it("returns the placeholder before a layout is chosen", () => {
    const quote = buildKudaraQuote(
      { layoutId: "", delegates: 200, days: 1, cateringId: "none", extraIds: [] },
      options,
    );
    expect(quote.layout).toBeUndefined();
    expect(quote.lines).toEqual([]);
    expect(quote.summary).toBe(KUDARA_QUOTE_PLACEHOLDER);
  });

  it("charges hall hire per day and nothing else at the 'none' tier", () => {
    const quote = run({ days: 2 });
    expect(quote.lines).toEqual([
      { label: "Kudara Hall hire · Theatre · 2 days", amountUgx: HIRE * 2 },
    ]);
    expect(quote.totalUgx).toBe(HIRE * 2);
  });

  it("clamps fractional and sub-1 inputs", () => {
    const quote = run({ delegates: 0, days: 0.5 });
    expect(quote.lines[0]?.label).toContain("1 day");
    expect(quote.perDelegateLabel).toBe(quote.totalLabel + " per delegate");
  });
});

describe("buildKudaraQuote · catering and extras", () => {
  it("scales a per-day tier by delegates and days", () => {
    const quote = run({ delegates: 100, days: 3, cateringId: "day-delegate" });
    expect(quote.lines).toContainEqual({
      label: "Day-delegate catering · 100 delegates × 3 days",
      amountUgx: 95000 * 100 * 3,
    });
  });

  it("charges a gala tier once, not per day", () => {
    const quote = run({ delegates: 100, days: 2, cateringId: "gala" });
    expect(quote.lines).toContainEqual({
      label: "Add a gala dinner · 100 delegates",
      amountUgx: 305000 * 100,
    });
  });

  it("adds flat extras once and per-delegate extras per head", () => {
    const quote = run({ delegates: 50, extraIds: ["streaming", "rooms"] });
    expect(quote.lines).toContainEqual({ label: "Managed live stream", amountUgx: 2_800_000 });
    expect(quote.lines).toContainEqual({
      label: "Delegate room block · 50 delegates",
      amountUgx: 320000 * 50,
    });
  });

  it("ignores unknown extra ids", () => {
    expect(run({ extraIds: ["nope"] }).lines).toHaveLength(1);
  });
});

describe("buildKudaraQuote · capacity", () => {
  it("flags a delegate count past the layout maximum", () => {
    const quote = run({ layoutId: "uShape", delegates: 120 });
    expect(quote.overCapacity).toBe(true);
    expect(quote.summary).toContain("above the indicative u-shape maximum of 70");
  });

  it("does not flag a count within the maximum", () => {
    expect(run({ layoutId: "theatre", delegates: 300 }).overCapacity).toBe(false);
  });
});
