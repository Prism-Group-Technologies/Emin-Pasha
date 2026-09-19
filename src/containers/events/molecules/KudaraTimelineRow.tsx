import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { KudaraRunStep } from "@/containers/events/copy";

/**
 * One row of the sample run of show: the time on a gold rail, the moment and
 * one line on what happens. Purely illustrative — the copy says it is an
 * example to react to, not a fixed schedule.
 */
export function KudaraTimelineRow({ step, last }: { step: KudaraRunStep; last: boolean }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "64px 1fr", sm: "88px 1fr" },
        gap: { xs: 3, sm: 4 },
      }}
    >
      <Text
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "primary.main", pt: 0.25 }}
      >
        {step.time}
      </Text>
      <Box
        sx={{
          pb: last ? 0 : 4,
          pl: 4,
          borderLeft: "2px solid",
          borderColor: "divider",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "-7px",
            top: "6px",
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "primary.main",
          },
        }}
      >
        <Text variant="body1" sx={{ fontWeight: 600 }}>
          {step.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {step.detail}
        </Text>
      </Box>
    </Box>
  );
}
