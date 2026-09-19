import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";

export interface SpaceChapterNavProps {
  items: { id: string; number: string; name: string }[];
}

/**
 * A pill row of the three spaces as in-page anchors, so a visitor who knows
 * which space they want can jump straight to it. Scrolls sideways on a phone.
 */
export function SpaceChapterNav({ items }: SpaceChapterNavProps) {
  return (
    <Box
      component="nav"
      aria-label="Jump to a space"
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 1,
        mb: { xs: 6, md: 8 },
        scrollbarWidth: "none",
      }}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          underline="none"
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "baseline",
            gap: 1.5,
            px: 3,
            py: 1.5,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
            transition: "border-color 160ms ease",
            "&:hover, &:focus-visible": { borderColor: "primary.main" },
          }}
        >
          <Text
            component="span"
            sx={{
              fontFamily: "var(--font-cartographic)",
              fontSize: "0.75rem",
              color: "primary.main",
            }}
          >
            {item.number}
          </Text>
          <Text component="span" variant="body2">
            {item.name}
          </Text>
        </Link>
      ))}
    </Box>
  );
}
