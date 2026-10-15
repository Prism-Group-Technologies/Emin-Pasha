"use client";

import { useCallback, useMemo, useState } from "react";

import { receptionServices } from "@/containers/reception/copy";
import type { ReceptionGroupId, ReceptionService } from "@/containers/reception/types";

/** `null` is "show everything", which is the state the section opens in. */
export type ReceptionFilter = ReceptionGroupId | null;

export interface UseReceptionServices {
  filter: ReceptionFilter;
  services: ReceptionService[];
  /** Selecting the active group clears the filter, so a chip toggles. */
  select: (group: ReceptionGroupId) => void;
  clear: () => void;
  isActive: (group: ReceptionGroupId) => boolean;
  /** How many cards the current filter shows — announced to screen readers. */
  count: number;
}

/**
 * The services index's only piece of state: which group is being shown.
 *
 * It lives in a hook rather than in the section component for the reason the
 * rest of this repo splits them — the section is then a pure function of
 * `{ filter, services }` and can be read, and restyled, without anyone having
 * to work out when it re-renders. It also keeps the component under the
 * `max-lines-per-function` ceiling on its own merits rather than by accident.
 *
 * Filtering the catalogue is memoised because it runs on every render of a
 * section that holds sixteen cards, not because sixteen `filter` passes are
 * expensive: the point is referential stability, so the card list is not a new
 * array identity on each keystroke elsewhere in the tree.
 *
 * `select` toggles rather than only setting. A filter row where the active
 * chip is inert is the standard way users get stuck in a filtered view, and
 * "press it again to go back" is the behaviour they try first.
 */
export function useReceptionServices(): UseReceptionServices {
  const [filter, setFilter] = useState<ReceptionFilter>(null);

  const services = useMemo(
    () =>
      filter === null
        ? receptionServices
        : receptionServices.filter((service) => service.group === filter),
    [filter],
  );

  const select = useCallback((group: ReceptionGroupId) => {
    setFilter((current) => (current === group ? null : group));
  }, []);

  const clear = useCallback(() => setFilter(null), []);

  const isActive = useCallback((group: ReceptionGroupId) => filter === group, [filter]);

  return { filter, services, select, clear, isActive, count: services.length };
}
