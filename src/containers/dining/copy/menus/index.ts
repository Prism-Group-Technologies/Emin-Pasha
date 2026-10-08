/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";
import { equatoriaMenu } from "@/containers/dining/copy/menus/equatoria";
import { inRoomMenu } from "@/containers/dining/copy/menus/inRoom";
import { manuteaMenu } from "@/containers/dining/copy/menus/manutea";
import { rooftopMenu } from "@/containers/dining/copy/menus/rooftop";
import type { OutletMenu } from "@/containers/dining/copy/menus/types";

export type { MenuItem, MenuCourse, OutletMenu } from "@/containers/dining/copy/menus/types";

/** A sample menu per outlet, keyed by the ids in `content/dining.ts`. */
export const outletMenus = {
  [OUTLET_ID.equatoria]: equatoriaMenu,
  [OUTLET_ID.rooftopTerrace]: rooftopMenu,
  [OUTLET_ID.manutea]: manuteaMenu,
  [OUTLET_ID.inRoom]: inRoomMenu,
} satisfies Record<OutletId, OutletMenu>;
