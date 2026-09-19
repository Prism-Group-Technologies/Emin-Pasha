import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

/**
 * The offer's time facts as icon lines: the recurring window ("Sundays,
 * 11:00am – 3:00pm") and the soft-urgency validity ("Book by 30 Nov 2026").
 * Either can be absent; renders nothing when both are.
 */
export function OfferValidity({ schedule, bookBy }: { schedule?: string; bookBy?: string }) {
  const lines = [
    { icon: "schedule" as const, text: schedule },
    { icon: "event" as const, text: bookBy },
  ].filter((line): line is { icon: "schedule" | "event"; text: string } => Boolean(line.text));

  if (lines.length === 0) {
    return null;
  }
  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {lines.map((line) => (
        <Box key={line.icon} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name={line.icon} aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
          <Text variant="body2" component="p" color="text.secondary">
            {line.text}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
