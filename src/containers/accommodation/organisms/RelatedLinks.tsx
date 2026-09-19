import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { findNavItem } from "@/content/navigation";
import { radiusTokens } from "@/theme/tokens";

const ICON_BY_HREF: Record<string, IconName> = {
  "/spa": "spa",
  "/gym": "fitness-center",
  "/swimming-pool": "pool",
  "/spa-etiquette": "info",
  "/dining": "restaurant",
  "/offers": "celebration",
  "/experiences/airport-transfer": "directions",
};

/**
 * Internal links out of Accommodation, as a row of cards. Labels resolve
 * from `navigation` by href, so a section renamed anywhere is renamed here
 * too (CLAUDE.md §5.4). Shared by the location band and the room detail page.
 *
 * The desktop column count is derived from how many links there are, so the
 * last row is always full: four links render 2×2 rather than 3 + 1 with two
 * empty cells trailing off to the right. Three or six keep the 3-up rhythm.
 */
export function RelatedLinks({ hrefs }: { hrefs: string[] }) {
  const desktopColumns = hrefs.length === 4 ? 2 : Math.min(hrefs.length, 3);

  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: hrefs.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
          md: `repeat(${desktopColumns}, minmax(0, 1fr))`,
        },
        gap: 3,
      }}
    >
      {hrefs.map((href) => {
        const item = findNavItem(href);
        if (!item) {
          return null;
        }
        return (
          <Box component="li" key={href}>
            <Link
              href={href}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                p: 3,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: `${radiusTokens.lg}px`,
                color: "text.primary",
                transition: "border-color 200ms cubic-bezier(0.16,1,0.3,1)",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <IconBadge name={ICON_BY_HREF[href] ?? "arrow-forward"} size={40} />
              <Text variant="h5" component="span" sx={{ flex: 1 }}>
                {item.label}
              </Text>
              <Icon
                name="arrow-forward"
                fontSize="small"
                aria-hidden
                sx={{ color: "primary.main", flexShrink: 0 }}
              />
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}
