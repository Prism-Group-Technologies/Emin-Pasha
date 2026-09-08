import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";

export interface QuoteCardProps {
  heading: string;
  quote: string;
  author: string;
  location?: string;
  stayDate?: string;
  /** The lead quote gets the display face and the raised surface. */
  featured?: boolean;
}

/**
 * One guest review, attributed exactly as `content/testimonials.ts` stores
 * it — nothing paraphrased. The oversized gold quotation glyph gives every
 * card the same top anchor whatever the quote length, and the attribution is
 * pinned to the bottom edge so the baselines line up across the row.
 *
 * No star rating and no review count: an `AggregateRating` may not be
 * published until verified reviews exist, and a decorative star row asserts
 * exactly that claim while dodging the markup.
 */
export function QuoteCard({
  heading,
  quote,
  author,
  location,
  stayDate,
  featured = false,
}: QuoteCardProps) {
  return (
    <Box
      component="figure"
      sx={[cardSurface(), { m: 0, ...(featured && { bgcolor: "background.paper" }) }]}
    >
      <Text
        aria-hidden
        component="span"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: featured ? "5rem" : "3.5rem",
          lineHeight: 0.6,
          color: "primary.main",
          mb: 4,
        }}
      >
        &ldquo;
      </Text>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 3 }}
      >
        {heading}
      </Text>
      <Text
        component="blockquote"
        variant={featured ? "h4" : "body1"}
        sx={{
          m: 0,
          mb: 5,
          textWrap: "pretty",
          ...(featured && { fontFamily: "var(--font-display)" }),
        }}
      >
        {quote}
      </Text>
      <Box
        component="figcaption"
        sx={{ mt: "auto", pt: 4, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Text variant="overline" component="p">
          {author}
        </Text>
        <Text variant="body2" color="text.secondary">
          {[location, stayDate].filter(Boolean).join(" · ")}
        </Text>
      </Box>
    </Box>
  );
}
