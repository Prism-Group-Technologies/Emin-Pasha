import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Link } from "@/components/atoms/Link";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { quietLinkSx } from "@/theme/linkStyles";

export interface NavLinkListItem {
  href: string;
  label: string;
  /** `tel:`, `mailto:` or an off-site URL — bypasses the client router. */
  external?: boolean;
}

export interface NavLinkListProps {
  items: NavLinkListItem[];
  /** Rendered as the list's `overline` heading and wired up as its a11y name. */
  title?: string;
  titleId?: string;
}

/**
 * A titled column of quiet links — the footer's link columns and its
 * "Discover" block are the same molecule with different data.
 *
 * The list is a real `<ul>`, so assistive tech announces the item count, and
 * `aria-labelledby` ties it to its own heading rather than leaving five
 * unnamed lists in the footer landmark.
 */
export function NavLinkList({ items, title, titleId }: NavLinkListProps) {
  return (
    <Box>
      {title && (
        <SectionLabel id={titleId} sx={{ mb: 2 }}>
          {title}
        </SectionLabel>
      )}
      <Box
        component="ul"
        aria-labelledby={title && titleId ? titleId : undefined}
        sx={{ listStyle: "none", m: 0, p: 0, display: "grid", justifyItems: "start" }}
      >
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <ExternalLink href={item.href} variant="body2" sx={quietLinkSx}>
                {item.label}
              </ExternalLink>
            ) : (
              <Link href={item.href} variant="body2" sx={quietLinkSx}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </Box>
    </Box>
  );
}
