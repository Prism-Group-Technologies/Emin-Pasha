/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface StoryValue {
  id: string;
  /** Lifted verbatim from `story.whatWeTakeFromIt`. */
  title: string;
  /** Invented gloss — how the principle shows up for a guest. */
  body: string;
  icon: IconName;
}

/**
 * The four principles are the four phrases of `story.whatWeTakeFromIt`, word
 * for word. Only the `body` line under each is written here, and it stays
 * inside what the approved copy already claims — "a room, a meal, a massage
 * and a welcome" is itself verbatim.
 */
export const storyValues: StoryValue[] = [
  {
    id: "curiosity",
    title: "Curiosity over conquest",
    body: "A concierge who would rather point you to the thing you did not know to ask for than sell you the obvious one.",
    icon: "auto-stories",
  },
  {
    id: "humanity",
    title: "Humanity over hierarchy",
    body: "The same welcome at the door whether you arrived by motorcade or on foot. Emin's modest manner made him popular; ours is not for show either.",
    icon: "groups",
  },
  {
    id: "nature",
    title: "A real appreciation for the natural world",
    body: "Gardens that are tended rather than decorative, shade you can actually sit in, and a pool that belongs to the city as much as the hotel.",
    icon: "spa",
  },
  {
    id: "affection",
    title: "A stubborn affection for this country",
    body: "Ugandan heritage in the décor, on the menu and in who we hire — not a theme, a fact about the place.",
    icon: "verified",
  },
];
