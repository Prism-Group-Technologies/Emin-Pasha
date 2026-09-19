"use client";

import { useMemo, useState } from "react";

import { matcherOccasions } from "@/containers/spaces/copy/matcher";
import { matcherTimes } from "@/containers/spaces/copy/matcherTimes";
import { spaceProfiles } from "@/containers/spaces/copy/profiles";
import { useSeedEnquiry } from "@/containers/spaces/hooks/useSeedEnquiry";
import { matchSeed } from "@/containers/spaces/seeds";
import { type SpaceMatch, rankSpaces } from "@/containers/spaces/spaceMatcher";

const GUESTS_MIN = 1;
const GUESTS_MAX = 250;

/**
 * All state for the "find your space" matcher: the occasion, the hour, the
 * party size, the derived ranking (from the tested `rankSpaces`), and the
 * hand-off that seeds the reservation form with a chosen match. The matcher
 * molecules stay presentational.
 */
export function useSpaceMatcher() {
  const [occasionId, setOccasionId] = useState(matcherOccasions[0]?.id ?? "");
  const [timeId, setTimeId] = useState("evening");
  const [guests, setGuestsRaw] = useState(2);
  const seed = useSeedEnquiry();

  const occasion = matcherOccasions.find((item) => item.id === occasionId);
  const ranked = useMemo(
    () =>
      rankSpaces(
        { occasionId, timeId, guests },
        { spaces: spaceProfiles, occasions: matcherOccasions, times: matcherTimes },
      ),
    [occasionId, timeId, guests],
  );

  return {
    occasions: matcherOccasions,
    times: matcherTimes,
    occasionId,
    setOccasionId,
    timeId,
    setTimeId,
    guests,
    setGuests: (value: number) => setGuestsRaw(Math.min(Math.max(value, GUESTS_MIN), GUESTS_MAX)),
    guestsMax: GUESTS_MAX,
    occasion,
    ranked,
    reserve: (match: SpaceMatch) => seed(matchSeed(match, occasion, guests, timeId)),
  };
}

export type SpaceMatcherState = ReturnType<typeof useSpaceMatcher>;
