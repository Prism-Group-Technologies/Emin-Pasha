import { EventPage } from "@/containers/events/EventPage";
import { KudaraCaseStudiesSection } from "@/containers/events/organisms/KudaraCaseStudiesSection";
import { KudaraCateringSection } from "@/containers/events/organisms/KudaraCateringSection";
import { KudaraEstimatorSection } from "@/containers/events/organisms/KudaraEstimatorSection";
import { KudaraLayoutsSection } from "@/containers/events/organisms/KudaraLayoutsSection";
import { KudaraPlanningAidsSection } from "@/containers/events/organisms/KudaraPlanningAidsSection";
import { KudaraProductionSection } from "@/containers/events/organisms/KudaraProductionSection";
import { KudaraShowcaseSection } from "@/containers/events/organisms/KudaraShowcaseSection";
import { meetingSpaces, meetingsPageIntro } from "@/content/meetings";
import { alternatingDirection } from "@/theme/motion";

const hall = meetingSpaces.find((space) => space.id === "kudara-hall");

/** Alternates against the shared intro band (index 0), so the page keeps flowing. */
const m = (index: number) => alternatingDirection(index + 1);

/**
 * Kudara Hall — the pillar-free main hall, rebuilt as a lead funnel of its own
 * rather than a thin wrapper. It keeps the shared `EventPage` shell (hero,
 * inclusions, indicative capacity table, then the common process / packages /
 * differentiators / voices / RFP / FAQ / closing funnel) and injects a
 * bespoke stack in between:
 *
 *   showcase       — the pitch, six headline facts, the primary CTA
 *   layouts        — six schematic set-ups with indicative maximums
 *   production     — the in-house AV spec, five scannable groups
 *   catering       — three per-delegate packages from the hotel kitchens
 *   case studies   — placeholder proof, on the dark band
 *   estimator      — an interactive indicative quote that seeds the RFP form
 *   planning aids  — a sample run of show and a one-page fact sheet
 *
 * Every capacity, rate and case note in the bespoke sections is an invented
 * placeholder and is labelled "indicative" wherever it renders — see
 * `containers/events/copy/kudara*`.
 */
export function KudaraHallContainer() {
  return (
    <EventPage
      heroKey="kudara-hall"
      eyebrow="§ KUDARA HALL"
      heading={hall?.name ?? "Kudara Hall"}
      intro={hall?.description ?? meetingsPageIntro}
      breadcrumb="Kudara Hall"
      stats={[
        { value: "500", label: "theatre (indicative)" },
        { value: "320", label: "banquet (indicative)" },
        { value: "Pillar-free", label: "single span" },
        { value: "In-house", label: "stage & AV" },
      ]}
      venueIds={["kudara-hall"]}
      inclusions={[
        "Pillar-free floor with a built-in stage and screens",
        "In-house AV and a technician on the day",
        "Catering from three restaurants — no external caterer",
        "Secure parking and a separate event entrance",
        "Delegate room block and late checkout on site",
      ]}
      relatedHrefs={["/meeting-rooms", "/business-centre", "/weddings", "/accommodation"]}
    >
      <KudaraShowcaseSection motion={m(0)} />
      <KudaraLayoutsSection motion={m(1)} />
      <KudaraProductionSection motion={m(2)} />
      <KudaraCateringSection motion={m(3)} />
      <KudaraCaseStudiesSection motion={m(4)} />
      <KudaraEstimatorSection motion={m(5)} />
      <KudaraPlanningAidsSection motion={m(6)} />
    </EventPage>
  );
}
