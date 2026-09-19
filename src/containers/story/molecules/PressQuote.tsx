import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { PressQuote as PressQuoteData } from "@/containers/story/copy/press";

/**
 * One placeholder press line. Every `source` is the literal word
 * "placeholder", so a card can never be mistaken for genuine coverage — the
 * same honesty convention the visitor voices use.
 */
export function PressQuote({ item }: { item: PressQuoteData }) {
  return (
    <Box component="figure" sx={{ ...cardSurface(false), m: 0 }}>
      <Text
        aria-hidden
        component="span"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "3rem",
          lineHeight: 0.6,
          color: "primary.main",
          mb: 3,
        }}
      >
        &ldquo;
      </Text>
      <Text component="blockquote" variant="body1" sx={{ m: 0, mb: 4, textWrap: "pretty" }}>
        {item.quote}
      </Text>
      <Text component="figcaption" variant="overline" sx={{ mt: "auto", color: "text.secondary" }}>
        {item.source}
      </Text>
    </Box>
  );
}
