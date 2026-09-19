/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface RhythmEntry {
  day: string;
  title: string;
  where: string;
  time: string;
  icon: IconName;
  /** Links to an approved offer instead of restating its terms. */
  href?: string;
  highlight?: boolean;
}

/**
 * The standing weekly programme. Friday Band Night is an **approved** offer —
 * it links to `/offers` and carries no price or time here, so this page can
 * never disagree with that one. The Sunset Happy Hour is left off entirely:
 * its days are unresolved (TODO(EMIN-Q07)), so it cannot be pinned to one.
 */
export const weeklyRhythm: RhythmEntry[] = [
  {
    day: "Mon",
    title: "Quiet Monday",
    where: "Mehmed Pasha Lounge",
    time: "All day",
    icon: "auto-stories",
  },
  {
    day: "Tue",
    title: "Acoustic by the fire",
    where: "Acropole Lounge",
    time: "19:30",
    icon: "music",
  },
  {
    day: "Wed",
    title: "Wine & whisky evening",
    where: "Acropole Lounge",
    time: "18:30",
    icon: "wine",
  },
  {
    day: "Thu",
    title: "Garden cinema",
    where: "Equatorial Gardens",
    time: "19:00",
    icon: "garden",
  },
  {
    day: "Fri",
    title: "Friday Band Night",
    where: "The gardens after dark",
    time: "See offer",
    icon: "celebration",
    href: "/offers",
    highlight: true,
  },
  {
    day: "Sat",
    title: "Garden brunch",
    where: "Equatorial Gardens",
    time: "11:00",
    icon: "restaurant",
  },
  {
    day: "Sun",
    title: "Tea & jazz",
    where: "Mehmed Pasha Lounge",
    time: "15:00",
    icon: "coffee",
  },
];
