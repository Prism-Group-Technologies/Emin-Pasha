import { Text } from "@/components/atoms/Text";
import { formatUsd } from "@/containers/experiences/transfer/currency";

/**
 * "From US$55 one way · indicative" — the display-face figure with its unit
 * in small secondary type. Every transfer price on the page renders through
 * this, so the "indicative" qualifier can never be dropped from one card.
 */
export function PriceTag({ amountUsd, unit }: { amountUsd: number; unit: string }) {
  return (
    <Text
      component="p"
      sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", lineHeight: 1.2 }}
    >
      <Text component="span" variant="body2" color="text.secondary">
        From{" "}
      </Text>
      {formatUsd(amountUsd)}{" "}
      <Text component="span" variant="body2" color="text.secondary">
        {unit} · indicative
      </Text>
    </Text>
  );
}
