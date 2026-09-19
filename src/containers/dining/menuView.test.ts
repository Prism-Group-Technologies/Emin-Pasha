import { describe, expect, it } from "vitest";

import { OUTLET_ID } from "@/containers/dining/anchors";
import { outletMenus } from "@/containers/dining/copy";
import { MAX_SIGNATURE_DISHES, getOutletMenuView } from "@/containers/dining/menuView";

describe("getOutletMenuView", () => {
  it("passes the summary and every course straight through", () => {
    const menu = outletMenus[OUTLET_ID.hakkiPasha];
    const view = getOutletMenuView(OUTLET_ID.hakkiPasha);

    expect(view.summary).toBe(menu.summary);
    expect(view.courses).toEqual(menu.courses);
  });

  it("lifts the flagged dishes into the signature strip, in menu order", () => {
    const view = getOutletMenuView(OUTLET_ID.hakkiPasha);

    expect(view.signatureDishes.map((dish) => dish.name)).toEqual([
      "Ottoman mezze board",
      "Charcoal chicken, matoke two ways",
      "Nile perch, coconut & lemongrass",
    ]);
  });

  it("tags each signature dish with the course it came from", () => {
    const view = getOutletMenuView(OUTLET_ID.hakkiPasha);
    const byName = new Map(view.signatureDishes.map((dish) => [dish.name, dish.course]));

    expect(byName.get("Ottoman mezze board")).toBe("To begin");
    expect(byName.get("Charcoal chicken, matoke two ways")).toBe("Mains");
  });

  it("resolves each signature dish's photo", () => {
    const view = getOutletMenuView(OUTLET_ID.hakkiPasha);

    for (const dish of view.signatureDishes) {
      expect(dish.asset).toBeDefined();
      // Delivery is derived from @/content/photoAssignments, not declared in
      // the menu data — the dish slots resolve to a stand-in until the plated
      // shoot happens, but they must resolve to something.
      expect(dish.asset?.status).toBe("delivered");
      expect(dish.asset?.image?.src).toBeTruthy();
    }
  });

  it("never shows more than the cap", () => {
    for (const id of Object.values(OUTLET_ID)) {
      expect(getOutletMenuView(id).signatureDishes.length).toBeLessThanOrEqual(
        MAX_SIGNATURE_DISHES,
      );
    }
  });

  it("keeps a zero-price tasting course as a strip card with no price", () => {
    const view = getOutletMenuView(OUTLET_ID.sirSamuelBaker);

    expect(view.signatureDishes.length).toBeGreaterThan(0);
    expect(view.signatureDishes.every((dish) => dish.priceUgx === 0)).toBe(true);
  });
});
