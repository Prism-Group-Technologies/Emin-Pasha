import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

/**
 * "What happens next" beside the enquiry form — numbered steps joined by a
 * vertical hairline, so a visitor can see the form reaches a person and
 * commits them to nothing. Presentational; the steps arrive as props.
 */
export function NextSteps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <Box>
      <Text variant="overline" component="p" color="text.secondary" sx={{ mb: 3 }}>
        {title}
      </Text>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 4 }}>
        {steps.map((step, index) => (
          <Box
            component="li"
            key={step}
            sx={{
              position: "relative",
              display: "flex",
              gap: 3,
              alignItems: "flex-start",
              "&:not(:last-of-type)::after": {
                content: '""',
                position: "absolute",
                left: 15,
                top: 34,
                bottom: -14,
                width: "1px",
                bgcolor: "divider",
              },
            }}
          >
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                width: 32,
                height: 32,
                display: "grid",
                placeItems: "center",
                borderRadius: `${radiusTokens.pill}px`,
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
                fontFamily: "var(--font-cartographic)",
                fontSize: "0.8125rem",
              }}
            >
              {index + 1}
            </Box>
            <Text variant="body2" color="text.secondary" sx={{ pt: 0.5, textWrap: "pretty" }}>
              {step}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
