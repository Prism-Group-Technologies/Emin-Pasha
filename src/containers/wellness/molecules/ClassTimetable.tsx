import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { ClassSlot } from "@/containers/wellness/copy";
import { radiusTokens } from "@/theme/tokens";

const HEADINGS = ["Day", "Time", "Class", "Level"] as const;

const cell = {
  py: 3,
  px: { xs: 4, md: 5 },
  borderBottom: "1px solid",
  borderColor: "divider",
  textAlign: "left",
} as const;

/**
 * A sample weekly class timetable as a real `<table>` with scoped headers, in
 * a rounded clipped shell with its own horizontal scroll so the page body
 * never scrolls sideways — the same construction as
 * `accommodation/organisms/ComparisonTable`. The caption flags it as a
 * sample.
 */
export function ClassTimetable({ slots }: { slots: ClassSlot[] }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Box component="table" sx={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
          <Box component="caption" sx={{ textAlign: "left", px: { xs: 4, md: 5 }, pt: 4 }}>
            <Text component="span" variant="body2" color="text.secondary">
              A sample week. The live timetable is confirmed at the fitness desk and on the day.
            </Text>
          </Box>
          <Box component="thead">
            <Box component="tr">
              {HEADINGS.map((heading) => (
                <Box
                  key={heading}
                  component="th"
                  scope="col"
                  sx={{
                    textAlign: "left",
                    px: { xs: 4, md: 5 },
                    py: 3,
                    borderBottom: "2px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <Text variant="overline" component="span">
                    {heading}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody" sx={{ "& tr:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
            {slots.map((slot) => (
              <Box component="tr" key={`${slot.day}-${slot.time}-${slot.name}`}>
                <Box component="th" scope="row" sx={{ ...cell, fontWeight: 600 }}>
                  <Text variant="body2" component="span">
                    {slot.day}
                  </Text>
                </Box>
                <Box component="td" sx={cell}>
                  <Text
                    variant="body2"
                    component="span"
                    sx={{ fontFamily: "var(--font-cartographic)" }}
                  >
                    {slot.time}
                  </Text>
                </Box>
                <Box component="td" sx={cell}>
                  <Text variant="body2" component="span">
                    {slot.name}
                  </Text>
                </Box>
                <Box component="td" sx={cell}>
                  <Text variant="body2" component="span" color="text.secondary">
                    {slot.level}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
