import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";

export interface TestimonialCardProps {
  heading: string;
  quote: string;
  author: string;
  location?: string;
  stayDate?: string;
  /** The homepage lead quote gets the display face and a filled surface. */
  featured?: boolean;
}

/**
 * One review, attributed exactly as the content layer stores it.
 *
 * The oversized gold quotation glyph is doing real work rather than
 * decoration: these three quotes are 8, 24 and 30 words long, so without a
 * fixed element at the top of each card the row had three different silhouettes
 * and a lot of empty space under the short one. The glyph gives every card the
 * same anchor, and the attribution block is pinned to the bottom edge so the
 * baselines line up whatever the quote length.
 *
 * **No stars and no rating count.** An `AggregateRating` may not be published
 * until verified reviews exist, and a decorative five-star row asserts exactly
 * that claim while dodging the markup.
 */
export function TestimonialCard({
  heading,
  quote,
  author,
  location,
  stayDate,
  featured = false,
}: TestimonialCardProps) {
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
          fontSize: "3.5rem",
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
