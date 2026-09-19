import { Text } from "@/components/atoms/Text";

/** A gold pill pinned to the bottom-left of a card's photo — "Most booked", "Date-night pick".
 * Bottom rather than top so it never sits on a placeholder's label strip. */
export function CardBadge({ label }: { label: string }) {
  return (
    <Text
      component="span"
      variant="overline"
      sx={{
        position: "absolute",
        bottom: 12,
        left: 12,
        px: 2,
        py: 0.5,
        borderRadius: 999,
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      {label}
    </Text>
  );
}
