import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { type OutletId } from "@/containers/dining/anchors";
import { outletMeta } from "@/containers/dining/copy";
import { DiningOutletCard } from "@/containers/dining/molecules/DiningOutletCard";
import { diningOutlets } from "@/content/dining";
import type { RevealDirection } from "@/theme/motion";

/**
 * The other four outlets, as cards, at the foot of a detail page — the
 * cross-sell that keeps a visitor inside Dining rather than bouncing back to
 * the index to pick the next room.
 */
export function RelatedOutletsSection({
  currentId,
  motion = "up",
}: {
  currentId: string;
  motion?: RevealDirection;
}) {
  const others = diningOutlets.filter((outlet) => outlet.id !== currentId);

  return (
    <SectionShell motion={motion} eyebrow="§ THE OTHER ROOMS" heading="Also to eat and drink here">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 5 },
          alignItems: "stretch",
        }}
      >
        {others.map((outlet, index) => (
          <Reveal key={outlet.id} index={index} fill>
            <DiningOutletCard
              id={outlet.id}
              name={outlet.name}
              description={outlet.description}
              kicker={outletMeta[outlet.id as OutletId].kicker}
              href={`/dining/${outlet.id}`}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
