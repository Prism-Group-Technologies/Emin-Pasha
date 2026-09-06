import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * A sentence lifted from the surrounding approved copy and set large.
 *
 * `aria-hidden`, deliberately: the sentence already appears in the body text
 * it was pulled from, so announcing it twice makes the page read as if it
 * stutters. This is a typographic device, not new content — no quote here is
 * written for the purpose.
 */
export function PullQuote({ children }: { children: string }) {
  return (
    <Box
      aria-hidden
      sx={{ my: 7, pl: { xs: 4, md: 6 }, borderLeft: "2px solid", borderColor: "primary.main" }}
    >
      <Text
        variant="h3"
        component="p"
        sx={{ fontFamily: "var(--font-display)", maxWidth: "30ch", textWrap: "balance" }}
      >
        {children}
      </Text>
    </Box>
  );
}
