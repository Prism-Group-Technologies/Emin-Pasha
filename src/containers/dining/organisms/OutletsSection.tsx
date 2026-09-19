import { SectionShell } from "@/components/templates/SectionShell";
import { OUTLETS_ANCHOR_ID, type OutletId, RESERVE_ANCHOR_ID } from "@/containers/dining/constants";
import { outletMeta, sections } from "@/containers/dining/copy";
import { DiningOutletCard } from "@/containers/dining/molecules/DiningOutletCard";
import { OutletGrid } from "@/containers/dining/organisms/OutletGrid";
import { diningOutlets } from "@/content/dining";
import type { RevealDirection } from "@/theme/motion";

/**
 * The five outlets as a filterable grid. The cards are Server Components built
 * here and handed to `OutletGrid` as children — the client filter only
 * toggles visibility, so `content/dining` and Zod never cross the boundary.
 * In-room dining gets no "Reserve" action: there is no table to book.
 */
export function OutletsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={OUTLETS_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.outlets.eyebrow}
      heading={sections.outlets.heading}
      description={sections.outlets.description}
    >
      <OutletGrid
        ids={diningOutlets.map((outlet) => outlet.id)}
        types={diningOutlets.map((outlet) => outlet.type)}
      >
        {diningOutlets.map((outlet) => {
          const meta = outletMeta[outlet.id as OutletId];
          return (
            <DiningOutletCard
              key={outlet.id}
              id={outlet.id}
              name={outlet.name}
              description={outlet.description}
              kicker={meta.kicker}
              cuisine={meta.cuisine}
              href={`/dining/${outlet.id}`}
              reserveHref={outlet.type === "in-room" ? undefined : `#${RESERVE_ANCHOR_ID}`}
            />
          );
        })}
      </OutletGrid>
    </SectionShell>
  );
}
