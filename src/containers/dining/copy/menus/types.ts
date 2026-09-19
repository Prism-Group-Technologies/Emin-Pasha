/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts. */

export interface MenuItem {
  name: string;
  description: string;
  /** Indicative price in UGX. Invented — no rate is in the source (§0.7). 0 = no separate price. */
  priceUgx: number;
  /**
   * Surfaces this dish in the signature strip at the top of the outlet menu
   * section. Pair it with `assetId` so the strip card has a photo.
   */
  signature?: boolean;
  /**
   * Invented placeholder asset id — resolves against `copy/menus/assets.ts`,
   * not the governed `content/assets.ts`, because the dish itself is invented
   * (TODO(EMIN-COPY)). Only the handful of `signature` dishes carry one.
   */
  assetId?: string;
}

export interface MenuCourse {
  name: string;
  items: MenuItem[];
}

export interface OutletMenu {
  label: string;
  /** One-line framing of the room's cooking. */
  summary: string;
  courses: MenuCourse[];
}
