import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { routes } from "@/content/routes";

/**
 * Generated from `content/routes.ts`, the same list the internal-link audit
 * uses — so a page cannot exist without appearing here, and `yarn check:seo`
 * fails if one is orphaned.
 *
 * No `lastModified`: the content has no per-page modification date anyone has
 * supplied, and a `Date.now()` on every route tells crawlers everything
 * changed on every deploy, which is worse than telling them nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path === "/" ? "" : route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
