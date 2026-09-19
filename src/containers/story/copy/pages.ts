/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { HeroStatItem } from "@/components/organisms/PageHero";

/**
 * Above-the-fold pitch and framing copy for the three `/our-story`
 * sub-routes — "Emin Pasha — Our Namesake", "The Hotel" and "Message from
 * the General Manager" — which the approved copy deck never supplied a hero
 * for.
 *
 * Traceability. Nothing here adds a date, a place or a claim. Every figure
 * and phrase restates something already in the governed layer:
 *
 *   • "1876", "reached Equatoria", the seven chapters, "refused" the rescue,
 *     "a dozen" languages — `content/story.ts` (timeline + `whyWeCarryThisName`),
 *     already surfaced verbatim by `copy/hero.ts` and `copy/sections.ts`.
 *   • "doctor, a naturalist and a linguist", "an African at heart",
 *     "an appreciation of nature's marvels", "a pouch of serenity" —
 *     `story.whyWeCarryThisName` / `story.generalManagerMessage`.
 *   • "luxury boutique hotel, spa and lifestyle destination", "Nakasero —
 *     Kampala's diplomatic, business and embassy quarter", "Plot 27 Akii Bua
 *     Road" — `content/identity.ts`.
 *   • "4 spaces … carry a name from it" — the count `TIMELINE_LINKS` already
 *     cross-links, restated in `copy/hero.ts`.
 *   • The airport line paraphrases `content/nav-copy.ts`
 *     ("watch your flight, not the clock") and states no distance or time.
 */
export interface StorySubPageHero {
  eyebrow: string;
  headline: string;
  lede: string;
  stats?: HeroStatItem[];
}

interface StorySubPageCopy {
  hero: StorySubPageHero;
  /** Eyebrow + heading for the sibling-chapter cross-link band. */
  onward: { eyebrow: string; heading: string };
}

export const namesakePageCopy: StorySubPageCopy = {
  hero: {
    eyebrow: "§ OUR NAMESAKE",
    headline: "Emin Pasha, the man the hotel is named for",
    lede: "Born Eduard Schnitzer in Germany, he became a doctor, a naturalist and a linguist — and, by his own choosing, an African at heart. This is the full account, told straight from the biographical record with nothing added.",
    stats: [
      { value: "1876", label: "the year he reached Equatoria" },
      { value: "7 chapters", label: "Germany to the upper Nile" },
      { value: "A dozen", label: "languages he worked in" },
      { value: "4 spaces", label: "at the hotel carry a name from it" },
    ],
  },
  onward: {
    eyebrow: "§ CARRY ON",
    heading: "From the man to the house that carries the name",
  },
};

export const theHotelPageCopy: StorySubPageCopy & {
  location: { eyebrow: string; heading: string; description: string; body: string };
} = {
  hero: {
    eyebrow: "§ THE HOUSE",
    headline: "The hotel that carries the name",
    lede: "A luxury boutique hotel, spa and lifestyle destination in the gardens of Nakasero — Kampala's diplomatic, business and embassy quarter. Architecture meant to be walked through like a period; décor threaded with Uganda's own heritage.",
    stats: [
      { value: "Nakasero", label: "Kampala's diplomatic & embassy quarter" },
      { value: "Akii Bua Rd", label: "a few minutes from the city centre" },
      { value: "Spa · pool", label: "in the gardens, open to the city" },
      { value: "4 spaces", label: "named from Emin Pasha's story" },
    ],
  },
  location: {
    eyebrow: "§ THE ADDRESS",
    heading: "Plot 27 Akii Bua Road, Nakasero",
    description:
      "The quiet side of a busy hill — embassies, residences and old gardens, a short drive from the centre of Kampala.",
    body: "Nakasero is where Kampala keeps its diplomatic missions, its head offices and some of its oldest gardens, and the hotel sits inside that on Akii Bua Road: close enough to reach a meeting in the business district on foot, set back enough to hear birds at breakfast. Entebbe International Airport is a straightforward road transfer, and the team runs private cars that watch your flight rather than the clock.",
  },
  onward: {
    eyebrow: "§ CARRY ON",
    heading: "The name, and a word from the person who runs the house",
  },
};

export const gmPageCopy: StorySubPageCopy & {
  framing: { eyebrow: string; heading: string; body: string };
} = {
  hero: {
    eyebrow: "§ A WELCOME",
    headline: "A message from the General Manager",
    lede: "A word of welcome to The Emin Pasha Hotel & Spa — and a note on what the name is meant to stand for: a bold spirit of unity, humanity and an appreciation of nature's marvels.",
  },
  framing: {
    eyebrow: "§ WHAT IT STANDS FOR",
    heading: "Emin's instinct, put into a welcome",
    body: "The welcome below is unattributed beyond the title on purpose — it is the house speaking, not one person, until the General Manager's name is confirmed. What it promises is small and specific: architecture you can walk through like a period of history, décor drawn from Uganda's own heritage, and a pouch of serenity in the middle of Kampala. The four principles the hotel takes from Emin Pasha's life are what that welcome is built on.",
  },
  onward: {
    eyebrow: "§ CARRY ON",
    heading: "The man, and the house he lends his name to",
  },
};
