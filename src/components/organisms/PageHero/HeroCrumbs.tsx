import { Box } from "@/components/atoms/Box";
import { type BreadcrumbItem, Breadcrumbs } from "@/components/molecules/Breadcrumbs";

/**
 * The hero's breadcrumb trail, recoloured for the dark scrim. Renders nothing
 * when no trail is passed, so `PageHero` carries no branch of its own.
 */
export function HeroCrumbs({ items }: { items?: BreadcrumbItem[] }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Box
      sx={{
        "& nav": { color: "rgba(251,250,247,0.82)" },
        "& a": { color: "common.white" },
        "& [aria-current]": { color: "rgba(251,250,247,0.72)" },
      }}
    >
      <Breadcrumbs items={items} />
    </Box>
  );
}
