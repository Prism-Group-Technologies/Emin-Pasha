/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import type { SpaceId } from "@/containers/spaces/anchors";

export interface SeatingZone {
  icon: IconName;
  title: string;
  detail: string;
}

/**
 * The three zones within each space. The Acropole's restate its approved
 * description's own fireplace / bar / alcove split.
 */
export const seatingZones: Record<SpaceId, SeatingZone[]> = {
  "acropole-lounge": [
    {
      icon: "fireplace",
      title: "By the fireplace",
      detail: "Sumptuous armchairs, cosy couches and the fountain in view.",
    },
    {
      icon: "cocktail",
      title: "At the bar",
      detail: "Front-row seats to the mixologists and their artisanal cocktails.",
    },
    {
      icon: "laptop",
      title: "In the alcoves",
      detail: "Secluded corners for solitude or a discreet business discussion.",
    },
  ],
  "mehmed-pasha-lounge": [
    {
      icon: "garden",
      title: "The garden terrace",
      detail: "Outdoor tables looking straight onto the flora.",
    },
    {
      icon: "auto-stories",
      title: "The reading room",
      detail: "Indoor armchairs, low light and no background music.",
    },
    {
      icon: "coffee",
      title: "The tea table",
      detail: "A long table for afternoon tea and small gatherings.",
    },
  ],
  "equatorial-gardens": [
    {
      icon: "garden",
      title: "The main lawn",
      detail: "Open grass for long tables or a marquee.",
    },
    {
      icon: "camera",
      title: "The picture walk",
      detail: "Planted paths and the estate's best light at golden hour.",
    },
    {
      icon: "celebration",
      title: "The canopy",
      detail: "A shaded corner for ceremonies, bands and speeches.",
    },
  ],
};
