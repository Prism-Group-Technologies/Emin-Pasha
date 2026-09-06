import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/**
 * **AI crawlers are allowed** — client decision, 2026-08-03 (DECISIONS.md
 * D63). No `Disallow` rule names GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended or CCBot, which is what CLAUDE.md §9's "do not block AI
 * crawlers unless the client explicitly asks" requires, and what makes the
 * `/llms.txt` fact sheet worth publishing at all.
 *
 * The only exclusions are routes with nothing to index: the API surface, and
 * the internal styleguide (which is already `noindex` in its own metadata).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/styleguide"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
