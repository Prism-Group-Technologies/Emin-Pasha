import { Box } from "@/components/atoms/Box";
import { BrandMark } from "@/components/atoms/BrandMark";
import { Rule } from "@/components/atoms/Rule";
import { Text } from "@/components/atoms/Text";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * The footer's lock-up: the portrait mark, the wordmark as live text, a short
 * gold rule and one line of voice.
 *
 * Deliberately *not* the header's `Logo`. That component is a client
 * boundary (it hands `NextLink` to an MUI element) and animates between an
 * expanded and a condensed state driven by scroll — none of which a static
 * footer mark needs. Reusing it would have pulled a client component and its
 * lock-up hook into a subtree that is otherwise entirely server-rendered.
 *
 * The mark is `alt=""` inside `BrandMark`, and the wordmark beside it is real
 * text, so the hotel's name is announced exactly once.
 */
export function FooterBrand({ brand }: { brand: FooterData["brand"] }) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <BrandMark height={{ xs: 44, md: 52 }} sizes="52px" />
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Text
            component="span"
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: { xs: "1.25rem", md: "1.5625rem" },
              lineHeight: 1.1,
              letterSpacing: "0.02em",
            }}
          >
            {brand.shortName}
          </Text>
          <Text
            component="span"
            variant="overline"
            sx={{ fontSize: "0.625rem", lineHeight: 1.4, color: "text.secondary" }}
          >
            {brand.suffix}
          </Text>
        </Box>
      </Box>
      <Box sx={{ mt: 5, mb: 4, width: 48 }}>
        <Rule orientation="horizontal" />
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ maxWidth: "34ch" }}>
        {brand.statement}
      </Text>
    </Box>
  );
}
