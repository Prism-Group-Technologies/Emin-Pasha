/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * An illustrative shape for a full-day board session. Deliberately not a
 * schedule: the section copy says it is an example to react to, and every
 * entry describes something the hotel does rather than something the board
 * must do. Reuses `KudaraRunStep` and `KudaraTimelineRow` — the run-of-show
 * row is venue-agnostic and there is nothing to gain from a second copy.
 */
import type { KudaraRunStep } from "./kudaraProof";

export const boardroomDay: KudaraRunStep[] = [
  {
    time: "08:00",
    title: "The room is already set",
    detail:
      "Table laid, pads and water at every place, panel on and tested, climate brought to temperature before the first car arrives.",
  },
  {
    time: "08:45",
    title: "Arrival coffee",
    detail:
      "Served in the room or on the veranda, whichever suits. Secure parking means nobody arrives late and flustered.",
  },
  {
    time: "09:00",
    title: "Session opens",
    detail:
      "Door closed. Remote directors admitted from the waiting room by the chair, not by whoever is nearest the laptop.",
  },
  {
    time: "11:00",
    title: "Break, without losing the room",
    detail:
      "Refreshments come to you and papers stay on the table — the room is yours for the day, so nothing is cleared away.",
  },
  {
    time: "13:00",
    title: "Lunch in a restaurant",
    detail:
      "A short walk to one of three kitchens on site. No cars, no cold buffet holding in a corridor, and the room untouched when you return.",
  },
  {
    time: "14:00",
    title: "Afternoon session",
    detail:
      "Curtains to taste, display back to where you left it, same seats. The afternoon starts where the morning stopped.",
  },
  {
    time: "17:00",
    title: "Close — or carry on",
    detail:
      "Papers collected discreetly. A private dinner in a restaurant, drinks in a lounge, or a room upstairs for anyone flying out tomorrow.",
  },
];

export const boardroomDayNote =
  "An illustrative day, not a fixed timetable — tell the events team the shape you need and they will build the run of day around it.";
