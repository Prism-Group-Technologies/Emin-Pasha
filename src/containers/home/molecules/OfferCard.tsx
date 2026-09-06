import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { formatUgx } from "@/utils/currency";

export interface OfferCardProps {
  name: string;
  description: string;
  priceUgx?: number;
  schedule?: string;
  ctaLabel: string;
  ctaHref: string;
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
  const facts = [priceUgx !== undefined ? formatUgx(priceUgx) : null, schedule].filter(Boolean);

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
