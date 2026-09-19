/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import type { SpaceId } from "@/containers/spaces/anchors";

/** 0 = a poor fit, 3 = what the space is built for. */
export type Fit = 0 | 1 | 2 | 3;

export interface MatcherOccasion {
  id: string;
  label: string;
  icon: IconName;
  /** How well each space suits this occasion, and why — the "why" is shown. */
  fit: Record<SpaceId, { score: Fit; reason: string }>;
  /** The enquiry type this occasion seeds on the reservation form. */
  requestType: "table" | "experience" | "private-hire" | "photoshoot";
  /** A signature experience worth suggesting alongside the match. */
  suggestedExperienceId?: string;
}

const fit = (score: Fit, reason: string) => ({ score, reason });

export const matcherOccasions: MatcherOccasion[] = [
  {
    id: "after-work",
    label: "After-work drinks",
    icon: "cocktail",
    requestType: "table",
    suggestedExperienceId: "cocktail-masterclass",
    fit: {
      "acropole-lounge": fit(3, "A mixologist's bar and fireside couches for unwinding."),
      "mehmed-pasha-lounge": fit(1, "Quieter — better for a single drink than a round."),
      "equatorial-gardens": fit(2, "Sundowners on the lawn as the light goes."),
    },
  },
  {
    id: "business",
    label: "Business meeting",
    icon: "laptop",
    requestType: "table",
    suggestedExperienceId: "lounge-day-pass",
    fit: {
      "acropole-lounge": fit(3, "Secluded alcoves made for discreet discussion."),
      "mehmed-pasha-lounge": fit(2, "Calm and uncluttered for a focused one-to-one."),
      "equatorial-gardens": fit(0, "Open-air — not the place for a confidential agenda."),
    },
  },
  {
    id: "quiet-work",
    label: "Quiet work or reading",
    icon: "auto-stories",
    requestType: "experience",
    suggestedExperienceId: "lounge-day-pass",
    fit: {
      "acropole-lounge": fit(1, "An alcove works, though the bar livens up by evening."),
      "mehmed-pasha-lounge": fit(3, "Built for closing out clutter — garden views, no music."),
      "equatorial-gardens": fit(1, "Lovely air, but no desk-height seating."),
    },
  },
  {
    id: "date-night",
    label: "Date night",
    icon: "wine",
    requestType: "table",
    suggestedExperienceId: "fireside-whisky",
    fit: {
      "acropole-lounge": fit(3, "Soft lighting, a glass of fine wine, a seat by the fire."),
      "mehmed-pasha-lounge": fit(2, "A candlelit terrace table above the gardens."),
      "equatorial-gardens": fit(2, "A picnic under the trees for a first-date story."),
    },
  },
  {
    id: "afternoon-tea",
    label: "Afternoon tea & catch-ups",
    icon: "coffee",
    requestType: "experience",
    suggestedExperienceId: "afternoon-tea",
    fit: {
      "acropole-lounge": fit(1, "Possible — but the fire suits the evening better."),
      "mehmed-pasha-lounge": fit(3, "Home of the Emin Pasha Afternoon Tea, on the terrace."),
      "equatorial-gardens": fit(2, "Tea on the lawn on a clear afternoon."),
    },
  },
  {
    id: "celebration",
    label: "Private celebration",
    icon: "celebration",
    requestType: "private-hire",
    fit: {
      "acropole-lounge": fit(2, "An exclusive evening for up to 80 standing."),
      "mehmed-pasha-lounge": fit(2, "An intimate buyout with the terrace included."),
      "equatorial-gardens": fit(3, "The estate's event lawn — room to dance."),
    },
  },
  {
    id: "photoshoot",
    label: "Photoshoot",
    icon: "camera",
    requestType: "photoshoot",
    suggestedExperienceId: "garden-photoshoot",
    fit: {
      "acropole-lounge": fit(1, "Moody interiors for an editorial frame."),
      "mehmed-pasha-lounge": fit(2, "Garden light through the windows."),
      "equatorial-gardens": fit(3, "The best outdoor picture spot in the city."),
    },
  },
  {
    id: "reception",
    label: "Corporate reception",
    icon: "groups",
    requestType: "private-hire",
    fit: {
      "acropole-lounge": fit(2, "A polished cocktail reception around the bar."),
      "mehmed-pasha-lounge": fit(1, "Suits a small board dinner rather than a crowd."),
      "equatorial-gardens": fit(3, "Canapés on the lawn for up to 250 guests."),
    },
  },
];
