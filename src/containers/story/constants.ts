import { story } from "@/content/story";

/**
 * The outlets named from the story, linked from the timeline entry that
 * explains each name. This is the internal-linking spine CLAUDE.md §9 asks
 * for: the pillar page earns the authority, then passes it to the commercial
 * pages that carry those names.
 */
export const TIMELINE_LINKS: Record<string, { label: string; href: string }[]> = {
  "germany-and-albania": [
    { label: "Hakki Pasha Restaurant & Bar", href: "/dining/hakki-pasha-restaurant-bar" },
  ],
  "cairo-and-khartoum": [
    { label: "Mehmed Pasha Lounge", href: "/lounges-and-spaces#mehmed-pasha-lounge" },
  ],
  equatoria: [
    { label: "Equatorial Gardens", href: "/lounges-and-spaces#equatorial-gardens" },
    { label: "Sir Samuel Baker Fine Dining", href: "/dining/sir-samuel-baker-fine-dining" },
  ],
};

/** Sections of the pillar page, in reading order — drives the sticky ToC. */
export const STORY_SECTIONS = [
  { id: "why-this-name", title: "Why we carry this name" },
  { id: "the-life", title: "The life" },
  ...story.timeline.map((entry) => ({ id: entry.id, title: entry.title, nested: true })),
  { id: "what-we-take", title: "What we take from it" },
  { id: "from-the-gm", title: "From the General Manager" },
] as { id: string; title: string; nested?: boolean }[];
