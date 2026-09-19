import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { enquiryCopy } from "@/containers/story/copy/enquiry";
import { radiusTokens } from "@/theme/tokens";

/**
 * "What happens next" beside the enquiry form — three plain steps with a
 * cartographic-face number, so a visitor knows the form reaches a person and
 * commits them to nothing. The same shape as
 * `containers/wellness/molecules/EnquiryNextSteps`; copy lives in
 * `copy/enquiry.ts`.
 */
export function StoryNextSteps() {
  return (
    <Box>
      <Text variant="overline" component="p" color="text.secondary" sx={{ mb: 3 }}>
        What happens next
      </Text>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3 }}>
        {enquiryCopy.nextSteps.map((step, index) => (
          <Box component="li" key={step} sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                width: 30,
                height: 30,
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
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {step}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
