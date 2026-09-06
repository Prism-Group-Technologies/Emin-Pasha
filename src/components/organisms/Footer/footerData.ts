import { ctas } from "@/content/ctas";
import { identity } from "@/content/identity";
import { findNavItem } from "@/content/navigation";
import { offers } from "@/content/offers";
import { shell } from "@/content/shell";
import { socialLinks } from "@/content/social";
import { gym, spa } from "@/content/wellness";
import { directionsUrl, emailUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";

export interface FooterLinkItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  titleId: string;
  items: FooterLinkItem[];
}

export interface FooterDetailRow {
  id: string;
  label: string;
  value: string;
}

export interface FooterSocialLink {
  platform: string;
  label: string;
  url: string;
}

/**
 * Platform proper nouns. They exist here rather than in `content/social.ts`
 * because they are not hotel copy and carry no claim — they are the names
 * the icons stand for, needed so the accessible name of each icon button
 * reads "Instagram" instead of the raw `instagram` enum value it announced
 * before.
 */
const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
  linkedin: "LinkedIn",
};

const happyHour = offers.find((offer) => offer.id === "equatorial-sunset-happy-hour");

/**
 * Only the four hour facts the source approves: check-in/check-out (§1), the
 * spa and the gym (§6), and the happy-hour window (§10). Restaurant and bar
 * hours are explicitly forbidden to invent (§0.7) and remain TODO(EMIN-Q12),
 * so `hoursPendingNote` carries an honest "call us" line instead of a
 * fabricated schedule. Happy-hour *days* are TODO(EMIN-Q07) — only the
 * confirmed time window appears, with no day range attached.
 */
const hourRows: FooterDetailRow[] = [
  { id: "check-in", label: "Check-in", value: identity.checkInTime },
  { id: "check-out", label: "Check-out", value: identity.checkOutTime },
  { id: spa.id, label: spa.name, value: spa.hours },
  { id: gym.id, label: gym.name, value: gym.hours },
  happyHour && { id: happyHour.id, label: happyHour.name, value: happyHour.schedule },
  // `hours` and `schedule` are optional on their own schemas — a facility with
  // no approved hours drops out rather than rendering an empty right column.
].flatMap((row) => (row && row.value ? [{ ...row, value: row.value }] : []));

/**
 * Columns store hrefs only; every label is resolved from `navigation`, so
 * renaming a section renames it in the header, the drawer and here at once
 * (CLAUDE.md §5.4). An href with no matching nav entry is a content bug and
 * is dropped rather than rendered as a bare URL.
 */
function buildColumns(): FooterColumn[] {
  return shell.footer.columns.map((column) => ({
    id: column.id,
    title: column.title,
    titleId: `footer-${column.id}`,
    items: column.hrefs.flatMap((href) => {
      const item = findNavItem(href);
      return item ? [{ href, label: item.label }] : [];
    }),
  }));
}

/** Only platforms with a URL in the approved §1 NAP table can be linked —
 * LinkedIn is in `content/social.ts` for its bio but has no confirmed URL
 * (TODO(EMIN-Q67)), so it is dropped rather than linked to a guess. */
const social: FooterSocialLink[] = socialLinks.flatMap((link) =>
  link.url
    ? [
        {
          platform: link.platform,
          label: PLATFORM_LABEL[link.platform] ?? link.platform,
          url: link.url,
        },
      ]
    : [],
);

const napItems: FooterLinkItem[] = [
  { href: directionsUrl, label: identity.address, external: true },
  { href: telephoneUrl, label: identity.telephone, external: true },
  { href: emailUrl, label: identity.email, external: true },
  {
    href: whatsappUrl,
    label: `${shell.stickyBar.whatsapp} ${identity.whatsapp.display}`,
    external: true,
  },
];

const submitLabel =
  ctas.find((cta) => cta.id === "newsletter-join")?.label ?? shell.newsletter.title;

/**
 * Read at **render** time, not at module scope. The previous
 * `const year = new Date().getFullYear()` ran once when the server module was
 * first loaded, so a process started in December served "© 2025" through the
 * whole of the following year. On a statically generated route the value is
 * still fixed at build, which is unavoidable without a client boundary — but
 * every dynamically rendered request now gets the real year.
 */
export function getFooterData() {
  return {
    brand: {
      name: identity.name,
      shortName: identity.shortName,
      suffix: shell.header.wordmarkSuffix,
      statement: shell.footer.brandStatement,
    },
    linkColumns: buildColumns(),
    nap: { title: shell.footer.napTitle, titleId: "footer-nap", items: napItems },
    // Still assembled, but no longer rendered in the footer — `/contact` is
    // the one place the hours appear now (see `HoursBlock`).
    hours: {
      title: shell.footer.hoursTitle,
      titleId: "footer-hours",
      rows: hourRows,
      pendingNote: shell.footer.hoursPendingNote,
    },
    social: { title: shell.footer.socialTitle, titleId: "footer-social", links: social },
    newsletter: { ...shell.newsletter, submitLabel },
    legal: {
      navLabel: shell.footer.legalNavLabel,
      links: shell.footer.legalLinks,
      cookieLabel: shell.consent.reopenLabel,
      copyright: `© ${new Date().getFullYear()} ${identity.name}. ${shell.footer.copyrightSuffix}`,
    },
  };
}

export type FooterData = ReturnType<typeof getFooterData>;
