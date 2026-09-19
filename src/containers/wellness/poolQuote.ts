import type { PoolAddOn, PoolVisitType } from "@/containers/wellness/copy/poolPlanner";
import { formatUgx } from "@/utils/currency";

export interface PoolQuoteInput {
  visitTypeId: string;
  adults: number;
  children: number;
  addOnIds: string[];
}

export interface PoolQuoteLine {
  label: string;
  amountUgx: number;
}

export interface PoolQuote {
  /** The chosen visit, or `undefined` when the id is unknown / unset. */
  visitType: PoolVisitType | undefined;
  /** Priced rows — the base visit and any add-ons — in display order. */
  lines: PoolQuoteLine[];
  totalUgx: number;
  /** `formatUgx(total)`, or a phrase when there is nothing to total yet. */
  totalLabel: string;
  /** True for private hire: show the party, not a price. */
  isEnquiryOnly: boolean;
  /** One line a guest can read out — or send — to the wellness desk. */
  summary: string;
}

export const POOL_QUOTE_PLACEHOLDER = "Pick a visit to see an indicative total.";
const ENQUIRY_LABEL = "Priced on enquiry";
const NOTE = "indicative — the wellness desk confirms and holds your place.";

/** "2 adults, 1 child" / "3 adults" / "1 adult". Children clause is dropped at zero. */
function peopleText(adults: number, children: number): string {
  const a = `${adults} adult${adults === 1 ? "" : "s"}`;
  if (children <= 0) {
    return a;
  }
  return `${a}, ${children} child${children === 1 ? "" : "ren"}`;
}

/** The base visit row(s), before add-ons. Empty for enquiry-only visits. */
function baseLines(visit: PoolVisitType, adults: number, children: number): PoolQuoteLine[] {
  if (visit.charge === "enquire") {
    return [];
  }
  if (visit.charge === "flat") {
    return [{ label: visit.label, amountUgx: visit.baseUgx }];
  }
  if (visit.charge === "per-family") {
    return [{ label: `${visit.label} · up to 2 adults + 3 children`, amountUgx: visit.baseUgx }];
  }
  const lines: PoolQuoteLine[] = [
    {
      label: `${visit.label} · ${adults} adult${adults === 1 ? "" : "s"}`,
      amountUgx: adults * visit.baseUgx,
    },
  ];
  if (children > 0 && visit.childUgx) {
    lines.push({
      label: `${visit.label} · ${children} child${children === 1 ? "" : "ren"}`,
      amountUgx: children * visit.childUgx,
    });
  }
  return lines;
}

/** One row per shortlisted add-on, priced flat or per head against the party. */
function addOnLines(addOns: PoolAddOn[], ids: string[], party: number): PoolQuoteLine[] {
  return ids
    .map((id) => addOns.find((addOn) => addOn.id === id))
    .filter((addOn): addOn is PoolAddOn => Boolean(addOn))
    .map((addOn) => ({
      label: addOn.label,
      amountUgx: addOn.perPerson ? addOn.priceUgx * Math.max(party, 1) : addOn.priceUgx,
    }));
}

/**
 * The pool planner's view model: turns the guest's choices into priced rows,
 * an indicative total and a desk-ready summary line.
 *
 * A pure function, unit-tested in `poolQuote.test.ts` — the same split the
 * Dining page's `menuView.ts` makes. `usePoolPlanner` holds the state and
 * calls this; the form molecules stay presentational. Nothing here is a
 * checkout: private hire returns `isEnquiryOnly`, and every total is labelled
 * indicative at the call site.
 */
export function buildPoolQuote(
  input: PoolQuoteInput,
  options: { visitTypes: PoolVisitType[]; addOns: PoolAddOn[] },
): PoolQuote {
  const adults = Math.max(0, Math.floor(input.adults));
  const children = Math.max(0, Math.floor(input.children));
  const visitType = options.visitTypes.find((visit) => visit.id === input.visitTypeId);

  if (!visitType) {
    return {
      visitType: undefined,
      lines: [],
      totalUgx: 0,
      totalLabel: POOL_QUOTE_PLACEHOLDER,
      isEnquiryOnly: false,
      summary: POOL_QUOTE_PLACEHOLDER,
    };
  }

  const isEnquiryOnly = visitType.charge === "enquire";
  const party = visitType.charge === "per-family" ? 5 : Math.max(adults + children, 1);
  const lines = [
    ...baseLines(visitType, adults, children),
    ...addOnLines(options.addOns, input.addOnIds, party),
  ];
  const totalUgx = lines.reduce((sum, line) => sum + line.amountUgx, 0);

  const addOnNames = lines
    .filter((line) => !line.label.startsWith(visitType.label))
    .map((line) => line.label.replace(/, per head$/, "").toLowerCase());
  const withText = addOnNames.length ? ` · with ${addOnNames.join(", ")}` : "";
  const partyText =
    visitType.charge === "per-family" ? "family of up to 5" : peopleText(adults, children);

  const summary = isEnquiryOnly
    ? `${visitType.label} · ${partyText}${withText} — please send us a quote.`
    : `${visitType.label} · ${partyText}${withText} — around ${formatUgx(totalUgx)}, ${NOTE}`;

  return {
    visitType,
    lines,
    totalUgx,
    totalLabel: isEnquiryOnly ? ENQUIRY_LABEL : formatUgx(totalUgx),
    isEnquiryOnly,
    summary,
  };
}
