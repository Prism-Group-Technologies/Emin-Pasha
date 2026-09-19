/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import type { SpaceId } from "@/containers/spaces/anchors";

import type { Fit } from "./matcher";

/** The four parts of the day, and how well each space suits them (0–3). */
export interface MatcherTime {
  id: string;
  label: string;
  hint: string;
  icon: IconName;
  fit: Record<SpaceId, Fit>;
}

export const matcherTimes: MatcherTime[] = [
  {
    id: "morning",
    label: "Morning",
    hint: "07:00 – 12:00",
    icon: "coffee",
    fit: { "acropole-lounge": 1, "mehmed-pasha-lounge": 3, "equatorial-gardens": 2 },
  },
  {
    id: "afternoon",
    label: "Afternoon",
    hint: "12:00 – 17:00",
    icon: "light-mode",
    fit: { "acropole-lounge": 2, "mehmed-pasha-lounge": 3, "equatorial-gardens": 3 },
  },
  {
    id: "evening",
    label: "Evening",
    hint: "17:00 – 21:00",
    icon: "bedtime",
    fit: { "acropole-lounge": 3, "mehmed-pasha-lounge": 2, "equatorial-gardens": 3 },
  },
  {
    id: "late",
    label: "Late",
    hint: "21:00 – late",
    icon: "dark-mode",
    fit: { "acropole-lounge": 3, "mehmed-pasha-lounge": 1, "equatorial-gardens": 1 },
  },
];
