import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";

export interface RoomIntroProps {
  /** The category's descriptive prose — see `copy/rooms.ts`. */
  description?: string;
  /** The verified one-line strapline from `copy/rooms.ts`. */
  tagline?: string;
}

/**
 * The room's descriptive opener. The prose is the §4 `[DRAFT — VERIFY]` text,
 * transcribed in `copy/rooms.ts` and rendered here pending a DECISIONS.md
 * sign-off (TODO(EMIN-Q15)); the strapline above it only reframes verified
 * fields. If the copy layer ever drops a description this renders the
 * strapline alone rather than an empty block.
 */
export function RoomIntro({ description, tagline }: RoomIntroProps) {
  if (!description && !tagline) {
    return null;
  }

  return (
    <Stack spacing={3}>
      {tagline && (
        <Text
          variant="h3"
          component="p"
          sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
        >
          {tagline}
        </Text>
      )}
      {description && (
        <Text variant="subtitle1" component="p" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
