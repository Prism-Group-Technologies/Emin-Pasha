import { Text } from "@/components/atoms/Text";
import { formatUgx } from "@/utils/currency";

/**
 * "from UGX 250,000". UGX only — `identity.currency` is the single source and
 * `roomCategorySchema` accepts no other currency field, so there is no path
 * by which a USD figure could reach this component (CLAUDE.md §0.1).
 *
 * "from" is deliberate: the rate card is a starting rate, and Q51 (engine
 * rate parity) is unresolved, so the number is framed as a floor rather than
 * a quote.
 */
export function RateBadge({ rateUgx, prefix = "from" }: { rateUgx: number; prefix?: string }) {
  return (
    <Text variant="overline" component="p">
      {`${prefix} ${formatUgx(rateUgx)}`}
      <Text component="span" variant="body2" color="text.secondary" sx={{ ml: 2 }}>
        per night
      </Text>
    </Text>
  );
}
