/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface JourneyStep {
  /** 1-based, rendered as the step number. */
  step: number;
  title: string;
  description: string;
  icon: IconName;
}

/**
 * How a treatment visit runs. Nothing here asserts a fact the source does not
 * support — it is a description of ordinary spa practice (consultation, early
 * arrival, aftercare) written so a first-time guest knows what to expect. The
 * 15-minutes-early line is guidance the spa etiquette policy (§14) already
 * makes.
 */
export const wellnessJourney: JourneyStep[] = [
  {
    step: 1,
    title: "Tell us what you need",
    description:
      "Message or call the wellness desk. We match you to a therapist or trainer and hold the time — no deposit at this step.",
    icon: "whatsapp",
  },
  {
    step: 2,
    title: "Arrive fifteen minutes early",
    description:
      "Time to change, fill in a short health form and settle in the relaxation lounge with tea before you start.",
    icon: "event",
  },
  {
    step: 3,
    title: "A two-minute consultation",
    description:
      "Your therapist checks pressure, focus areas, injuries and anything you would rather they avoided. The treatment is built around that.",
    icon: "spa",
  },
  {
    step: 4,
    title: "The treatment itself",
    description:
      "Phones off, lights low. Speak up any time about temperature, pressure or music — it is your hour.",
    icon: "check-circle",
  },
  {
    step: 5,
    title: "Rest, then rejoin the day",
    description:
      "Water and tea in the lounge for as long as you like. Add the pool and gardens on your way out.",
    icon: "pool",
  },
];
