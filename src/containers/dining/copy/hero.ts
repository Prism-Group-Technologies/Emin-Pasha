/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { MENUS_ANCHOR_ID, RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";

/**
 * The above-the-fold pitch. Every figure is traceable: "3 + 2" is the
 * approved "three restaurants and two bars"; "24/7" is the approved in-room
 * line; the rooftop and the tri-continental menu are both approved §5 copy;
 * the dumbwaiter is the detail the brief itself calls out.
 */
export const heroCopy = {
  eyebrow: "§ DINING",
  headline: "A table for every mood in Nakasero",
  lede: "Three restaurants, two bars and a rooftop over Kampala — Asian, European and African cooking sent up through open kitchens and a restored dumbwaiter, in gardens you would not know were in the city.",
  primaryCta: { label: "Reserve a table", href: `#${RESERVE_ANCHOR_ID}` },
  secondaryCta: { label: "See the menus", href: `#${MENUS_ANCHOR_ID}` },
  stats: [
    { value: "3 + 2", label: "restaurants & bars" },
    { value: "24/7", label: "in-room dining" },
    { value: "Rooftop", label: "views over the city" },
    { value: "3 continents", label: "on one menu" },
  ],
};
