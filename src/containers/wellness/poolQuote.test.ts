import { describe, expect, it } from "vitest";

import type { PoolAddOn, PoolVisitType } from "@/containers/wellness/copy/poolPlanner";
import { POOL_QUOTE_PLACEHOLDER, buildPoolQuote } from "@/containers/wellness/poolQuote";

const VISIT_TYPES: PoolVisitType[] = [
  {
    id: "day-pass",
    label: "Day pass",
    hint: "",
    charge: "per-person",
    baseUgx: 50000,
    childUgx: 25000,
    unit: "",
  },
  { id: "lane", label: "Sunrise lane hire", hint: "", charge: "flat", baseUgx: 70000, unit: "" },
  {
    id: "family",
    label: "Family garden day",
    hint: "",
    charge: "per-family",
    baseUgx: 150000,
    unit: "",
  },
  {
    id: "private-hire",
    label: "Private poolside hire",
    hint: "",
    charge: "enquire",
    baseUgx: 0,
    unit: "",
  },
];

const ADD_ONS: PoolAddOn[] = [
  { id: "loungers", label: "Reserved loungers", hint: "", priceUgx: 30000 },
  { id: "lunch", label: "Poolside lunch, per head", hint: "", priceUgx: 65000, perPerson: true },
];

const opts = { visitTypes: VISIT_TYPES, addOns: ADD_ONS };
const day = (over: Partial<Parameters<typeof buildPoolQuote>[0]> = {}) =>
  buildPoolQuote({ visitTypeId: "day-pass", adults: 2, children: 0, addOnIds: [], ...over }, opts);

describe("buildPoolQuote · base pricing", () => {
  it("returns the placeholder when no visit type is chosen", () => {
    const quote = buildPoolQuote({ visitTypeId: "", adults: 2, children: 0, addOnIds: [] }, opts);

    expect(quote.visitType).toBeUndefined();
    expect(quote.lines).toEqual([]);
    expect(quote.totalLabel).toBe(POOL_QUOTE_PLACEHOLDER);
    expect(quote.summary).toBe(POOL_QUOTE_PLACEHOLDER);
  });

  it("prices a per-person visit with adults and children on separate rows", () => {
    const quote = day({ adults: 2, children: 3 });

    expect(quote.lines).toEqual([
      { label: "Day pass · 2 adults", amountUgx: 100000 },
      { label: "Day pass · 3 children", amountUgx: 75000 },
    ]);
    expect(quote.totalLabel).toBe("UGX 175,000");
    expect(quote.summary).toContain("2 adults, 3 children");
    expect(quote.summary).toContain("around UGX 175,000");
  });

  it("omits the children row when there are none", () => {
    const quote = day({ adults: 1 });

    expect(quote.lines).toEqual([{ label: "Day pass · 1 adult", amountUgx: 50000 }]);
    expect(quote.summary).not.toContain("child");
  });

  it("clamps negative and fractional counts", () => {
    expect(day({ adults: 2.7, children: -3 }).lines).toEqual([
      { label: "Day pass · 2 adults", amountUgx: 100000 },
    ]);
  });

  it("charges a flat visit once, whatever the party size", () => {
    const quote = buildPoolQuote(
      { visitTypeId: "lane", adults: 4, children: 0, addOnIds: [] },
      opts,
    );

    expect(quote.lines).toEqual([{ label: "Sunrise lane hire", amountUgx: 70000 }]);
  });

  it("charges a per-family visit once and describes a family of five", () => {
    const quote = buildPoolQuote(
      { visitTypeId: "family", adults: 2, children: 3, addOnIds: [] },
      opts,
    );

    expect(quote.lines[0]?.amountUgx).toBe(150000);
    expect(quote.summary).toContain("family of up to 5");
  });
});

describe("buildPoolQuote · add-ons and enquiry-only", () => {
  it("adds flat add-ons once and per-head add-ons per person", () => {
    const quote = day({ adults: 2, children: 1, addOnIds: ["loungers", "lunch"] });

    expect(quote.lines).toContainEqual({ label: "Reserved loungers", amountUgx: 30000 });
    expect(quote.lines).toContainEqual({ label: "Poolside lunch, per head", amountUgx: 195000 });
    expect(quote.totalUgx).toBe(125000 + 30000 + 195000);
    expect(quote.summary).toContain("with reserved loungers, poolside lunch");
  });

  it("ignores unknown add-on ids", () => {
    expect(day({ addOnIds: ["nope"] }).lines).toHaveLength(1);
  });

  it("marks private hire as enquiry-only with no total", () => {
    const quote = buildPoolQuote(
      { visitTypeId: "private-hire", adults: 40, children: 10, addOnIds: [] },
      opts,
    );

    expect(quote.isEnquiryOnly).toBe(true);
    expect(quote.totalLabel).toBe("Priced on enquiry");
    expect(quote.summary).toContain("40 adults, 10 children");
    expect(quote.summary).toContain("send us a quote");
  });
});
