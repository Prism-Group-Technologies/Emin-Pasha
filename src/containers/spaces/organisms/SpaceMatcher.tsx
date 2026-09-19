"use client";

import { Box } from "@/components/atoms/Box";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { useSpaceMatcher } from "@/containers/spaces/hooks/useSpaceMatcher";
import { MatchResultPanel } from "@/containers/spaces/molecules/MatchResultPanel";
import { MatcherOccasionPicker } from "@/containers/spaces/molecules/MatcherOccasionPicker";
import { MatcherStep } from "@/containers/spaces/molecules/MatcherStep";
import { MatcherTimePicker } from "@/containers/spaces/molecules/MatcherTimePicker";
import { radiusTokens } from "@/theme/tokens";

/**
 * The "find your space" matcher: three questions on the left, a live,
 * sticky recommendation on the right (stacked below on a phone).
 *
 * 'use client' justification: local selection state and the hand-off into
 * the reservation form. All of it lives in `useSpaceMatcher`; the ranking
 * rule lives in the tested `spaceMatcher.ts`. Space names arrive as a plain
 * prop from the server section, so the content layer stays off the client.
 */
export function SpaceMatcher({ names }: { names: Record<string, string> }) {
  const matcher = useSpaceMatcher();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(0, 0.9fr)" },
        gap: { xs: 6, md: 8 },
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "grid", gap: { xs: 6, md: 7 } }}>
        <MatcherStep step={1} legend="What's the occasion?">
          <MatcherOccasionPicker
            occasions={matcher.occasions}
            value={matcher.occasionId}
            onChange={matcher.setOccasionId}
          />
        </MatcherStep>
        <MatcherStep step={2} legend="When are you coming?">
          <MatcherTimePicker
            times={matcher.times}
            value={matcher.timeId}
            onChange={matcher.setTimeId}
          />
        </MatcherStep>
        <MatcherStep step={3} legend="How many guests?">
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: `${radiusTokens.md}px`,
            }}
          >
            <NumberStepper
              id="matcher-guests"
              label="Guests, including you"
              value={matcher.guests}
              onChange={matcher.setGuests}
              min={1}
              max={matcher.guestsMax}
            />
          </Box>
        </MatcherStep>
      </Box>
      <MatchResultPanel
        ranked={matcher.ranked}
        names={names}
        suggestedExperienceId={matcher.occasion?.suggestedExperienceId}
        onReserve={matcher.reserve}
      />
    </Box>
  );
}
