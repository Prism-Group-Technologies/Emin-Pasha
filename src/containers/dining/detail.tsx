import { ClosingCtaSection } from "@/containers/dining/organisms/ClosingCtaSection";
import { OutletDetailHero } from "@/containers/dining/organisms/OutletDetailHero";
import { OutletIntroSection } from "@/containers/dining/organisms/OutletIntroSection";
import { OutletMenuSection } from "@/containers/dining/organisms/OutletMenuSection";
import { RelatedOutletsSection } from "@/containers/dining/organisms/RelatedOutletsSection";
import { ReservationSection } from "@/containers/dining/organisms/ReservationSection";
import type { Outlet } from "@/schemas/content/outlet";
import type { ReservationOutlet } from "@/schemas/diningReservation";
import { alternatingDirection } from "@/theme/motion";

/**
 * One outlet. The name, description and `namedForNote` are the approved §5
 * copy, unedited. The sample menu, the fact list and the figure rail are
 * invented placeholders colocated in `./copy` (TODO(EMIN-Q12) / EMIN-COPY),
 * labelled as samples wherever they render.
 *
 * The reservation form is the same organism the index uses, with this outlet
 * pre-selected — an enquirer who has just read one page should not have to
 * scroll back to a shared form and re-pick the room.
 */
export function OutletDetailContainer({ outlet }: { outlet: Outlet }) {
  return (
    <>
      <OutletDetailHero outlet={outlet} />
      <OutletIntroSection outlet={outlet} motion={alternatingDirection(0)} />
      <OutletMenuSection outlet={outlet} motion={alternatingDirection(1)} />
      <ReservationSection
        motion={alternatingDirection(2)}
        outlet={outlet.id as ReservationOutlet}
      />
      <RelatedOutletsSection currentId={outlet.id} motion={alternatingDirection(3)} />
      <ClosingCtaSection motion={alternatingDirection(4)} />
    </>
  );
}
