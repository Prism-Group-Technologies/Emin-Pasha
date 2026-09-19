import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { type OutletId } from "@/containers/dining/anchors";
import { outletMeta } from "@/containers/dining/copy";
import { OutletFactGrid } from "@/containers/dining/molecules/OutletFactGrid";
import { OutletIntroCopy } from "@/containers/dining/molecules/OutletIntroCopy";
import { OutletIntroRail } from "@/containers/dining/molecules/OutletIntroRail";
import type { Outlet } from "@/schemas/content/outlet";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

/**
 * The outlet's opening block — the room, argued rather than captioned.
 *
 * The band is an asymmetric sticky-rail split, not the centred 1:1 grid it
 * used to be, and the reason is a content fact rather than a taste: the
 * approved §5 source gives `rooftop-terrace` and `in-room-dining` a
 * single-sentence description and no `namedForNote`, so `NamesakeNote`
 * self-hid and those two pages rendered two lines of text, vertically
 * centred, beside a full-height photograph. A pinned rail is height-
 * independent by construction — see `OutletIntroRail` — so no outlet can
 * out-run or under-run its own image again.
 *
 * The copy column is also deeper. `copy/rooms.ts` adds two editorial
 * paragraphs and a three-line case per outlet (invented, labelled), the
 * outlet's own service times move into the rail from the index-only hours
 * section, two signature dishes bridge into `#menus`, and the column ends on
 * a booking card at the page's point of highest intent. Every one of those
 * blocks renders for all five outlets, which is what makes the band read the
 * same whether or not the source happens to record a namesake.
 *
 * This organism stays a layout: the reading order lives in `OutletIntroCopy`,
 * the rail's stickiness in `OutletIntroRail`, and the "Good to know" facts
 * still run full width beneath the pair, where four equal columns use the
 * whole measure.
 */
export function OutletIntroSection({
  outlet,
  motion = "up",
}: {
  outlet: Outlet;
  motion?: RevealDirection;
}) {
  const id = outlet.id as OutletId;

  return (
    <SectionShell motion={motion} eyebrow="§ THE ROOM">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 0.9fr)" },
          gap: { xs: 7, md: 8, lg: 10 },
          alignItems: "start",
        }}
      >
        <OutletIntroCopy outlet={outlet} />
        <OutletIntroRail outletId={id} mediaMotion={oppositeOf(motion)} />
      </Box>

      <Box sx={{ mt: { xs: 8, md: 10 } }}>
        <OutletFactGrid title="Good to know" items={outletMeta[id].facts} />
      </Box>
    </SectionShell>
  );
}
