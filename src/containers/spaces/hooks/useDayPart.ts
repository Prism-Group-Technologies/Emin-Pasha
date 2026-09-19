"use client";

import { useState } from "react";

import { type DayPart, dayMoments } from "@/containers/spaces/copy/day";

/** The "a day in the lounges" toggle: which half of the day is showing. */
export function useDayPart(initial: DayPart = "day") {
  const [part, setPart] = useState<DayPart>(initial);
  const visible = dayMoments.filter((moment) => moment.part === part);
  return { part, setPart, moments: visible };
}
