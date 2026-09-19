import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { OfferPill } from "@/containers/offers/molecules/OfferPill";
import { offerPricing } from "@/containers/offers/pricing";
import { formatUgx } from "@/utils/currency";

export interface OfferPriceProps {
  priceUgx?: number;
  wasPriceUgx?: number;
  priceUnit?: string;
  /** Shown in the price's place when an offer carries no price. */
  fallback?: string;
  size?: "md" | "lg";
  savingPrefix?: string;
}

const FIGURE = { md: { xs: "1.5rem", md: "1.625rem" }, lg: { xs: "1.875rem", md: "2.25rem" } };

/**
 * The price block: the current price in the display face, the struck-through
 * "was" price and a garden "Save n%" pill — both only when `offerPricing`
 * confirms a real saving — then the unit. The strike-through is an `<s>` with
 * a visually hidden "Was", so assistive tech reads "was UGX …" rather than
 * two bare numbers.
 */
export function OfferPrice({
  priceUgx,
  wasPriceUgx,
  priceUnit,
  fallback = "Priced on enquiry",
  size = "md",
  savingPrefix = "Save",
}: OfferPriceProps) {
  const { discounted, savingPercent } = offerPricing(priceUgx, wasPriceUgx);

  // No price: a quiet line, not a display-face figure pretending to be one.
  if (priceUgx === undefined) {
    return (
      <Text variant="body2" component="p" color="text.secondary" sx={{ fontStyle: "italic" }}>
        {fallback}
      </Text>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 2, rowGap: 1 }}
      >
        <Text
          component="p"
          sx={{ fontFamily: "var(--font-display)", fontSize: FIGURE[size], lineHeight: 1.1 }}
        >
          {formatUgx(priceUgx)}
        </Text>
        {discounted && wasPriceUgx !== undefined && (
          <>
            <Text component="s" variant="body2" color="text.secondary">
              <VisuallyHidden>Was </VisuallyHidden>
              {formatUgx(wasPriceUgx)}
            </Text>
            <OfferPill tone="garden">{`${savingPrefix} ${savingPercent}%`}</OfferPill>
          </>
        )}
      </Box>
      {priceUnit && (
        <Text variant="body2" color="text.secondary">
          {priceUnit}
        </Text>
      )}
    </Box>
  );
}
