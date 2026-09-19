import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { JourneyStep } from "@/containers/wellness/copy";

/**
 * One step of the visit journey: an oversized step number in the display
 * face, a tinted icon badge, a title and a line of copy. Built on
 * `cardSurface()` so a row of five keeps a shared baseline.
 */
export function JourneyStepCard({ step }: { step: JourneyStep }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          component="span"
          aria-hidden
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            lineHeight: 1,
            color: "primary.main",
          }}
        >
          {String(step.step).padStart(2, "0")}
        </Text>
        <IconBadge name={step.icon} size={44} />
      </Box>
      <Text variant="h5" component="h3">
        {step.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {step.description}
      </Text>
    </Box>
  );
}
