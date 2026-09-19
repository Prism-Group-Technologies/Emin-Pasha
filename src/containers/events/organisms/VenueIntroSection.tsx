import { Stack } from "@/components/atoms/Stack";
import { SectionShell } from "@/components/templates/SectionShell";
import type { VenueEntry } from "@/containers/events/copy";
import { GroupTerms } from "@/containers/events/molecules/GroupTerms";
import { VenueCapacityTable } from "@/containers/events/molecules/VenueCapacityTable";
import { WhatYouGetBlock } from "@/containers/events/molecules/WhatYouGetBlock";
import type { RevealDirection } from "@/theme/motion";

export interface VenueIntroSectionProps {
  inclusions?: string[];
  /** Venues whose capacity table shows here; the first also supplies the image. */
  venues: VenueEntry[];
  showGroupTerms?: boolean;
  motion?: RevealDirection;
}

/**
 * The intro band shared by every venue page: "what you get" beside a photo of
 * the room, then the indicative capacity table and the group terms full-width
 * below. The list used to run the full container width with the right
 * two-thirds empty — `WhatYouGetBlock` pairs it with the venue's own image.
 */
export function VenueIntroSection({
  inclusions,
  venues,
  showGroupTerms = true,
  motion = "up",
}: VenueIntroSectionProps) {
  const items = inclusions ?? [];
  const lead = venues[0];

  return (
    <SectionShell motion={motion}>
      <Stack spacing={{ xs: 8, md: 9 }}>
        {items.length > 0 && (
          <WhatYouGetBlock items={items} imageId={lead?.assetId} caption={lead?.name} />
        )}
        {venues.length > 0 && <VenueCapacityTable venues={venues} />}
        {showGroupTerms && <GroupTerms />}
      </Stack>
    </SectionShell>
  );
}
