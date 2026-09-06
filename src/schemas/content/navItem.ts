import { z } from "zod";

/**
 * Site architecture, docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.1. Recursive —
 * a nav item may have children (e.g. Accommodation → Superior Room).
 */
export type NavItem = {
  label: string;
  href: string;
  isPersistentCta?: boolean;
  children?: NavItem[];
};

export const navItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    isPersistentCta: z.boolean().optional(),
    children: z.array(navItemSchema).optional(),
  }),
);
