import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { poolSafetyFacts } from "@/containers/wellness/copy/poolAccess";
import { radiusTokens } from "@/theme/tokens";

/**
 * The pool safety notice — an `error`-bordered panel so it stays the most
 * prominent thing in the experience band rather than a line of small print.
 * "There is no lifeguard on duty" is the single most important sentence on
 * the page, so it leads. Copy lives in `copy/poolAccess.ts`.
 */
export function PoolSafetyCard() {
  return (
    <Box
      sx={{
        p: { xs: 4, md: 5 },
        border: "1px solid",
        borderColor: "error.main",
        borderRadius: `${radiusTokens.lg}px`,
        display: "grid",
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Icon name="warning" aria-hidden sx={{ color: "error.main" }} />
        <Text variant="h5" component="h3">
          Swim safe — read this first
        </Text>
      </Box>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {poolSafetyFacts.map((fact) => (
          <Box key={fact} component="li" sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "error.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {fact}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
