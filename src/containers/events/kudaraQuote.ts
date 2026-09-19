import {
  KUDARA_DAY_HIRE_UGX,
  type KudaraCateringTier,
} from "@/containers/events/copy/kudaraCatering";
import type { KudaraExtra } from "@/containers/events/copy/kudaraExtras";
import type { KudaraLayout } from "@/containers/events/copy/kudaraLayouts";
import { formatUgx } from "@/utils/currency";

export interface KudaraQuoteInput {
  layoutId: string;
  delegates: number;
  days: number;
  cateringId: string;
  extraIds: string[];
}

export interface KudaraQuoteLine {
  label: string;
  amountUgx: number;
}

export interface KudaraQuote {
  layout: KudaraLayout | undefined;
  lines: KudaraQuoteLine[];
  totalUgx: number;
  /** `formatUgx(total)`, or the placeholder phrase before a layout is chosen. */
  totalLabel: string;
  /** Indicative per-delegate figure, formatted, or `null` when there is no total. */
  perDelegateLabel: string | null;
  /** True when the delegate count is past this layout's indicative maximum. */
  overCapacity: boolean;
  /** One line an organiser can drop into the proposal request. */
  summary: string;
}

export const KUDARA_QUOTE_PLACEHOLDER = "Pick a layout to see an indicative total.";
const NOTE = "indicative — the events team confirms on a written proposal.";

interface Options {
  layouts: KudaraLayout[];
  cateringTiers: KudaraCateringTier[];
  extras: KudaraExtra[];
}

/** "1 day" / "3 days". */
function dayText(days: number): string {
  return `${days} day${days === 1 ? "" : "s"}`;
}

function cateringLine(
  tier: KudaraCateringTier,
  delegates: number,
  days: number,
): KudaraQuoteLine | null {
  if (tier.perDelegateUgx <= 0) {
    return null;
  }
  const nights = tier.perDay ? days : 1;
  const span = tier.perDay ? `${delegates} delegates × ${dayText(days)}` : `${delegates} delegates`;
  return { label: `${tier.label} · ${span}`, amountUgx: tier.perDelegateUgx * delegates * nights };
}

function extraLines(extras: KudaraExtra[], ids: string[], delegates: number): KudaraQuoteLine[] {
  return ids
    .map((id) => extras.find((extra) => extra.id === id))
    .filter((extra): extra is KudaraExtra => Boolean(extra))
    .map((extra) => ({
      label: extra.perDelegate ? `${extra.label} · ${delegates} delegates` : extra.label,
      amountUgx: extra.perDelegate ? extra.priceUgx * delegates : extra.priceUgx,
    }));
}

function summaryLine(
  layout: KudaraLayout,
  input: { delegates: number; days: number },
  tier: KudaraCateringTier | undefined,
  totalUgx: number,
): string {
  const catering = tier && tier.perDelegateUgx > 0 ? ` · ${tier.label}` : "";
  const over =
    input.delegates > layout.capacity
      ? ` (above the indicative ${layout.label.toLowerCase()} maximum of ${layout.capacity} — the team will advise)`
      : "";
  return `Kudara Hall · ${layout.label} · ${input.delegates} delegates · ${dayText(input.days)}${catering}${over} — around ${formatUgx(totalUgx)}, ${NOTE}`;
}

const EMPTY: KudaraQuote = {
  layout: undefined,
  lines: [],
  totalUgx: 0,
  totalLabel: KUDARA_QUOTE_PLACEHOLDER,
  perDelegateLabel: null,
  overCapacity: false,
  summary: KUDARA_QUOTE_PLACEHOLDER,
};

/**
 * The Kudara Hall estimator's view model: turns an organiser's layout, headcount,
 * duration, catering tier and extras into priced rows, an indicative total and a
 * one-line summary for the proposal request.
 *
 * A pure function, unit-tested in `kudaraQuote.test.ts` — the same split the
 * pool planner's `poolQuote.ts` makes. It is never a checkout: every figure is
 * a placeholder and the summary says so.
 */
export function buildKudaraQuote(input: KudaraQuoteInput, options: Options): KudaraQuote {
  const delegates = Math.max(1, Math.floor(input.delegates));
  const days = Math.max(1, Math.floor(input.days));
  const layout = options.layouts.find((entry) => entry.id === input.layoutId);
  if (!layout) {
    return EMPTY;
  }
  const tier = options.cateringTiers.find((entry) => entry.id === input.cateringId);

  const lines: KudaraQuoteLine[] = [
    {
      label: `Kudara Hall hire · ${layout.label} · ${dayText(days)}`,
      amountUgx: KUDARA_DAY_HIRE_UGX * days,
    },
  ];
  const catering = tier ? cateringLine(tier, delegates, days) : null;
  if (catering) {
    lines.push(catering);
  }
  lines.push(...extraLines(options.extras, input.extraIds, delegates));

  const totalUgx = lines.reduce((sum, line) => sum + line.amountUgx, 0);

  return {
    layout,
    lines,
    totalUgx,
    totalLabel: formatUgx(totalUgx),
    perDelegateLabel: `${formatUgx(Math.round(totalUgx / delegates))} per delegate`,
    overCapacity: delegates > layout.capacity,
    summary: summaryLine(layout, { delegates, days }, tier, totalUgx),
  };
}
