import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { processSteps } from "@/containers/events/copy";

/**
 * "What happens after you send this" — the first three planning steps as a
 * numbered list beside the RFP form, so the organiser knows the reply is a
 * proposal and a person, not an auto-acknowledgement. No timeline is promised
 * beyond what the approved chrome copy already hedges.
 */
export function RfpNextSteps() {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Text variant="overline" component="p" color="text.secondary">
        What happens next
      </Text>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3 }}>
        {processSteps.slice(0, 3).map((step) => (
          <Box key={step.step} component="li" sx={{ display: "flex", gap: 3 }}>
            <Text
              component="span"
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                color: "primary.main",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {step.step}
            </Text>
            <Box>
              <Text variant="body2" sx={{ fontWeight: 600 }}>
                {step.title}
              </Text>
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {step.outcome}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
