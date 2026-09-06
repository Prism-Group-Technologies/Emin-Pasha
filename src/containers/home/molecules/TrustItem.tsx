import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { colorTokens } from "@/theme/tokens";

export interface TrustItemProps {
  value: string;
  label: string;
  /** On the dark band the figure is gold; on a light surface it is ink. */
  onDark?: boolean;
}

const { gold, ink } = colorTokens;

/**
 * One fact in the credibility strip: a figure in the display face over its
 * label in the cartographic face.
 *
 * Gold is used for the figure **only** when `onDark` is set. On the light
 * surface gold sits at 2.33:1 and fails even the 3:1 large-text minimum, so
 * there the figure stays `text.primary` and gold does the dividing instead.
 */
export function TrustItem({ value, label, onDark = false }: TrustItemProps) {
  return (
    <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.5625rem", md: "1.9375rem" },
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: onDark ? gold[300] : "text.primary",
          textWrap: "balance",
        }}
      >
        {value}
      </Text>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-cartographic)",
          fontSize: "0.6875rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.4,
          color: onDark ? ink.contrastMuted : "text.secondary",
          textWrap: "pretty",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}
