import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { story } from "@/content/story";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

/**
 * `story.generalManagerMessage` verbatim, set as an editorial welcome
 * *letter* rather than a quotation — used on
 * `/our-story/message-from-the-general-manager`, where the framing copy
 * establishes it as the house speaking.
 *
 * A display-face drop-cap opens the first word; the body is in the reading
 * face at a generous line-height on a warm paper wash (`gold.500` at low
 * alpha — a tint on the light ground, a glow on the dark one, so it stays
 * theme-aware) with a gold spine. It closes on a bare gold rule: the only
 * attribution is the portrait rail's by-line (§12.4), so no line is
 * repeated here.
 */
export function GmWelcomeLetter() {
  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        px: { xs: 4, md: 6 },
        py: { xs: 4, md: 6 },
        bgcolor: "rgba(196,168,50,0.06)",
        border: "1px solid",
        borderColor: "divider",
        borderLeftWidth: "3px",
        borderLeftColor: "primary.main",
        borderRadius: `${radiusTokens.md}px`,
        boxShadow: shadowTokens.xs,
      }}
    >
      <Text
        component="blockquote"
        sx={{
          m: 0,
          maxWidth: "68ch",
          fontSize: { xs: "1.0625rem", md: "1.1875rem" },
          lineHeight: 1.85,
          textWrap: "pretty",
          color: "text.primary",
          "&::first-letter": {
            float: "left",
            fontFamily: "var(--font-display)",
            fontSize: { xs: "3.1rem", md: "3.9rem" },
            lineHeight: 0.82,
            fontWeight: 400,
            pr: 1.25,
            mt: "0.35rem",
            color: "primary.main",
          },
        }}
      >
        {story.generalManagerMessage}
      </Text>
      <Box
        aria-hidden
        sx={{ width: 56, height: "2px", bgcolor: "primary.main", mt: { xs: 3, md: 4 } }}
      />
    </Box>
  );
}
