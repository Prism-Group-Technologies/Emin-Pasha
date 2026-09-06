import { Box } from "@/components/atoms/Box";
import { NavLinkList } from "@/components/molecules/NavLinkList";
import { FOOTER_LINK_GRID } from "@/components/organisms/Footer/constants";
import type { FooterColumn } from "@/components/organisms/Footer/footerData";

/**
 * The primary link grid. Purely a layout wrapper: which columns exist, and
 * which band each belongs to, is decided by `placement` in the content layer
 * and resolved in `footerData` — so moving "Discover" between bands never
 * touches this file.
 *
 * A Server Component. It composes the `NavLinkList` molecule, which uses the
 * `Link` atom (the client leaf that owns the `next/link` boundary) rather
 * than passing `NextLink` as a `component` prop itself, so the whole grid
 * renders on the server.
 */
export function FooterLinkGrid({ columns }: { columns: FooterColumn[] }) {
  return (
    <Box sx={FOOTER_LINK_GRID}>
      {columns.map((column) => (
        <NavLinkList
          key={column.id}
          title={column.title}
          titleId={column.titleId}
          items={column.items}
        />
      ))}
    </Box>
  );
}
