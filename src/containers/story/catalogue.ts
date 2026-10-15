import { type NamedAfterLink, namedAfter } from "@/containers/story/copy/namedAfter";
import { assets } from "@/content/assets";
import { navPanelCopy } from "@/content/nav-copy";
import { findNavItem } from "@/content/navigation";
import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * Every derivation the two Our Story cross-link bands need, in one server-only
 * module.
 *
 * It exists so the organisms stay structural. Both bands used to resolve their
 * own labels, blurbs and hrefs inline, which meant the only way to check that
 * a renamed route still produced a sane card was to render the page; these are
 * plain functions over plain data, so `catalogue.test.ts` can assert it.
 *
 * Labels and blurbs resolve by href from `navigation` and `nav-copy` rather
 * than being restated here (CLAUDE.md §5.4), and the photography is resolved
 * to a finished `AssetRef` on the server, which is what lets the spotlight
 * island receive it as a serialisable prop (DECISIONS.md D25).
 */

const assetById = new Map(assets.map((asset) => [asset.id, asset]));

export interface NamedAfterEntry extends NamedAfterLink {
  asset?: AssetRef;
  /** The part of the site the space lives in — "Dining", "Lounges & Spaces". */
  section?: string;
}

/**
 * The owning section's href for a deep link.
 *
 * `/dining/equatoria-restaurant-bar` and `/lounges-and-spaces#mehmed-pasha`
 * both belong to a top-level entry that carries the label we want, so the
 * first path segment is the lookup key — the hash and any child segment are
 * dropped before asking `navigation` for it.
 */
function sectionHref(href: string): string {
  const [path = ""] = href.split(/[#?]/);
  return `/${path.split("/")[1] ?? ""}`;
}

/** The named spaces, each with its photograph and owning section resolved. */
export const namedAfterEntries: NamedAfterEntry[] = namedAfter.map((link) => ({
  ...link,
  asset: assetById.get(link.assetId),
  section: findNavItem(sectionHref(link.href))?.label,
}));

/**
 * The three chapter pages, in reading order. The pillar page and each chapter
 * point at the others, so the cluster is never three orphans
 * (`yarn check:seo` §4).
 */
const CHAPTER_HREFS = [
  "/our-story/emin-pasha",
  "/our-story/the-hotel",
  "/our-story/message-from-the-general-manager",
] as const;

const chapterPanel = navPanelCopy["/our-story"];

export interface StoryChapter {
  href: string;
  label: string;
  blurb?: string;
  /**
   * Position in the *full* set, zero-padded. Deliberately not the position in
   * the rendered list: a chapter page excludes itself, and renumbering the
   * survivors 01/02 would tell the reader the set has two chapters when the
   * heading beside it says three.
   */
  ordinal: string;
}

/** @param exclude A chapter page's own href, so it does not link to itself. */
export function storyChapters(exclude?: string): StoryChapter[] {
  return CHAPTER_HREFS.flatMap((href, index) => {
    const item = href === exclude ? undefined : findNavItem(href);
    if (!item) {
      return [];
    }
    return [
      {
        href,
        label: item.label,
        blurb: chapterPanel?.descriptions[href],
        ordinal: String(index + 1).padStart(2, "0"),
      },
    ];
  });
}
