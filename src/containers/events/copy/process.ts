/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface ProcessStep {
  step: number;
  icon: IconName;
  title: string;
  body: string;
  /** The one thing the organiser does — or gets — at this step. */
  outcome: string;
}

/**
 * How a planning engagement runs. Nothing here asserts a timeline the hotel
 * has not committed to (§0.7 / TODO(EMIN-Q10)) — "same working day" appears
 * only where the approved chrome copy already hedges it, and the RFP success
 * copy carries the caveat in full.
 */
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: "mail",
    title: "Send the brief",
    body: "Dates, rough numbers, the shape of the day and any spaces you already have in mind. Two minutes on the form, or a message to the events desk.",
    outcome: "A named planner picks it up",
  },
  {
    step: 2,
    icon: "event",
    title: "Get a tailored proposal",
    body: "Availability, the rooms that fit, a set-up plan and an indicative cost — day-delegate, residential or bespoke — usually back the same working day.",
    outcome: "One document, one number to react to",
  },
  {
    step: 3,
    icon: "location",
    title: "Walk the space",
    body: "A site visit with your planner and, if you want them, the chef and the AV lead. We hold the date provisionally while you decide.",
    outcome: "A provisional hold on your date",
  },
  {
    step: 4,
    icon: "verified",
    title: "Confirm and hand over",
    body: "Sign, pay the deposit, and the same planner runs the event on the day — briefing the kitchen, the floor and the technicians, and handling the breakdown.",
    outcome: "One point of contact, brief to breakdown",
  },
];
