import type { IconName } from "@/components/atoms/Icon";

export interface KudaraSpecItem {
  label: string;
  value: string;
}

export interface KudaraSpecGroup {
  id: string;
  title: string;
  icon: IconName;
  items: KudaraSpecItem[];
}

/**
 * The in-house production spec for Kudara Hall, grouped so an organiser or
 * their AV lead can scan it. Equipment models and counts are indicative
 * placeholders for planning — the final spec is set on the proposal.
 */
export const kudaraProduction: KudaraSpecGroup[] = [
  {
    id: "stage-vision",
    title: "Stage & vision",
    icon: "auto-awesome",
    items: [
      {
        label: "Stage",
        value: "Built-in modular deck, ~10m × 4m, carpeted, with stairs and a ramp",
      },
      { label: "Screens", value: "Twin 5m fast-fold screens plus a 6m centre LED wall" },
      {
        label: "Projection",
        value: "Dual laser projectors with backup and a lectern confidence monitor",
      },
      {
        label: "Vision mixing",
        value: "Live switching and playback from the in-hall control booth",
      },
    ],
  },
  {
    id: "sound",
    title: "Sound",
    icon: "play",
    items: [
      { label: "PA", value: "Left/right line-array with front-fill, tuned to the room" },
      {
        label: "Microphones",
        value: "Up to 12 channels — handheld, lapel, gooseneck and delegate mics",
      },
      {
        label: "Recording",
        value: "Multitrack capture of the floor feed for your post-event edit",
      },
      { label: "Accessibility", value: "Assistive listening feed available on request" },
    ],
  },
  {
    id: "lighting-power",
    title: "Lighting & power",
    icon: "light-mode",
    items: [
      {
        label: "Stage lighting",
        value: "LED wash and profile spots on truss, colour-mixable for branding",
      },
      {
        label: "House scenes",
        value: "Dimmable presets for plenary, catering turnaround and breakdown",
      },
      {
        label: "Power",
        value: "Three-phase distribution with dedicated AV, catering and exhibitor circuits",
      },
      { label: "Backup", value: "Estate standby generator with automatic transfer" },
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity & hybrid",
    icon: "directions",
    items: [
      {
        label: "Internet",
        value: "Dedicated event network, wired stage drops and managed delegate Wi-Fi",
      },
      {
        label: "Streaming",
        value: "Push to Zoom, Teams, YouTube or a private link — single or multi-camera",
      },
      {
        label: "Cameras",
        value: "Up to 3 operated PTZ cameras with a program feed for room and stream",
      },
      {
        label: "Translation",
        value: "Space and cabling for two interpreter booths with delegate receivers",
      },
    ],
  },
  {
    id: "crew",
    title: "Crew & get-in",
    icon: "verified",
    items: [
      { label: "On the day", value: "A duty AV technician assigned from get-in to breakdown" },
      {
        label: "Get-in",
        value: "Ground-level load-in through a dedicated door — no stairs, no lift",
      },
      {
        label: "Rehearsal",
        value: "Tech rehearsal and a speaker walk-through the day before, diary permitting",
      },
      { label: "Green room", value: "A private holding room off the stage for speakers and VIPs" },
    ],
  },
];

export const kudaraProductionNote =
  "All of the above is in-house — no third-party AV company to brief or mark up. Specialist additions (extra LED, broadcast crew, a show caller) are brought in on request and quoted on the proposal.";
