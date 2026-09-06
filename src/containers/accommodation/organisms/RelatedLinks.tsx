import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { findNavItem } from "@/content/navigation";

/**
 * Internal links out of Accommodation. Labels resolve from `navigation` by
 * href, so a section renamed anywhere is renamed here too (CLAUDE.md §5.4).
 */
export function RelatedLinks({ hrefs }: { hrefs: string[] }) {
  return (
    <Box
      component="ul"
      sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexWrap: "wrap", gap: 6 }}
    >
      {hrefs.map((href) => {
        const item = findNavItem(href);
        if (!item) {
          return null;
        }
        return (
          <li key={href}>
            <Link href={href} variant="h4" underline="hover">
              {item.label}
            </Link>
          </li>
        );
      })}
    </Box>
  );
}
