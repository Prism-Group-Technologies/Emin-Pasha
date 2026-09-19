/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";

export interface OutletFact {
  /** 2–3 word framing label — invented editorial copy. */
  label: string;
  /** The verified-tone fact sentence, leaning on the approved §5 description. */
  detail: string;
  /** Column marker, from the closed `Icon` name set. */
  icon: IconName;
}

/**
 * The "Good to know" grid on each outlet detail page. Every `label` and `icon`
 * is invented framing; each `detail` leans on the approved §5 description and
 * the sample hours/menus in this folder. Split out of `outlets.ts` so that
 * file stays within the container-copy line ceiling.
 */
export const outletFacts: Record<OutletId, OutletFact[]> = {
  [OUTLET_ID.hakkiPasha]: [
    {
      label: "All day, one room",
      detail: "Breakfast, lunch, dinner and a full bar in one room",
      icon: "restaurant",
    },
    {
      label: "Terrace seating",
      detail: "Opens onto a terrace under the trees",
      icon: "location",
    },
    {
      label: "Family friendly",
      detail: "Children's menu and high chairs available",
      icon: "groups",
    },
    {
      label: "Meetings welcome",
      detail: "The default room for breakfast meetings and long lunches",
      icon: "event",
    },
  ],
  [OUTLET_ID.sirSamuelBaker]: [
    {
      label: "One tasting menu",
      detail: "A single five-course tasting menu, the whole table together",
      icon: "restaurant",
    },
    {
      label: "Wine pairing",
      detail: "Optional wine pairing poured through the evening",
      icon: "auto-awesome",
    },
    {
      label: "Dietary notice",
      detail: "Dietary versions with 24 hours' notice",
      icon: "info",
    },
    {
      label: "By reservation",
      detail: "Reservation only; Sundays and Mondays for private bookings",
      icon: "event",
    },
  ],
  [OUTLET_ID.rooftopTerrace]: [
    {
      label: "City views",
      detail: "Panoramic views over Nakasero and the city",
      icon: "location",
    },
    {
      label: "Kitchen to 22:00",
      detail: "Small plates until the kitchen closes at 22:00",
      icon: "restaurant",
    },
    {
      label: "Full drinks list",
      detail: "Cocktails, wine and a full zero-proof list",
      icon: "auto-awesome",
    },
    {
      label: "Walk-ins welcome",
      detail: "Walk-ins welcome; sunset tables reserve fast",
      icon: "event",
    },
  ],
  [OUTLET_ID.manutea]: [
    {
      label: "Curated list",
      detail: "A curated list of wines and whiskies from around the world",
      icon: "auto-stories",
    },
    {
      label: "Coravin pours",
      detail: "By-the-glass pours kept fresh with a coravin system",
      icon: "auto-awesome",
    },
    {
      label: "Pairing plates",
      detail: "A short food menu built to go with the list",
      icon: "restaurant",
    },
    {
      label: "After-dinner room",
      detail: "The quiet room for a nightcap after dinner",
      icon: "location",
    },
  ],
  [OUTLET_ID.inRoom]: [
    {
      label: "Around the clock",
      detail: "Available around the clock in every room category",
      icon: "king-bed",
    },
    {
      label: "Full menu to 23:00",
      detail: "Full Special-Select menu until 23:00",
      icon: "restaurant",
    },
    {
      label: "Overnight menu",
      detail: "A shorter overnight menu through to breakfast",
      icon: "auto-awesome",
    },
    {
      label: "One call to order",
      detail: "Order by the in-room phone or the reception line",
      icon: "phone",
    },
  ],
};
