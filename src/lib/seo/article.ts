import { site } from "@/config/site";
import { identity } from "@/content/identity";

/**
 * `Article` for the pillar page — CLAUDE.md §9.
 *
 * No `datePublished`/`dateModified`: neither is a fact anyone has supplied,
 * and a fabricated publication date on a historical article is exactly the
 * kind of detail that undermines the trust the page exists to build
 * (TODO(EMIN-Q66)). `author`/`publisher` is the hotel, which is true and
 * verifiable.
 */
export function articleJsonLd(headline: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${site.url}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${path}` },
    author: { "@type": "Organization", name: identity.name, url: site.url },
    publisher: { "@type": "Organization", name: identity.name, url: site.url },
    inLanguage: "en",
    about: { "@type": "Person", name: "Emin Pasha" },
  };
}
