import type { SignatureExperience } from "@/containers/spaces/copy/experiences";
import type { MatcherOccasion } from "@/containers/spaces/copy/matcher";
import type { SpaceMatch } from "@/containers/spaces/spaceMatcher";
import type { SpacesEnquirySeed } from "@/stores/spacesEnquiryStore";

type Experience = NonNullable<SpacesEnquirySeed["experience"]>;
type Time = NonNullable<SpacesEnquirySeed["time"]>;

/**
 * The reservation-form seeds each hand-off sends — pure, so the mapping from a
 * card or a match to form values lives in one place. The `copy/` ids are plain
 * strings; the schema's enums are built from those same lists
 * (`schemas/spacesEnquiry.ts`), so each narrowing cast here is sound.
 */
export function experienceSeed(experience: SignatureExperience): SpacesEnquirySeed {
  return {
    requestType:
      experience.spaceId === "equatorial-gardens" && experience.icon === "camera"
        ? "photoshoot"
        : "experience",
    space: experience.spaceId,
    experience: experience.id as Experience,
  };
}

export function matchSeed(
  match: SpaceMatch,
  occasion: MatcherOccasion | undefined,
  guests: number,
  timeId: string,
): SpacesEnquirySeed {
  return {
    requestType: occasion?.requestType ?? "table",
    space: match.spaceId,
    experience: (occasion?.suggestedExperienceId ?? "none") as Experience,
    guests,
    time: timeId as Time,
  };
}
