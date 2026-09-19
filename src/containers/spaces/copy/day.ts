/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export type DayPart = "day" | "evening";

export interface DayMoment {
  id: string;
  part: DayPart;
  time: string;
  title: string;
  where: string;
  detail: string;
  icon: IconName;
}

/** The estate hour by hour — the "a day in the lounges" timeline. */
export const dayMoments: DayMoment[] = [
  {
    id: "first-coffee",
    part: "day",
    time: "07:00",
    title: "First coffee, garden air",
    where: "Mehmed Pasha Lounge",
    detail: "Single-origin Ugandan coffee on the terrace before the city wakes.",
    icon: "coffee",
  },
  {
    id: "work-session",
    part: "day",
    time: "09:30",
    title: "A morning of deep work",
    where: "Mehmed Pasha Lounge",
    detail: "No music, strong Wi-Fi and a refill without asking.",
    icon: "laptop",
  },
  {
    id: "working-lunch",
    part: "day",
    time: "12:30",
    title: "The discreet working lunch",
    where: "Acropole Lounge alcoves",
    detail: "A light lunch served in a secluded alcove, away from the dining room.",
    icon: "restaurant",
  },
  {
    id: "afternoon-tea",
    part: "day",
    time: "15:30",
    title: "Afternoon tea",
    where: "Mehmed Pasha Lounge",
    detail: "Tiered sandwiches, warm scones and Ugandan teas, looking onto the flora.",
    icon: "spa",
  },
  {
    id: "golden-hour",
    part: "evening",
    time: "17:30",
    title: "Golden hour in the gardens",
    where: "Equatorial Gardens",
    detail: "The best light in the city for photographs — and for the first drink.",
    icon: "camera",
  },
  {
    id: "sundowners",
    part: "evening",
    time: "18:30",
    title: "Sundowners",
    where: "Equatorial Gardens",
    detail: "House cocktails on the lawn as the equatorial sun drops fast.",
    icon: "cocktail",
  },
  {
    id: "fireside",
    part: "evening",
    time: "20:00",
    title: "Fireside conversation",
    where: "Acropole Lounge",
    detail: "Armchairs by the fire, a glass of fine wine, the fountain in view.",
    icon: "fireplace",
  },
  {
    id: "nightcap",
    part: "evening",
    time: "22:00",
    title: "The last nightcap",
    where: "Acropole Lounge bar",
    detail: "A whisky from the shelf, stirred drinks and quiet music until late.",
    icon: "wine",
  },
];
