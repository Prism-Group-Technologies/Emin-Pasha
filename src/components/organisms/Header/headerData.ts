import { assets } from "@/content/assets";
import { identity } from "@/content/identity";
import { navPanelCopy } from "@/content/nav-copy";
import { bookNowCta, headerNavigation, navigation } from "@/content/navigation";
import { shell } from "@/content/shell";
import { telephoneUrl, whatsappUrl } from "@/lib/directions";
import type { AssetRef } from "@/schemas/content/assetRef";
import type { NavItem } from "@/schemas/content/navItem";

/**
 * The header is the site's one persistent client island, and every content
 * module it would otherwise import is Zod-validated at module scope — which
 * drags Zod itself into the first-load bundle of every route (**measured at
 * 65 KB gzipped**, DECISIONS.md D25). So the content is read here, in a
 * module only Server Components import, and handed across the boundary as a
 * plain serializable object instead.
 *
 * This is also just the rule in CLAUDE.md §5.4 applied honestly:
 * presentational components take props in and return JSX; they do not reach
 * into the content layer themselves.
 */

/** One destination inside a mega-menu panel, fully resolved server-side. */
export interface HeaderPanelLink {
  href: string;
  label: string;
  description?: string;
  asset?: AssetRef;
}

/**
 * A whole panel, assembled here rather than in the client component, so the
 * client never has to join a nav item to its copy to its asset — it receives
 * the finished shape and renders it.
 */
export interface HeaderPanel {
  href: string;
  label: string;
  eyebrow: string;
  intro?: string;
  viewAllLabel: string;
  links: HeaderPanelLink[];
}

export interface HeaderData {
  labels: (typeof shell)["header"];
  /** Full tree for the mobile drawer; six-entry subset for the desktop bar. */
  navigation: NavItem[];
  headerNavigation: NavItem[];
  /** Panels keyed by top-level href — the desktop bar and drawer share these. */
  panels: Record<string, HeaderPanel>;
  bookCta: { label: string; href: string };
  contact: {
    shortName: string;
    telephone: string;
    telephoneUrl: string;
    whatsappUrl: string;
    whatsappDisplay: string;
    callLabel: string;
    whatsappLabel: string;
  };
}

const assetById = new Map(assets.map((asset) => [asset.id, asset]));

/**
 * Builds one panel from three independent sources — the nav tree (structure),
 * `nav-copy.ts` (merchandising) and `assets.ts` (imagery) — and tolerates any
 * of the last two being absent. That tolerance is the point: copy is pending
 * sign-off (TODO(EMIN-Q70)) and photography is pending delivery
 * (TODO(EMIN-Q44)), so a panel has to render correctly with labels alone and
 * simply get richer as each lands, rather than blocking on either.
 */
function buildPanel(item: NavItem): HeaderPanel | undefined {
  if (!item.children?.length) {
    return undefined;
  }
  const copy = navPanelCopy[item.href];

  return {
    href: item.href,
    label: item.label,
    eyebrow: copy?.eyebrow ?? item.label,
    intro: copy?.intro,
    viewAllLabel: copy?.viewAllLabel ?? `View all ${item.label.toLowerCase()}`,
    links: item.children.map((child) => ({
      href: child.href,
      label: child.label,
      description: copy?.descriptions[child.href],
      asset: assetById.get(copy?.assetIds[child.href] ?? ""),
    })),
  };
}

/**
 * Built from the **whole** nav tree, not just the six desktop entries: the
 * mobile drawer renders every section, so Lounges & Spaces and Experiences
 * need panels too even though they never appear in the desktop bar. The
 * desktop bar simply looks its own six hrefs up in this map and shows a
 * disclosure only where it finds one.
 */
function buildPanels(): Record<string, HeaderPanel> {
  const entries = navigation.flatMap((item) => {
    const panel = buildPanel(item);
    return panel ? [[item.href, panel] as const] : [];
  });
  return Object.fromEntries(entries);
}

export const headerData: HeaderData = {
  labels: shell.header,
  navigation,
  headerNavigation,
  panels: buildPanels(),
  bookCta: { label: bookNowCta.label, href: bookNowCta.href },
  contact: {
    shortName: identity.shortName,
    telephone: identity.telephone,
    telephoneUrl,
    whatsappUrl,
    whatsappDisplay: identity.whatsapp.display,
    callLabel: shell.stickyBar.call,
    whatsappLabel: shell.stickyBar.whatsapp,
  },
};
