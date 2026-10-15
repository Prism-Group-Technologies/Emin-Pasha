"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { receptionGroups } from "@/containers/reception/copy";
import { useReceptionServices } from "@/containers/reception/hooks/useReceptionServices";
import { ServiceCard } from "@/containers/reception/molecules/ServiceCard";
import { ServiceFilterChips } from "@/containers/reception/molecules/ServiceFilterChips";

const LIST_ID = "reception-service-list";

/**
 * The filterable services index — the page's only client island.
 *
 * It holds no copy and no layout decisions beyond the grid: the catalogue
 * comes from `copy/`, the state from `useReceptionServices`, and the chip row
 * from its own molecule. What is left here is the join between them, which is
 * the whole point of the split.
 *
 * The grid is three-across on a desktop, two on a tablet, one on a phone, and
 * every card is the same size. Sixteen parallel services have no hierarchy
 * between them, and a bento that varies tile area without varying importance
 * just reads as a layout bug — the same argument `FeatureTiles` settled.
 *
 * The result count is announced in a live region rather than drawn, because a
 * sighted user watches the grid change and a screen-reader user otherwise gets
 * silence after pressing a chip.
 */
export function ReceptionServices() {
  const { services, select, clear, isActive, filter, count } = useReceptionServices();
  const activeGroup = receptionGroups.find((group) => group.id === filter);

  return (
    <>
      <ServiceFilterChips
        isActive={isActive}
        select={select}
        clear={clear}
        anyActive={filter !== null}
        controls={LIST_ID}
      />

      {activeGroup && (
        <Text variant="subtitle1" color="text.secondary" sx={{ mb: 5, textWrap: "pretty" }}>
          {activeGroup.blurb}
        </Text>
      )}

      <VisuallyHidden live="polite">
        {`${count} ${count === 1 ? "service" : "services"} shown`}
      </VisuallyHidden>

      <Box
        component="ul"
        id={LIST_ID}
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </Box>
    </>
  );
}
