import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { identity } from "@/content/identity";

export interface OfferCardProps {
  name: string;
  description: string;
  priceUgx?: number;
  schedule?: string;
  ctaLabel: string;
  ctaHref: string;
}

const priceGroups = new Intl.NumberFormat("en-UG");

/**
 * Formats this card's rate as the approved copy writes it: `UGX 85,000`.
 *
 * Local on purpose. `utils/currency.ts#formatUgx` is shared by ~20 price
 * surfaces and currently emits a hard-coded `USD` prefix, so correcting it
 * there would move every one of those surfaces at once. This card owns its
 * own presentation instead, and takes the code from `identity.currency` —
 * the single approved source — rather than a literal "UGX".
 *
 * Only the grouping comes from `Intl`, for the same reason `formatUgx` gives:
 * `style: "currency"` renders UGX as **"USh"**, a legitimate symbol the
 * approved copy never uses.
 */
function formatOfferPrice(amount: number): string {
  return `${identity.currency} ${priceGroups.format(amount)}`;
}

/**
 * One standing offer.
 *
 * The price and schedule now lead as gold-ruled facts at the top of the card
 * rather than trailing under the copy, and each card carries its own CTA. The
 * previous version put both meta values in a thin row at the bottom and left
 * the rest of a tall card empty, which is exactly the "nothing anchors the
 * bottom edge" problem that made this row look unfinished.
 *
 * **The price is rendered in UGX**, matching the `priceUgx` figure the content
 * layer actually stores — see `formatOfferPrice` above.
 *
 * **The day conflict is respected by omission.** The source gives conflicting
 * day ranges for Happy Hour, so `content/offers.ts` carries only the confirmed
 * time window; this renders what an offer actually holds and never synthesises
 * "Mon–Fri" to fill the gap.
 */
export function OfferCard({
  name,
  description,
  priceUgx,
  schedule,
  ctaLabel,
  ctaHref,
}: OfferCardProps) {
  const facts = [priceUgx !== undefined ? formatOfferPrice(priceUgx) : undefined, schedule].filter(
    (fact): fact is string => Boolean(fact),
  );

  return (
    <Box sx={cardSurface()}>
      {facts.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
          {facts.map((fact) => (
            <Text
              key={fact}
              variant="overline"
              component="span"
              sx={{
                px: 3,
                py: 1,
                border: "1px solid",
                borderColor: "primary.main",
                color: "text.primary",
                fontFamily: "var(--font-cartographic)",
              }}
            >
              {fact}
            </Text>
          ))}
        </Box>
      )}
      <Text variant="h3" component="h3" sx={{ mb: 3 }}>
        {name}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ mb: 5, textWrap: "pretty" }}>
        {description}
      </Text>
      <Button href={ctaHref} variant="ghost" sx={{ mt: "auto", alignSelf: "flex-start" }}>
        {ctaLabel}
      </Button>
    </Box>
  );
}
