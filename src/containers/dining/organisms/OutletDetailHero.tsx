import { PageHero } from "@/components/organisms/PageHero";
import { MENUS_ANCHOR_ID, type OutletId, RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";
import { outletMeta } from "@/containers/dining/copy";
import { pageHeroImage } from "@/content/pageHeroes";
import type { Outlet } from "@/schemas/content/outlet";

/**
 * One outlet's above-the-fold block: the shared `PageHero` with the approved
 * name and description, the invented figure rail from `copy/outlets.ts`, and
 * two CTAs — reserve (or, for in-room dining, jump to the menu) and see the
 * menu.
 */
export function OutletDetailHero({ outlet }: { outlet: Outlet }) {
  const meta = outletMeta[outlet.id as OutletId];
  const isInRoom = outlet.type === "in-room";

  return (
    <PageHero
      image={pageHeroImage(outlet.id)}
      eyebrow={`§ ${meta.kicker.toUpperCase()}`}
      headline={outlet.name}
      lede={outlet.description}
      label={outlet.name}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dining", href: "/dining" },
        { label: outlet.name },
      ]}
      primaryCta={
        isInRoom
          ? { label: "See the menu", href: `#${MENUS_ANCHOR_ID}` }
          : { label: "Reserve a table", href: `#${RESERVE_ANCHOR_ID}` }
      }
      secondaryCta={isInRoom ? undefined : { label: "See the menu", href: `#${MENUS_ANCHOR_ID}` }}
      stats={meta.stats}
      minHeight={{ xs: 520, md: 600 }}
    />
  );
}
