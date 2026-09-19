import type { SpaceId } from "@/containers/spaces/anchors";
import type { MatcherOccasion } from "@/containers/spaces/copy/matcher";
import type { MatcherTime } from "@/containers/spaces/copy/matcherTimes";

export interface MatchInput {
  occasionId: string;
  timeId: string;
  guests: number;
}

export interface CapacityProfile {
  id: SpaceId;
  seated: number;
  standing: number;
}

export interface SpaceMatch {
  spaceId: SpaceId;
  /** 0–100, rounded. Zero when the party does not fit. */
  percent: number;
  fits: boolean;
  /** Short, human reasons in display order — occasion, hour, capacity. */
  reasons: string[];
}

const OCCASION_WEIGHT = 3;
const TIME_WEIGHT = 2;
/** Seated comfortably = 2, standing only = 1. */
const CAPACITY_MAX = 2;
const MAX_SCORE = 3 * OCCASION_WEIGHT + 3 * TIME_WEIGHT + CAPACITY_MAX;

function capacityPoints(guests: number, space: CapacityProfile): number {
  if (guests <= space.seated) {
    return CAPACITY_MAX;
  }
  return guests <= space.standing ? 1 : 0;
}

function capacityReason(guests: number, space: CapacityProfile): string {
  const party = `${guests} guest${guests === 1 ? "" : "s"}`;
  if (guests <= space.seated) {
    return `Seats ${party} comfortably.`;
  }
  if (guests <= space.standing) {
    return `Fits ${party} as a standing reception.`;
  }
  return `Too small for ${party} — up to ${space.standing} standing.`;
}

function scoreSpace(
  space: CapacityProfile,
  guests: number,
  occasion: MatcherOccasion | undefined,
  time: MatcherTime | undefined,
): SpaceMatch {
  const occasionFit = occasion?.fit[space.id];
  const fits = guests <= space.standing;
  const score =
    (occasionFit?.score ?? 0) * OCCASION_WEIGHT +
    (time?.fit[space.id] ?? 0) * TIME_WEIGHT +
    capacityPoints(guests, space);
  const reasons = [occasionFit?.reason, capacityReason(guests, space)].filter(
    (reason): reason is string => Boolean(reason),
  );

  return {
    spaceId: space.id,
    percent: fits ? Math.round((score / MAX_SCORE) * 100) : 0,
    fits,
    reasons,
  };
}

/**
 * Ranks the spaces for a visitor's occasion, hour and party size.
 *
 * A pure function, unit-tested in `spaceMatcher.test.ts` — the same split the
 * pool page's `poolQuote.ts` makes. `useSpaceMatcher` holds the state and
 * calls this; the matcher molecules stay presentational.
 *
 * Spaces the party cannot fit sink to the bottom with a 0% match and a reason
 * that says so; ties keep the page order, so the result is stable.
 */
export function rankSpaces(
  input: MatchInput,
  options: {
    spaces: CapacityProfile[];
    occasions: MatcherOccasion[];
    times: MatcherTime[];
  },
): SpaceMatch[] {
  const guests = Math.max(1, Math.floor(input.guests));
  const occasion = options.occasions.find((item) => item.id === input.occasionId);
  const time = options.times.find((item) => item.id === input.timeId);

  return options.spaces
    .map((space, order) => ({ order, match: scoreSpace(space, guests, occasion, time) }))
    .sort(
      (a, b) =>
        Number(b.match.fits) - Number(a.match.fits) ||
        b.match.percent - a.match.percent ||
        a.order - b.order,
    )
    .map(({ match }) => match);
}
