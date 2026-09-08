/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface HeroStatCopy {
  value: string;
  label: string;
}

/**
 * The above-the-fold pitch. The headline reframes the approved intro line
 * ("the gardens outside your window"); the lede itself is the verbatim
 * approved `accommodationPageIntro`, passed in by the organism rather than
 * restated here. The stats are all traceable figures — the rate card, the
 * founding year, the Nakasero positioning, the four categories.
 */
export const heroCopy = {
  eyebrow: "§ ROOMS & SUITES",
  headline: "Rooms that open onto the garden",
  primaryCta: { label: "Check availability", href: "#book" },
  secondaryCta: { label: "Compare the rooms", href: "#compare" },
  stats: [
    { value: "from UGX 250,000", label: "per night · breakfast included" },
    { value: "4", label: "room & suite categories" },
    { value: "Nakasero", label: "Kampala's embassy quarter" },
    { value: "Est. 2004", label: "independent & boutique" },
  ] satisfies HeroStatCopy[],
};
