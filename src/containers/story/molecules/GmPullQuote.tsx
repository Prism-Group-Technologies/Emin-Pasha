import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { story } from "@/content/story";
import { radiusTokens } from "@/theme/tokens";

/**
 * `story.generalManagerMessage` verbatim as a pull-quote — an oversized
 * opening mark that bleeds off the card's top edge, the message set tight in
 * the display face on a warm gold wash with a gold spine (theme-aware: a tint
 * on the light ground, a glow on the dark), closing on a bare gold rule. The
 * only attribution is the portrait rail's by-line (§12.4), so no line is
 * repeated here. Used by `GmQuotePanel` in its `hub` tone.
 */
export function GmPullQuote() {
  return (
    <Box
      component="figure"
      sx={{
        position: "relative",
        m: 0,
        px: { xs: 3.5, md: 5.5 },
        pt: { xs: 5, md: 6.5 },
        pb: { xs: 3.5, md: 5 },
        bgcolor: "rgba(196,168,50,0.09)",
        border: "1px solid",
        borderColor: "divider",
        borderLeftWidth: "3px",
        borderLeftColor: "primary.main",
        borderRadius: `${radiusTokens.md}px`,
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{
          position: "absolute",
          top: { xs: -14, md: -26 },
          left: { xs: 10, md: 22 },
          fontFamily: "var(--font-display)",
          fontSize: { xs: "4.5rem", md: "6.5rem" },
          lineHeight: 1,
          color: "primary.main",
        }}
      >
        &ldquo;
      </Box>
      <Text
        component="blockquote"
        sx={{
          m: 0,
          maxWidth: "42ch",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: { xs: "1.1875rem", md: "1.4375rem" },
          lineHeight: 1.6,
          textWrap: "pretty",
          color: "text.primary",
        }}
      >
        {story.generalManagerMessage}
      </Text>
      <Box
        aria-hidden
        sx={{ width: 48, height: "2px", bgcolor: "primary.main", mt: { xs: 3, md: 4 } }}
      />
    </Box>
  );
}
