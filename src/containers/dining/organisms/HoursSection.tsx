import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { MENUS_ANCHOR_ID, OUTLET_ORDER } from "@/containers/dining/anchors";
import { outletHours, sections } from "@/containers/dining/copy";
import { HoursTable } from "@/containers/dining/molecules/HoursTable";
import type { RevealDirection } from "@/theme/motion";

/**
 * Sample service times for every outlet, as a row of small tables. The
 * heading itself flags these as samples; real times are confirmed on
 * reservation (TODO(EMIN-Q12)).
 */
export function HoursSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={`${MENUS_ANCHOR_ID}-hours`}
      motion={motion}
      eyebrow={sections.hours.eyebrow}
      heading={sections.hours.heading}
      description={sections.hours.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "start",
        }}
      >
        {OUTLET_ORDER.map((id, index) => (
          <Reveal key={id} index={index} fill>
            <HoursTable hours={outletHours[id]} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
