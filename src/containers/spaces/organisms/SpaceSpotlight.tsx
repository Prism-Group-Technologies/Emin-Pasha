import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { NamesakeNote } from "@/containers/dining/molecules/NamesakeNote";
import type { SpaceProfile } from "@/containers/spaces/copy/profiles";
import { ApprovedDescription } from "@/containers/spaces/molecules/ApprovedDescription";
import { LoungesWhatsAppCta } from "@/containers/spaces/molecules/LoungesWhatsAppCta";
import { SeatingZones } from "@/containers/spaces/molecules/SeatingZones";
import { SeedEnquiryButton } from "@/containers/spaces/molecules/SeedEnquiryButton";
import { SpaceFacts } from "@/containers/spaces/molecules/SpaceFacts";
import { SpaceGallery } from "@/containers/spaces/molecules/SpaceGallery";
import { TagList } from "@/containers/spaces/molecules/TagList";
import type { Space } from "@/schemas/content/space";

export interface SpaceSpotlightProps {
  space: Space;
  profile: SpaceProfile;
  /** Mirrors the gallery to the right on alternate rows from `md` up. */
  flip: boolean;
}

/**
 * One space as an editorial chapter: the mosaic on one side, and on the other
 * the number, name, tagline, "best for" tags, the verbatim approved
 * description, the fact sheet, the seating zones, the namesake note where the
 * source has one, and two CTAs — reserve (seeding the form) or WhatsApp.
 */
export function SpaceSpotlight({ space, profile, flip }: SpaceSpotlightProps) {
  return (
    <Box
      component="article"
      id={space.id}
      aria-labelledby={`${space.id}-title`}
      sx={{
        scrollMarginTop: 96,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        gap: { xs: 5, md: 8 },
        alignItems: "start",
      }}
    >
      <Box sx={{ order: { md: flip ? 2 : 1 }, position: { md: "sticky" }, top: { md: 96 } }}>
        <Reveal media>
          <SpaceGallery assetIds={profile.assetIds} />
        </Reveal>
      </Box>
      <Box sx={{ order: { md: flip ? 1 : 2 }, display: "grid", gap: 4, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <Text
            aria-hidden
            component="span"
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              lineHeight: 1,
              color: "primary.main",
            }}
          >
            {profile.number}
          </Text>
          <Text id={`${space.id}-title`} variant="h2" component="h3">
            {space.name}
          </Text>
        </Box>
        <Text
          variant="h5"
          component="p"
          sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
        >
          {profile.tagline}
        </Text>
        <TagList label={`${space.name} is best for`} tags={profile.bestFor} />
        <ApprovedDescription text={space.description} />
        <SpaceFacts profile={profile} />
        <SeatingZones zones={profile.zones} />
        <NamesakeNote note={space.namedForNote} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pt: 1 }}>
          <SeedEnquiryButton
            label={`Reserve at ${space.name}`}
            seed={{ requestType: "table", space: profile.id }}
          />
          <LoungesWhatsAppCta label="Ask on WhatsApp" />
        </Box>
      </Box>
    </Box>
  );
}
