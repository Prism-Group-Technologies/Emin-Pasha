import { type OutletId } from "@/containers/dining/anchors";
import { type MenuCourse, outletMenus } from "@/containers/dining/copy";
import { signatureDishAsset } from "@/containers/dining/copy/menus/assets";
import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * How many dishes the signature strip shows at most. The menu-photography
 * research lands on "3–5, never every dish"; three keeps each card large
 * enough to carry a plated hero shot and still fits one row on desktop.
 */
export const MAX_SIGNATURE_DISHES = 3;

export interface SignatureDish {
  name: string;
  description: string;
  /** Indicative price in UGX; `0` means the dish has no separate price. */
  priceUgx: number;
  /** The course the dish sits in — rendered as the card's chip. */
  course: string;
  /** Placeholder photo, or `undefined` when the id is unset or unknown. */
  asset?: AssetRef;
}

export interface OutletMenuView {
  /** One-line framing of the room's cooking. */
  summary: string;
  /** Every course, untouched — the full text menu below the strip. */
  courses: MenuCourse[];
  /** Up to `MAX_SIGNATURE_DISHES`, in menu order, for the strip. */
  signatureDishes: SignatureDish[];
}

/**
 * The outlet menu section's view model.
 *
 * A module, not a hook — the same call the Dining index's `motion.ts` makes:
 * the menu section is a Server Component that ships no JavaScript, and there
 * is no state here, only a walk of the sample menu to lift out the `signature`
 * dishes and attach each one's placeholder photo.
 */
export function getOutletMenuView(outletId: OutletId): OutletMenuView {
  const menu = outletMenus[outletId];

  const signatureDishes: SignatureDish[] = menu.courses
    .flatMap((course) =>
      course.items
        .filter((item) => item.signature)
        .map((item) => ({
          name: item.name,
          description: item.description,
          priceUgx: item.priceUgx,
          course: course.name,
          asset: signatureDishAsset(item.assetId),
        })),
    )
    .slice(0, MAX_SIGNATURE_DISHES);

  return { summary: menu.summary, courses: menu.courses, signatureDishes };
}
