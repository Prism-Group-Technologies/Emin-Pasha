import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface LegalCalloutProps {
  tone: "info" | "warning";
  title: string;
  text: string;
}

/**
 * A highlighted note inside a document section. A left rule in the brand
 * accent plus an icon carries the emphasis, so the tint behind it can stay a
 * theme-aware `action.hover` that reads in both colour schemes.
 */
export function LegalCallout({ tone, title, text }: LegalCalloutProps) {
  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        gap: 3,
        p: { xs: 4, md: 5 },
        bgcolor: "action.hover",
        borderLeft: "3px solid",
        borderColor: tone === "warning" ? "warning.main" : "primary.main",
        borderRadius: `0 ${radiusTokens.md}px ${radiusTokens.md}px 0`,
      }}
    >
      <Icon
        name={tone === "warning" ? "warning" : "info"}
        aria-hidden
        sx={{
          color: tone === "warning" ? "warning.main" : "primary.main",
          flexShrink: 0,
          mt: 0.25,
        }}
      />
      <Box sx={{ display: "grid", gap: 1 }}>
        <Text variant="subtitle2" component="p">
          {title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}
