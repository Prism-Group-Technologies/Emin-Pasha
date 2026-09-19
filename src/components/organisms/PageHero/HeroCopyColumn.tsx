import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

export interface HeroCopyColumnProps {
  eyebrow: string;
  headline: string;
  lede?: string;
  centred: boolean;
}

/**
 * The hero's type block: eyebrow in the cartographic face, the `h1` in the
 * display face, then an optional lede. Split out of `PageHero` so that
 * organism stays inside the repo's complexity ceiling.
 */
export function HeroCopyColumn({ eyebrow, headline, lede, centred }: HeroCopyColumnProps) {
  return (
    <Box
      sx={{
        maxWidth: centred ? "52ch" : "62ch",
        display: "grid",
        gap: 2,
        ...(centred && { mx: "auto", textAlign: "center" }),
      }}
    >
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", letterSpacing: "0.16em", opacity: 0.9 }}
      >
        {eyebrow}
      </Text>
      <Text
        component="h1"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: { xs: "2.5rem", md: "4rem" },
          lineHeight: 1.03,
          letterSpacing: "-0.015em",
          textWrap: "balance",
        }}
      >
        {headline}
      </Text>
      {lede && (
        <Text variant="subtitle1" sx={{ opacity: 0.92, textWrap: "pretty" }}>
          {lede}
        </Text>
      )}
    </Box>
  );
}
