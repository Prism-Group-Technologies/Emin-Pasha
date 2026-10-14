import type { IconName } from "@/components/atoms/Icon";

/**
 * The shape of a scannable equipment spec, shared by every venue page that
 * publishes one.
 *
 * It started life inside `kudaraProduction.ts` and was named for that page.
 * The Boardroom publishes a spec of exactly the same shape — a tinted icon, a
 * group name and label/value rows — so the type and its card moved out here
 * rather than being copied under a second venue's name. `SpecGroupCard`
 * renders it.
 */
export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecGroup {
  id: string;
  title: string;
  icon: IconName;
  items: SpecItem[];
}
