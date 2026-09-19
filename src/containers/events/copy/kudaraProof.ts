import type { IconName } from "@/components/atoms/Icon";

export interface KudaraCaseStudy {
  id: string;
  format: string;
  headline: string;
  body: string;
  metrics: { icon: IconName; value: string; label: string }[];
}

/**
 * Placeholder case notes for events the hall can run — format, numbers and
 * outcome — standing in until real client references are collected and signed
 * off. No real organisation, person or date is named.
 */
export const kudaraCaseStudies: KudaraCaseStudy[] = [
  {
    id: "annual-conference",
    format: "Annual conference · placeholder client",
    headline: "400 delegates, plenary plus eight breakouts, one site",
    body: "Moved off a convention centre. Registration in the foyer, plenary in the hall, breakouts in the meeting rooms, lunch out and back in 15 minutes.",
    metrics: [
      { icon: "groups", value: "400", label: "delegates" },
      { icon: "event", value: "1 day", label: "plenary + 8 breakouts" },
      { icon: "check-circle", value: "15 min", label: "lunch turnaround" },
    ],
  },
  {
    id: "product-launch",
    format: "Product launch · placeholder client",
    headline: "Broadcast-grade launch, streamed to three markets",
    body: "Reception format for 550, a 6m LED wall, three cameras and a managed stream to regional offices with a private link.",
    metrics: [
      { icon: "auto-awesome", value: "550", label: "guests standing" },
      { icon: "directions", value: "3", label: "markets streamed" },
      { icon: "check-circle", value: "0", label: "external AV vendors" },
    ],
  },
  {
    id: "gala-awards",
    format: "Awards gala · placeholder client",
    headline: "Conference by day, black-tie dinner by night, same room",
    body: "Theatre for 480 until 5pm, flipped to banquet rounds for 300 by 7pm while guests were on the terrace. One team, one contract.",
    metrics: [
      { icon: "groups", value: "480 → 300", label: "theatre to banquet" },
      { icon: "event", value: "2 hrs", label: "room flip" },
      { icon: "restaurant", value: "3", label: "kitchens plating" },
    ],
  },
];

export interface KudaraRunStep {
  time: string;
  title: string;
  detail: string;
}

/** A sample conference-day run of show — an example to react to, not a fixed schedule. */
export const kudaraRunOfShow: KudaraRunStep[] = [
  {
    time: "07:00",
    title: "Get-in & tech check",
    detail:
      "Crew load in at ground level; AV, comms and lighting scenes checked against last night's rehearsal.",
  },
  {
    time: "08:00",
    title: "Registration opens",
    detail: "Foyer desks, badge printing and arrival coffee; delegate Wi-Fi codes on the screens.",
  },
  {
    time: "09:00",
    title: "Plenary",
    detail: "Doors held, house lights to preset, chair to the lectern; stream goes live.",
  },
  {
    time: "11:00",
    title: "Break & breakouts",
    detail: "Refresh stations in the foyer; breakout rooms already set and mic'd.",
  },
  {
    time: "13:00",
    title: "Lunch",
    detail: "Served in a restaurant so the hall stays set; 45 minutes door to door.",
  },
  {
    time: "17:00",
    title: "Close & flip",
    detail:
      "Wrap the stream, capture files handed over, room reset for the evening if there is one.",
  },
];

export interface KudaraFactSheetPoint {
  label: string;
  value: string;
}

/** The one-page fact sheet a planner can drop into an internal sign-off pack. */
export const kudaraFactSheet: KudaraFactSheetPoint[] = [
  { label: "Room", value: "Pillar-free, ~24m clear span, ground floor, step-free" },
  { label: "Indicative capacity", value: "Up to 500 theatre / 320 banquet / 600 reception" },
  {
    label: "Production",
    value: "Built-in stage, screens, line-array sound, lighting rig, streaming, duty technician",
  },
  { label: "Catering", value: "Three in-house kitchens; no external caterer permitted or needed" },
  {
    label: "Access",
    value: "Ground-level get-in, secure parking, separate event entrance, green room",
  },
  { label: "On site", value: "Delegate room block, late checkout, gym, pool and gardens" },
];

export const kudaraPlannerNote =
  "One planner owns your event from the first call to the breakdown — the person who quotes it runs it on the day. You are never handed to an operations team after signing.";
