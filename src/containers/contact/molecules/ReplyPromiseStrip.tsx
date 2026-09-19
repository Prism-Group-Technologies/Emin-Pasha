import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { replyPromises } from "@/containers/contact/copy";
import { radiusTokens } from "@/theme/tokens";

/**
 * The three promises under the channel cards, on one hairline-divided strip:
 * read by a person, answered the same day, best rate direct. Stacks on
 * phones, three-up from `md`, with dividers that follow the layout direction.
 */
export function ReplyPromiseStrip() {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        mt: { xs: 5, md: 6 },
        p: 0,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {replyPromises.map((promise) => (
        <Box
          component="li"
          key={promise.title}
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
          <Icon name={promise.icon} sx={{ color: "primary.main", mt: 0.25 }} aria-hidden />
          <Box sx={{ display: "grid", gap: 0.5 }}>
            <Text variant="body1" component="p" sx={{ fontWeight: 600 }}>
              {promise.title}
            </Text>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {promise.body}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
