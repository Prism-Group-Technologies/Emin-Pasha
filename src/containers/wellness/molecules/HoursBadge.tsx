import { Text } from "@/components/atoms/Text";

/**
 * Opening hours. Only ever passed the spa's or the gym's — the two the source
 * approves (§6). No other facility on the site gets one, because no other
 * facility has verified hours (§0.7).
 */
export function HoursBadge({ hours }: { hours?: string }) {
  if (!hours) {
    return null;
  }
  return (
    <Text variant="overline" component="p" sx={{ fontFamily: "var(--font-cartographic)" }}>
      {`§ ${hours.toUpperCase()}`}
    </Text>
  );
}
