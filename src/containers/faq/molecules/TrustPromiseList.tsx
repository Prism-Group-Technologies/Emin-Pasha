import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import type { TrustPromise } from "@/containers/faq/copy";
import { radiusTokens } from "@/theme/tokens";

/**
 * Promises on one hairline-divided strip — the FAQ twin of the Contact page's
 * `ReplyPromiseStrip`, but fed by props so the copy stays with this page.
 * Stacks on phones, three-up from `md`, dividers following the direction.
 */
export function TrustPromiseList({ items }: { items: TrustPromise[] }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        mt: { xs: 5, md: 6 },
        p: 0,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: `repeat(${items.length}, minmax(0, 1fr))` },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item.title}
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            p: { xs: 4, md: 5 },
            "& + &": {
              borderTop: { xs: "1px solid", md: "none" },
              borderLeft: { xs: "none", md: "1px solid" },
              borderColor: { xs: "divider", md: "divider" },
            },
          }}
        >
          <IconBadge name={item.icon} size={44} />
          <Box sx={{ display: "grid", gap: 0.5 }}>
            <Text variant="body1" component="p" sx={{ fontWeight: 600 }}>
              {item.title}
            </Text>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {item.body}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
