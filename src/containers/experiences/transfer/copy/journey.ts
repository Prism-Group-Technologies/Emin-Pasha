/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { AssuranceItem } from "@/containers/wellness/copy/assurance";
import type { JourneyStep } from "@/containers/wellness/copy/journey";

/**
 * The credibility strip and the four-step "how it works" row. Typed against
 * the wellness shapes because the page reuses `AssuranceBar` and
 * `JourneyStepCard` as-is. Flight monitoring, courteous chauffeurs, luggage
 * help and safety are approved §8 claims; the 60-minute waiting allowance
 * and the 24/7 line are invented (TODO(EMIN-Q09)).
 */
export const transferAssurance: AssuranceItem[] = [
  { icon: "flight", label: "Flight tracked", detail: "Early or late, we adjust" },
  { icon: "schedule", label: "60 min free wait", detail: "Counted from landing" },
  { icon: "payments", label: "Fixed fare", detail: "Tolls and parking included" },
  { icon: "verified", label: "Hotel chauffeurs", detail: "Vetted, never subcontracted" },
  { icon: "support-agent", label: "24/7 line", detail: "A person, day or night" },
  { icon: "king-bed", label: "Free on 8+ nights", detail: "Long stays ride on us" },
];

export const transferSteps: JourneyStep[] = [
  {
    step: 1,
    icon: "chat",
    title: "Book in two minutes",
    description:
      "Send your flight number, your car and who's travelling — online or on WhatsApp. Nothing to pay yet.",
  },
  {
    step: 2,
    icon: "flight",
    title: "We watch your flight",
    description:
      "Dispatch tracks the aircraft from take-off, so an early landing or a two-hour delay changes nothing for you.",
  },
  {
    step: 3,
    icon: "luggage",
    title: "Met with your name",
    description:
      "Your chauffeur waits just outside arrivals with a name board, takes the trolley and walks you to the car.",
  },
  {
    step: 4,
    icon: "king-bed",
    title: "Straight to your room",
    description:
      "Cold towel and water on board, and we message the front desk as you leave the airport so your key is ready.",
  },
];
