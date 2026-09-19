import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { type OutletId } from "@/containers/dining/anchors";
import { outletHours, outletMeta } from "@/containers/dining/copy";
import { HoursTable } from "@/containers/dining/molecules/HoursTable";
import { OutletShowcaseMedia } from "@/containers/dining/molecules/OutletShowcaseMedia";
import type { RevealDirection } from "@/theme/motion";

/**
 * Clears the sticky header when the rail pins — the same offset the story
 * page's table of contents and every `scrollMarginTop` on the site use.
 */
const STICKY_TOP = 120;

export interface OutletIntroRailProps {
  outletId: OutletId;
  /** Direction the photo settles in from — the opposite of the band's. */
  mediaMotion: RevealDirection;
}

/**
 * The intro band's media rail: the room shot and the outlet's service times,
 * pinned while the copy column scrolls past from `md` up.
 *
 * Sticky rather than centred. The previous band was a centred 1:1 grid, which
 * meant its height was set by the photo and any outlet whose copy ran shorter
 * than the image left a column of dead space beside it — visible on the two
 * outlets the approved copy gives one sentence and no namesake. A pinned rail
 * has no opinion about how long the copy is: short or long, the photo stays
 * in view for the whole read and nothing is left to balance by hand.
 *
 * The service times move here from the index-only hours section. They were
 * already written per outlet in `copy/hours.ts` and never shown on the page
 * for that outlet, which is the question a visitor has while looking at the
 * room, not five sections later.
 */
export function OutletIntroRail({ outletId, mediaMotion }: OutletIntroRailProps) {
  const meta = outletMeta[outletId];

  return (
    <Box
      sx={{
        order: { xs: 1, md: 2 },
        position: { md: "sticky" },
        top: { md: STICKY_TOP },
        alignSelf: "start",
        display: "grid",
        gap: { xs: 5, md: 6 },
      }}
    >
      <Reveal direction={mediaMotion} media>
        <OutletShowcaseMedia
          outletId={outletId}
          caption={`§ ${meta.kicker}`}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </Reveal>
      <HoursTable hours={outletHours[outletId]} />
    </Box>
  );
}
