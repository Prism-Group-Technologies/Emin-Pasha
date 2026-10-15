"use client";

import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { receptionGroups } from "@/containers/reception/copy";
import type { ReceptionGroupId } from "@/containers/reception/types";

export interface ServiceFilterChipsProps {
  isActive: (group: ReceptionGroupId) => boolean;
  select: (group: ReceptionGroupId) => void;
  clear: () => void;
  anyActive: boolean;
  /** Id of the list the chips control, for `aria-controls`. */
  controls: string;
}

/**
 * The group filter.
 *
 * Built as toggle buttons rather than as tabs: tabs promise that exactly one
 * panel is visible at a time and that arrow keys move between them, and this
 * row does neither — "all" is a real state, and each chip independently toggles
 * the one group it names. Calling them tabs would be a lie to assistive tech.
 *
 * `aria-pressed` carries the state, so the active chip is announced as pressed
 * rather than relying on the colour change alone, which is also why the active
 * chip is filled rather than merely tinted.
 */
export function ServiceFilterChips({
  isActive,
  select,
  clear,
  anyActive,
  controls,
}: ServiceFilterChipsProps) {
  return (
    <Box
      role="group"
      aria-label="Filter reception services"
      sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: { xs: 5, md: 6 } }}
    >
      <Chip
        label="Everything"
        onClick={clear}
        aria-pressed={!anyActive}
        aria-controls={controls}
        variant={anyActive ? "outlined" : "filled"}
        color={anyActive ? "default" : "primary"}
      />
      {receptionGroups.map((group) => {
        const active = isActive(group.id);
        return (
          <Chip
            key={group.id}
            label={group.label}
            icon={<Icon name={group.icon} aria-hidden fontSize="small" />}
            onClick={() => select(group.id)}
            aria-pressed={active}
            aria-controls={controls}
            variant={active ? "filled" : "outlined"}
            color={active ? "primary" : "default"}
          />
        );
      })}
    </Box>
  );
}
