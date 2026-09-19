import type { IconName } from "@/components/atoms/Icon";

/** The seating-plan schematic a card draws — a pure-CSS diagram, no imagery. */
export type LayoutDiagram =
  "theatre" | "classroom" | "banquet" | "cabaret" | "uShape" | "reception";

export interface KudaraLayout {
  id: LayoutDiagram;
  label: string;
  icon: IconName;
  /** Indicative maximum for this layout. Placeholder — labelled on every surface. */
  capacity: number;
  /** The occasions the layout is set for. */
  bestFor: string;
  /** One line on how the room is dressed. */
  note: string;
  diagram: LayoutDiagram;
}

/**
 * Kudara Hall by layout. Capacities mirror the hub's `copy/venues.ts` figures
 * for the same room so the two never disagree; all are indicative placeholders
 * (the source carries no capacity) and are shown with an "indicative" label.
 */
export const kudaraLayouts: KudaraLayout[] = [
  {
    id: "theatre",
    label: "Theatre",
    icon: "groups",
    capacity: 500,
    bestFor: "Plenaries, AGMs, product launches",
    note: "Rows facing the built-in stage and twin screens — the hall's highest seated count.",
    diagram: "theatre",
  },
  {
    id: "classroom",
    label: "Classroom",
    icon: "auto-stories",
    capacity: 260,
    bestFor: "Training, exams, delegate work",
    note: "Trestle rows with power runs for laptops, handouts and interpreter feeds.",
    diagram: "classroom",
  },
  {
    id: "banquet",
    label: "Banquet",
    icon: "restaurant",
    capacity: 320,
    bestFor: "Gala dinners, award nights, weddings",
    note: "Rounds of ten with a stage, dance floor and a top table on the rise.",
    diagram: "banquet",
  },
  {
    id: "cabaret",
    label: "Cabaret",
    icon: "celebration",
    capacity: 240,
    bestFor: "Conferences with table work",
    note: "Half-moon rounds so every delegate faces the stage — no turned backs.",
    diagram: "cabaret",
  },
  {
    id: "uShape",
    label: "U-shape",
    icon: "verified",
    capacity: 70,
    bestFor: "Councils, negotiations, board days",
    note: "One open horseshoe with delegate mics and a camera at the head.",
    diagram: "uShape",
  },
  {
    id: "reception",
    label: "Reception",
    icon: "auto-awesome",
    capacity: 600,
    bestFor: "Standing launches, expos, parties",
    note: "Cleared floor for stands, bars and staging — the hall's largest gathering.",
    diagram: "reception",
  },
];

export const kudaraLayoutsNote =
  "Capacities are indicative maximums for planning and move with staging, dance floors, translation booths and camera positions. Your exact figure is confirmed on the written proposal.";
