const groups = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/**
 * Formats an indicative transfer fare as `US$55`.
 *
 * Transfers are the one surface priced in US dollars — the fares are what an
 * international arrival compares against a taxi app or a tour operator's
 * quote, and they do. The rest of the site stays on `formatUgx`
 * (`utils/currency.ts`), which remains the single approved source for room,
 * dining and wellness rates. `US$` rather than a bare `$` so the figure can
 * never be read as another dollar.
 *
 * Every figure this formats is invented (TODO(EMIN-Q09)) and labelled
 * "indicative" wherever it renders.
 */
export function formatUsd(amount: number): string {
  return `US$${groups.format(Math.round(amount))}`;
}
