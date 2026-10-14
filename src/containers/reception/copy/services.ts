/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { stayServices } from "@/containers/reception/copy/servicesStay";
import { supportServices } from "@/containers/reception/copy/servicesSupport";
import type { ReceptionGroupId, ReceptionService } from "@/containers/reception/types";

/**
 * The whole catalogue, in group order.
 *
 * Assembled from two files rather than written as one because the repo caps a
 * module at 120 lines and sixteen service entries do not fit — the split is a
 * line budget, not a taxonomy, which is why the group ordering lives here and
 * not in either half.
 */
export const receptionServices: ReceptionService[] = [...stayServices, ...supportServices];

/**
 * The services in one group, order preserved.
 *
 * A plain filter rather than a prebuilt Map: the catalogue is sixteen entries
 * and this runs on a click, so an index would cost more to maintain than it
 * saves, and a Map would have to be rebuilt the moment a card moved group.
 */
export function servicesInGroup(group: ReceptionGroupId): ReceptionService[] {
  return receptionServices.filter((service) => service.group === group);
}
