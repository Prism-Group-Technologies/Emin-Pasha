import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import { Link } from "@/components/atoms/Link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Trail of links, current page as plain text (not a link) — matches `BreadcrumbList` JSON-LD. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <MuiBreadcrumbs aria-label="Breadcrumb">
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} href={item.href} underline="hover" color="textPrimary">
            {item.label}
          </Link>
        ) : (
          <Typography key={item.label} aria-current="page" color="text.secondary">
            {item.label}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
}
