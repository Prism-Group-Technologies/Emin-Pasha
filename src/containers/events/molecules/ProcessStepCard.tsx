import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { ProcessStep } from "@/containers/events/copy";

/**
 * One step of the planning process: a numbered marker over a tinted icon
 * badge, the title, two sentences, and the one outcome the organiser gets —
 * with the outcome pinned to the bottom edge so the four cards sit level.
 */
export function ProcessStepCard({ step }: { step: ProcessStep }) {
  return (
    <Box component="article" sx={cardSurface()}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconBadge name={step.icon} size={44} />
        <Text
          variant="overline"
          component="span"
          sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
        >
          Step {step.step}
        </Text>
      </Box>

      <Text variant="h4" component="h3" sx={{ mb: 2 }}>
        {step.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ mb: 4, textWrap: "pretty" }}>
        {step.body}
      </Text>

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          gap: 2,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Icon
          name="check-circle"
          aria-hidden
          fontSize="small"
          sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
        />
        <Text variant="body2" sx={{ fontWeight: 600, textWrap: "pretty" }}>
          {step.outcome}
        </Text>
      </Box>
    </Box>
  );
}
